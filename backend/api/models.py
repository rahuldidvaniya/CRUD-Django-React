from django.db import models

class Job(models.Model):
    # Existing fields from the Job model
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

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    job = models.ForeignKey(Job, related_name='applications', on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)         
    email = models.EmailField()                            # Applicant's email address
    education = models.TextField(null=True, blank=True)   # Applicant's education details
    experience = models.TextField(null=True, blank=True)  # Applicant's work experience details
    resume = models.FileField(upload_to='resumes/')       # Upload field for resume
    cover_letter = models.TextField(null=True, blank=True) # Cover letter (optional)
    applied_at = models.DateTimeField(auto_now_add=True)   # Automatically set when application is submitted

    def __str__(self):
        return f"Application from {self.full_name} for {self.job.title}"
