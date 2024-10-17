from django.urls import path, include
from .views import JobListCreateView, JobDeleteView, JobUpdateView, JobApplicationView, JobApplicationDeleteView

urlpatterns = [
    path('api/job/', JobListCreateView.as_view(), name="job-api"), 
    path('api/job-applications/', JobApplicationView.as_view(), name="job-application-api"),
    path('api/job/<int:pk>/delete/', JobDeleteView.as_view(), name='job-delete'),
    path('api/job/<int:pk>/edit/', JobUpdateView.as_view(), name='job-update'),
    path('api/applications/<int:pk>/delete/', JobApplicationDeleteView.as_view(), name='job-applications-delete'),
]

    