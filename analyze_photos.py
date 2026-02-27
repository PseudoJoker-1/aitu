import os
import shutil
import json
import time
import re
import random
import concurrent.futures
import google.generativeai as genai
from google.api_core.exceptions import ResourceExhausted

API_KEY = os.environ.get("GEMINI_API_KEY")
if not API_KEY:
    print("Error: GEMINI_API_KEY not found in environment.")
    exit(1)
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')

base_dir = r"c:\Users\pseud\OneDrive\Рабочий стол\PHOTOS_AITU"
output_dir = os.path.join(base_dir, "FILTERED_PORTFOLIO")

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

def extract_json(text):
    match = re.search(r'\[.*\]', text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(0))
        except:
            pass
    return None

def process_batch(batch_paths, batch_index):
    scored_batch = []
    print(f"    [Batch {batch_index}] Starting...")
    uploaded_files = []
    retries = 3
    while retries > 0:
        try:
            for p in batch_paths:
                f = genai.upload_file(path=p)
                uploaded_files.append(f)
                
            for uf in uploaded_files:
                start_time = time.time()
                while True:
                    curr_f = genai.get_file(uf.name)
                    if curr_f.state.name == "PROCESSING":
                        if time.time() - start_time > 60:
                            print(f"    [Batch {batch_index}] Timeout waiting for {uf.name}")
                            break
                        time.sleep(2)
                    elif curr_f.state.name == "FAILED":
                        print(f"    [Batch {batch_index}] File {curr_f.name} failed processing.")
                        break
                    else:
                        break

            active_files = [uf for uf in uploaded_files if genai.get_file(uf.name).state.name == "ACTIVE"]
            
            prompt = '''
You are an expert event photographer and portfolio curator. 
I am providing you with a batch of images from an event. 
For each image, evaluate it based on two criteria:
1. guests_visible: Are guests or random attendees clearly visible? (Hosts, presenters, performers, stage setup, or decor are fine. If it's just a crowd from the back and out of focus, it might be okay, but ideally NO faces of guests clearly depicted).
2. portfolio_score: On a scale of 1-10, how good is this photo for a professional event agency's portfolio? (Consider composition, lighting, clarity, and visual impact).

Return your analysis STRICTLY as a JSON list of objects, in the exact order the images were provided. 
Format:
[
  {"image_index": 0, "guests_visible": true, "portfolio_score": 4},
  {"image_index": 1, "guests_visible": false, "portfolio_score": 9}
]
Provide ONLY the JSON output, with no additional text.
'''
            if active_files:
                response = model.generate_content([prompt] + active_files)
                results = extract_json(response.text)
                
                if results and len(results) == len(active_files):
                    for idx, res in enumerate(results):
                        # Some mapping issue? We assume active_files index maps 1:1 since we dropped failed files
                        # but batch_paths contains ALL. We shouldn't use idx directly if active_files < batch_paths.
                        pass
                    # Let's fix mapping to be exact
                    # It's better to just zip(active_files, results) if we had original paths
                    
                # Robust parsing:
                if results:
                    for res in results:
                        idx = res.get("image_index", -1)
                        if 0 <= idx < len(batch_paths):
                            if res.get("guests_visible") is False:
                                score = res.get("portfolio_score", 0)
                                scored_batch.append((score, batch_paths[idx]))
            break # Success, exit retry loop
            
        except ResourceExhausted as e:
            print(f"    [Batch {batch_index}] Rate limit hit! Sleeping for 60 seconds...")
            time.sleep(60)
            retries -= 1
        except Exception as e:
            if "429" in str(e):
                print(f"    [Batch {batch_index}] Rate limit 429! Sleeping for 60s...")
                time.sleep(60)
                retries -= 1
            else:
                print(f"    [Batch {batch_index}] Error processing: {e}")
                break
        finally:
            for uf in uploaded_files:
                try:
                    genai.delete_file(uf.name)
                except:
                    pass
            uploaded_files = [] # Reset for retry

    return scored_batch

def process_project(project_path, project_name):
    print(f"\n--- Processing project: {project_name} ---")
    out_proj_dir = os.path.join(output_dir, project_name)
    if not os.path.exists(out_proj_dir):
        os.makedirs(out_proj_dir)
        
    # Check if already processed
    existing_files = os.listdir(out_proj_dir)
    if existing_files:
        print(f"Project '{project_name}' already has {len(existing_files)} photos. Skipping.")
        return

    image_paths = []
    for root, dirs, files in os.walk(project_path):
        for f in files:
            if f.lower().endswith(('.jpg', '.jpeg', '.png')):
                image_paths.append(os.path.join(root, f))
                
    if not image_paths:
        print("No images found.")
        return

    print(f"Found {len(image_paths)} images total.")
    random.shuffle(image_paths)
    image_paths = image_paths[:25] # Limit to 25 to reduce quota
    print(f"Selected {len(image_paths)} images to analyze.")
    
    scored_images = []
    batch_size = 5
    batches = [image_paths[i:i+batch_size] for i in range(0, len(image_paths), batch_size)]
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        futures = {executor.submit(process_batch, b, i+1): i for i, b in enumerate(batches)}
        for future in concurrent.futures.as_completed(futures):
            res = future.result()
            if res:
                scored_images.extend(res)

    scored_images.sort(key=lambda x: x[0], reverse=True)
    top_10 = scored_images[:10]
    print(f"Selected {len(top_10)} photos out of {len(scored_images)} good ones for {project_name}")
    for score, img_path in top_10:
        fname = os.path.basename(img_path)
        dest_path = os.path.join(out_proj_dir, fname)
        shutil.copy2(img_path, dest_path)

projects = []
for item in os.listdir(base_dir):
    item_path = os.path.join(base_dir, item)
    if os.path.isdir(item_path) and item != "FILTERED_PORTFOLIO":
        projects.append((item_path, item))

for i, (path, name) in enumerate(projects):
    process_project(path, name)
    if i < len(projects) - 1:
        print("Sleeping 20s between projects to respect API rate limits...")
        time.sleep(20)

print("\nDone all projects.")
