from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Job, JobApplication
from .serializers import JobSerializer, JobApplicationSerializer


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
        jobs = self.get_queryset()  # Retrieve the list of jobs
        serializer = self.get_serializer(jobs, many=True)  # Serialize the list of jobs
        return Response(serializer.data)  # Return the serialized data

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
