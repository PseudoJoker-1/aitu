from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='projects/covers/', blank=True, null=True, help_text="Главное фото проекта (превью). Если не задано, будет использовано первое фото из галереи.")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if self.cover_image and not self.pk:
            # Reusing the existing PIL / BytesIO imports from below
            try:
                img = Image.open(self.cover_image)
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
                output = BytesIO()
                img.save(output, format='WebP', quality=75)
                output.seek(0)
                
                filename = self.cover_image.name.rsplit('.', 1)[0]
                if '/' in filename or '\\' in filename:
                    filename = filename.replace('\\', '/').split('/')[-1]
                
                self.cover_image = InMemoryUploadedFile(
                    output, 'ImageField', f"{filename}.webp", 'image/webp',
                    sys.getsizeof(output), None
                )
            except Exception as e:
                pass
                
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


import sys
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile

class ProjectImage(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to='projects/')
    caption = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        if self.image and not self.pk:
            # Open the uploaded image
            img = Image.open(self.image)
            
            # Convert to RGB if needed
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")
                
            # Resize image aggressively to max 1200x1200 to prevent layout lag
            img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            
            # Compress and save as WebP
            output = BytesIO()
            img.save(output, format='WebP', quality=75)
            output.seek(0)
            
            # Modify the image field to use the optimized WebP file
            filename = self.image.name.rsplit('.', 1)[0]
            if '/' in filename or '\\' in filename:
                filename = filename.replace('\\', '/').split('/')[-1]
            
            self.image = InMemoryUploadedFile(
                output, 'ImageField', f"{filename}.webp", 'image/webp',
                sys.getsizeof(output), None
            )

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.project.title} - Image {self.order}"


class Lead(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)
    event_type = models.CharField(max_length=100, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
