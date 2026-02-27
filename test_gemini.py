import os
import google.generativeai as genai
import time

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

model = genai.GenerativeModel('gemini-1.5-flash')

# pick an image
img_path = r"c:\Users\pseud\OneDrive\Рабочий стол\PHOTOS_AITU\08.06 Haval ppz\DSC01624.jpg"
print("Uploading file...")
f = genai.upload_file(path=img_path)

while True:
    f_stat = genai.get_file(f.name)
    if f_stat.state.name == "PROCESSING":
        print("Processing...")
        time.sleep(1)
    elif f_stat.state.name == "FAILED":
        print("Failed.")
        exit(1)
    else:
        print("Active.")
        break

f_active = genai.get_file(f.name)
prompt = "Analyze this image."
print("Generating content...")
try:
    response = model.generate_content([prompt, f_active])
    print(response.text)
except Exception as e:
    import traceback
    traceback.print_exc()
    print("Error:", e)
finally:
    genai.delete_file(f.name)
