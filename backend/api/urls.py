from django.urls import path, include
from .views import CreateJobView

urlpatterns = [
    path('api/create-job/', CreateJobView.as_view(), name="create-job"),
]
