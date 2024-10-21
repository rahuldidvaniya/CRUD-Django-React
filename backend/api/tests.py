from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile
from django.conf import settings
import os
import shutil

class JobAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.job_data = {
            'title': 'Software Engineer',
            'description': 'Exciting opportunity for a skilled developer',
            'job_type': 'FT',
            'location': 'New York',
            'company_name': 'Tech Corp',
            'salary': '100000.00',
        }
        self.job_url = reverse('job-api')

    def test_create_job(self):
        response = self.client.post(self.job_url, self.job_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Job created successfully')

    def test_create_job_with_logo(self):
        logo = SimpleUploadedFile("logo.png", b"file_content", content_type="image/png")
        data = self.job_data.copy()
        data['logo'] = logo
        response = self.client.post(self.job_url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(os.path.exists(os.path.join(settings.MEDIA_ROOT, 'company-logos', 'logo.png')))

    def test_get_all_jobs(self):
        # First, create a job
        self.client.post(self.job_url, self.job_data, format='json')
        
        # Then, retrieve all jobs
        response = self.client.get(self.job_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_delete_job(self):
        # First, create a job
        create_response = self.client.post(self.job_url, self.job_data, format='json')
        job_id = create_response.data['id']  # Assuming the create response includes the job id
        
        # Then, delete the job
        delete_url = reverse('job-delete', kwargs={'pk': job_id})
        response = self.client.delete(delete_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Job deleted successfully')

    def test_update_job(self):
        # First, create a job
        create_response = self.client.post(self.job_url, self.job_data, format='json')
        job_id = create_response.data['id']  # Assuming the create response includes the job id
        
        # Then, update the job
        update_data = self.job_data.copy()
        update_data['title'] = 'Senior Software Engineer'
        update_url = reverse('job-update', kwargs={'pk': job_id})
        response = self.client.put(update_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Job edited successfully')

class JobApplicationAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.job_data = {
            'title': 'Software Engineer',
            'description': 'Exciting opportunity for a skilled developer',
            'job_type': 'FT',
            'location': 'New York',
            'company_name': 'Tech Corp',
            'salary': '100000.00',
        }
        self.job_url = reverse('job-api')
        self.application_url = reverse('job-application-api')

    def test_create_job_application(self):
        # First, create a job
        job_response = self.client.post(self.job_url, self.job_data, format='json')
        job_id = job_response.data['id']  # Assuming the create response includes the job id

        # Create a job application
        resume = SimpleUploadedFile("resume.pdf", b"file_content", content_type="application/pdf")
        application_data = {
            'job': job_id,
            'full_name': 'John Doe',
            'email': 'john@example.com',
            'education': 'Bachelor in Computer Science',
            'experience': '5 years of software development',
            'cover_letter': 'I am excited to apply for this position...',
            'resume': resume
        }
        response = self.client.post(self.application_url, application_data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Application submitted successfully')
        self.assertTrue(os.path.exists(os.path.join(settings.MEDIA_ROOT, 'resumes', 'resume.pdf')))

    def test_get_all_job_applications(self):
        # First, create a job and an application
        job_response = self.client.post(self.job_url, self.job_data, format='json')
        job_id = job_response.data['id']

        resume = SimpleUploadedFile("resume.pdf", b"file_content", content_type="application/pdf")
        application_data = {
            'job': job_id,
            'full_name': 'John Doe',
            'email': 'john@example.com',
            'resume': resume
        }
        self.client.post(self.application_url, application_data, format='multipart')

        # Then, retrieve all applications
        response = self.client.get(self.application_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)

    def test_delete_job_application(self):
        # First, create a job and an application
        job_response = self.client.post(self.job_url, self.job_data, format='json')
        job_id = job_response.data['id']

        resume = SimpleUploadedFile("resume.pdf", b"file_content", content_type="application/pdf")
        application_data = {
            'job': job_id,
            'full_name': 'John Doe',
            'email': 'john@example.com',
            'resume': resume
        }
        application_response = self.client.post(self.application_url, application_data, format='multipart')
        application_id = application_response.data['id']  # Assuming the create response includes the application id

        # Then, delete the application
        delete_url = reverse('job-applications-delete', kwargs={'pk': application_id})
        response = self.client.delete(delete_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Application deleted successfully')

    def tearDown(self):
        # Clean up created media files after tests
        if os.path.exists(os.path.join(settings.MEDIA_ROOT, 'company-logos')):
            shutil.rmtree(os.path.join(settings.MEDIA_ROOT, 'company-logos'))
        if os.path.exists(os.path.join(settings.MEDIA_ROOT, 'resumes')):
            shutil.rmtree(os.path.join(settings.MEDIA_ROOT, 'resumes'))



