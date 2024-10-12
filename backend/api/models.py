from django.db import models

from django.db import models

class Job(models.Model):
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    job_type = models.CharField(max_length=2, choices=[
        ('FT', 'Full-time'),
        ('PT', 'Part-time'),
        ('CT', 'Contract'),
        ('IN', 'Internship'),
        ('FL', 'Freelance'),
    ])
    location = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    posted_at = models.DateTimeField(auto_now_add=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.title


class JobApplication(models.Model):
    job = models.ForeignKey(Job, related_name='applications', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)         
    email = models.EmailField()                            
    education = models.TextField(null=True, blank=True)    
    experience = models.TextField(null=True, blank=True)  
    resume = models.FileField(upload_to='resumes/')       
    cover_letter = models.TextField(null=True, blank=True) 
    applied_at = models.DateTimeField(auto_now_add=True)   

    def __str__(self):
        return f"Application from {self.full_name} for {self.job.title}"
