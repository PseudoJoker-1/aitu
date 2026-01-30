from django.contrib import admin
from .models import Project, ProjectImage, Lead


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 5  # Show 5 empty rows for bulk image uploads
    fields = ('image', 'caption', 'order')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'description')
    list_filter = ('created_at',)
    inlines = [ProjectImageInline]


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'event_type', 'created_at')
    search_fields = ('name', 'phone', 'email', 'message')
    list_filter = ('created_at', 'event_type')
    readonly_fields = ('created_at',)
