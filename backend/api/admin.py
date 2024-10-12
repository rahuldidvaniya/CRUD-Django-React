from django.contrib import admin
from .models import Job, JobApplication

# Register your models here.

class JobAdmin(admin.ModelAdmin):
    list_display = ['title', 'posted_at']




admin.site.register(Job, JobAdmin)
admin.site.register(JobApplication)