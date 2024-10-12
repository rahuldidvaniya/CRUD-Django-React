from django.test import TestCase
from .models import Job, JobApplication


class JobModelTest(TestCase):
    def setUp(self):
        self.job = Job.objects.create(
            title="Software Engineer",
            description="Develop and maintain software applications.",
            job_type="FT",
            location="Remote",
            company_name="Tech Corp",
            salary=100000.00
        )

    def test_job_creation(self):
        self.assertEqual(self.job.title, "Software Engineer")
        self.assertEqual(self.job.description, "Develop and maintain software applications.")
        self.assertEqual(self.job.job_type, "FT")
        self.assertEqual(self.job.location, "Remote")
        self.assertEqual(self.job.company_name, "Tech Corp")
        self.assertEqual(self.job.salary, 100000.00)




class JobApplicationModelTest(TestCase):
    def setUp(self):
        self.job = Job.objects.create(
            title="Software Engineer",
            description="Develop and maintain software applications.",
            job_type="FT",
            location="Remote",
            company_name="Tech Corp",
            salary=100000.00
        )
        self.application = JobApplication.objects.create(
            job=self.job,
            full_name="John Doe",
            email="john.doe@example.com",
            education="B.Sc. in Computer Science",
            experience="3 years of experience in software development",
            cover_letter="I am very interested in this position."
        )

    def test_job_application_creation(self):
        self.assertEqual(self.application.full_name, "John Doe")
        self.assertEqual(self.application.email, "john.doe@example.com")
        self.assertEqual(self.application.education, "B.Sc. in Computer Science")
        self.assertEqual(self.application.experience, "3 years of experience in software development")
        self.assertEqual(self.application.cover_letter, "I am very interested in this position.")


