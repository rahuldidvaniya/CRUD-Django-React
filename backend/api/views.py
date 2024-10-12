from rest_framework import generics
from .models import Job
from .serializers import JobSerializer

class CreateJobView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


    



