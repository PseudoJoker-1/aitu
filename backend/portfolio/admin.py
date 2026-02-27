from django import forms
from django.contrib import admin
from .models import Project, ProjectImage, Lead


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleImageField(forms.ImageField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput(attrs={'multiple': True}))
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = [single_file_clean(data, initial)]
        return result


import zipfile
import sys
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

class ProjectAdminForm(forms.ModelForm):
    # This field allows multiple image selection
    multiple_images = MultipleImageField(
        required=False,
        label='Загрузить несколько фото'
    )
    
    archive_upload = forms.FileField(
        required=False,
        label='Загрузить ZIP-архив с фото',
        help_text='Загрузите .zip файл с фотографиями. Браузер не будет виснуть при отправке.'
    )

    class Meta:
        model = Project
        fields = '__all__'


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1  # Reduced extra to 1, as we now have bulk upload
    fields = ('image', 'caption', 'order')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
    list_display = ('title', 'slug', 'image_count', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'description')
    list_filter = ('created_at',)
    inlines = [ProjectImageInline]
    actions = ['delete_all_photos']

    @admin.display(description='Фото')
    def image_count(self, obj):
        return obj.images.count()

    @admin.action(description='🗑️ Удалить все фото у выбранных проектов')
    def delete_all_photos(self, request, queryset):
        total = 0
        for project in queryset:
            images = project.images.all()
            count = images.count()
            # Delete actual files from storage
            for img in images:
                if img.image:
                    img.image.delete(save=False)
            # Delete cover image too
            if project.cover_image:
                project.cover_image.delete(save=False)
            images.delete()
            total += count
        self.message_user(request, f'Удалено {total} фото из {queryset.count()} проект(ов).')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        
        # Save multiple images if uploaded
        for f in request.FILES.getlist('multiple_images'):
            ProjectImage.objects.create(project=obj, image=f)
            
        # Process ZIP archive if uploaded
        archive = request.FILES.get('archive_upload')
        if archive and zipfile.is_zipfile(archive):
            with zipfile.ZipFile(archive, 'r') as zf:
                for filename in zf.namelist():
                    # Skip directories and hidden files/mac os artifacts
                    if filename.endswith('/') or filename.startswith('__MACOSX/') or filename.split('/')[-1].startswith('.'):
                        continue
                    
                    # Only process image files
                    ext = filename.lower().split('.')[-1]
                    if ext in ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif']:
                        try:
                            # Read file from ZIP
                            img_data = zf.read(filename)
                            
                            # Convert to Django InMemoryUploadedFile
                            mem_file = InMemoryUploadedFile(
                                BytesIO(img_data), 
                                'ImageField', 
                                filename.split('/')[-1], 
                                f'image/{ext}', 
                                sys.getsizeof(img_data), 
                                None
                            )
                            # Let the ProjectImage object handle the resizing and WebP conversion!
                            ProjectImage.objects.create(project=obj, image=mem_file)
                        except Exception as e:
                            # Log exception and continue
                            print(f"Failed to process image {filename} from zip: {e}")

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'event_type', 'created_at')
    search_fields = ('name', 'phone', 'email', 'message')
    list_filter = ('created_at', 'event_type')
    readonly_fields = ('created_at',)
