from django.urls import path, include
from .views import JobListCreateView, JobApplicationAPIView

urlpatterns = [
    path('api/job/', JobListCreateView.as_view(), name="job-api"), 
    path('api/job-applications/', JobApplicationAPIView.as_view(), name="job-application-api"), 
]
