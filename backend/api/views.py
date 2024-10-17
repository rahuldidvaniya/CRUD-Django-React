from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import JobSerializer, JobApplicationSerializer
from rest_framework.exceptions import NotFound
from django.db import connection
import os
from django.conf import settings



class JobListCreateView(APIView):
    def post(self, request, *args, **kwargs):
        job_data = request.data
        serializer = JobSerializer(data=job_data)
        
        if serializer.is_valid():
            try:
                logo = request.FILES.get('logo')

                if logo:
                    logo_path = os.path.join('company-logos', logo.name)
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
                cursor.execute("SELECT get_all_jobs();")  
                jobs = cursor.fetchone()[0]


            

           
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
        try:
            job_id = request.data.get('job')
            full_name = request.data.get('full_name')
            email = request.data.get('email')
            education = request.data.get('education')
            experience = request.data.get('experience')
            cover_letter = request.data.get('cover_letter')
            resume = request.FILES.get('resume')

            #Save resume in media directory
            if resume:
                resume_path = os.path.join(settings.MEDIA_ROOT, 'resumes', resume.name)
                with open(resume_path, 'wb+') as destination:
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

            return Response({"message": "Application submitted successfully"}, status=status.HTTP_200_OK)
        
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
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
    


