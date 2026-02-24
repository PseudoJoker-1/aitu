import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from portfolio.models import ProjectImage
from PIL import Image
from io import BytesIO
import sys
from django.core.files.uploadedfile import InMemoryUploadedFile

def run_compression():
    images = ProjectImage.objects.all()
    print(f"Found {images.count()} images to check...")
    
    compressed_count = 0
    for obj in images:
        if not obj.image:
            continue
            
        try:
            # Check if it's already a webp or a small file
            if obj.image.name.endswith('.webp'):
                continue
                
            img = Image.open(obj.image.path)
            
            # Convert to RGB if needed
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
                
            print(f"Compressing {obj.image.name} ...")
            
            # Resize image aggressively to max 1200x1200
            img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            
            # Compress and save as WebP
            output = BytesIO()
            img.save(output, format='WebP', quality=75)
            output.seek(0)
            
            # Delete old file manually if you want, or just save over and it will replace in DB
            old_path = obj.image.path
            
            # Save the new optimized WebP file
            filename = obj.image.name.rsplit('.', 1)[0]
            if '/' in filename or '\\' in filename:
                filename = filename.replace('\\', '/').split('/')[-1]
            
            new_file = InMemoryUploadedFile(
                output, 'ImageField', f"{filename}.webp", 'image/webp',
                sys.getsizeof(output), None
            )
            
            # Re-assign and save
            obj.image = new_file
            # Bypass custom save by picking specifically what we are doing or just call save since we check `not self.pk` in save
            # Actually, `self.pk` IS true here, so our custom save logic in models.py won't trigger (which is what we want, so it doesn't double-compress).
            obj.save(update_fields=['image'])
            
            # Clean up the old uncompressed large file
            if os.path.exists(old_path) and not old_path.endswith('.webp'):
                os.remove(old_path)
                
            compressed_count += 1
        except Exception as e:
            print(f"Error compressing {obj.image.name}: {e}")

    print(f"Successfully compressed {compressed_count} images!")

if __name__ == '__main__':
    run_compression()
