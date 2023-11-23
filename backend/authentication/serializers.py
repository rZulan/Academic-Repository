from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = get_user_model()
    fields = ['email', 'google_user_id', 'email_verified', 'picture', 'first_name', 'last_name']