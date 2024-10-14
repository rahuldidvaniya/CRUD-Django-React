from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Job, JobApplication
from .serializers import JobSerializer, JobApplicationSerializer
from rest_framework.exceptions import NotFound


class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        jobs = self.get_queryset()  
        serializer = self.get_serializer(jobs, many=True)  
        return Response(serializer.data)  
    
class JobUpdateView(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    


class JobApplicationAPIView(APIView):
    def get(self, request):
        applications = JobApplication.objects.all()
        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = JobApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JobDeleteView(APIView):

    def delete(self, request, pk, format=None):
        try:
            job = Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise NotFound(detail="Job not found")

        job.delete()
        return Response({"message": "Job deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

class JobApplicationListView(generics.ListAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
    

class JobApplicationDeleteView(APIView):

    def delete(self, reqeuest, pk, format=None):
        try:
            job_application = JobApplication.objects.get(pk=pk)
        except JobApplication.DoesNotExist:
            raise NotFound(detail="Job Application not found")
        
        job_application.delete()
        return Response({"message": "Job Application Deleted sucessfully"}, status=status.HTTP_204_NO_CONTENT)