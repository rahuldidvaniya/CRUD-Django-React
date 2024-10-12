from django.urls import path, include
from .views import JobListCreateView, JobApplicationAPIView, JobDeleteView, JobApplicationListView, JobApplicationDeleteView

urlpatterns = [
    path('api/job/', JobListCreateView.as_view(), name="job-api"), 
    path('api/job-application/', JobApplicationAPIView.as_view(), name="job-application-api"),
    path('api/job/<int:pk>/delete/', JobDeleteView.as_view(), name='job-delete'),
    path('api/applications/', JobApplicationListView.as_view(), name='job-applications-list'),
    path('api/applications/<int:pk>/delete/', JobApplicationDeleteView.as_view(), name='job-applications-delete'),
]

