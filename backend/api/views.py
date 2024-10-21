from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import JobSerializer, JobApplicationSerializer
from rest_framework.exceptions import NotFound
from django.db import connection
import os
from django.conf import settings
import datetime
import uuid
from django.http import FileResponse
from django.utils import timezone




class JobListCreateView(APIView):
    def post(self, request, *args, **kwargs):
        job_data = request.data
        serializer = JobSerializer(data=job_data)
        
        if serializer.is_valid():
            try:
                logo = request.FILES.get('logo')

                if logo:
                    # Generate a unique filename using timestamp and UUID
                    timestamp = timezone.now().strftime('%Y%m%d%H%M%S')
                    unique_id = uuid.uuid4().hex[:6]
                    _, extension = os.path.splitext(logo.name)
                    logo_name = f"{timestamp}_{unique_id}{extension}"
                    logo_path = os.path.join('company-logos', logo_name)
                    full_logo_path = os.path.join(settings.MEDIA_ROOT, logo_path)
                    
                    os.makedirs(os.path.dirname(full_logo_path), exist_ok=True)
                    
                  
                    with open(full_logo_path, 'wb+') as destination:
                        for chunk in logo.chunks():
                            destination.write(chunk)
                else:
                    logo_path = None

                with connection.cursor() as cursor:
                    cursor.callproc('create_job', [
                        serializer.validated_data['title'],        
                        serializer.validated_data['description'],   
                        serializer.validated_data['job_type'],      
                        serializer.validated_data['location'],     
                        serializer.validated_data['company_name'],
                        serializer.validated_data['salary'],        
                        logo_path 
                    ])

                return Response({"message": "Job created successfully"}, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM public.get_all_jobs()")
                # print(cursor.description)
                
                columns = [col[0] for col in cursor.description]
                jobs = [
                    dict(zip(columns, row))
                    for row in cursor.fetchall()
                ]
            
            return Response(jobs, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

class JobDeleteView(APIView):

    def delete(self, request, pk, format=None):
        try:
            with connection.cursor() as cursor:
                cursor.callproc('delete_job', [pk])

            return Response({"message":  "Job deleted sucessfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  


class JobUpdateView(APIView):

    def put(self, request, pk, format=None):
        serializer = JobSerializer(data=request.data)

        if serializer.is_valid():
            try:
                with connection.cursor() as cursor:
                    cursor.callproc('edit_job', [
                        pk,  
                        serializer.validated_data['title'],  
                        serializer.validated_data['description'],  
                        serializer.validated_data['job_type'], 
                        serializer.validated_data['location'], 
                        serializer.validated_data['company_name'],  
                        serializer.validated_data['salary']  
                    ])

                return Response({"message": "Job edited successfully"}, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class JobApplicationView(APIView):

    def post(self, request, format=None):
        serializer = JobApplicationSerializer(data=request.data)
        if serializer.is_valid():
            try:
                job_id = serializer.validated_data['job']
                full_name = serializer.validated_data['full_name']
                email = serializer.validated_data['email']
                education = serializer.validated_data['education']
                experience = serializer.validated_data['experience']
                cover_letter = serializer.validated_data['cover_letter']
                resume = request.FILES.get('resume')

               
                if resume:
                    file_extension = os.path.splitext(resume.name)[1]
                    unique_filename = f"{uuid.uuid4()}{file_extension}"

                    resume_path = os.path.join('resumes', unique_filename)
                    full_resume_path = os.path.join(settings.MEDIA_ROOT, resume_path)

                    os.makedirs(os.path.dirname(full_resume_path), exist_ok=True)
                    
                    with open(full_resume_path, 'wb+') as destination:
                        for chunk in resume.chunks():
                            destination.write(chunk)
                else:
                    resume_path = None

                # Call the sql function
                with connection.cursor() as cursor:
                    cursor.callproc('create_job_application', [
                        job_id,
                        full_name,
                        email,
                        education,
                        experience,
                        cover_letter,
                        resume_path
                    ])

                return Response({"message": "Application submitted successfully"}, status=status.HTTP_201_CREATED)
            
            except Exception as e:
                import traceback
                error_message = f"Error: {str(e)}\n\nTraceback:\n{traceback.format_exc()}"
                print(error_message) 
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def get(self, request, format=None):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM public.get_all_job_applications()")
                columns = [col.name for col in cursor.description]
                job_applications = [
                    dict(zip(columns, row))
                    for row in cursor.fetchall()
                ]

            return Response(job_applications, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    

class JobApplicationDeleteView(APIView):
    
    def delete(self, request, pk, format=None):
        try:
            with connection.cursor() as cursor:
                cursor.callproc('delete_job_application', [pk])

            return Response({"message":  "Application deleted sucessfully"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


class ResumeDownloadView(APIView):
    def get(self, request, filename, format=None):
        try:
            file_path = os.path.join(settings.MEDIA_ROOT, 'resumes', filename)
            if os.path.exists(file_path):
                return FileResponse(open(file_path, 'rb'), as_attachment=True, filename=filename)
            else:
                return Response({"error": "File not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
