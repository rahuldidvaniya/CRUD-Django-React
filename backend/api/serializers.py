from rest_framework import serializers

class JobSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255)
    description = serializers.CharField()
    job_type = serializers.CharField(max_length=2)
    location = serializers.CharField(max_length=255)
    company_name = serializers.CharField(max_length=255)
    posted_at = serializers.DateField(read_only=True)
    salary = serializers.DecimalField(max_digits=10, decimal_places=2)
    logo = serializers.FileField(required=False)


class JobApplicationSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    job = serializers.IntegerField()
    full_name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    education = serializers.CharField(required=False, allow_blank=True)
    experience = serializers.CharField(required=False, allow_blank=True)
    resume = serializers.FileField()  
    cover_letter = serializers.CharField(required=False, allow_blank=True)
    applied_at = serializers.DateTimeField(read_only=True)  
