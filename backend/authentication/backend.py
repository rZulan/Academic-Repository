from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model

class GoogleBackend(BaseBackend):
    def authenticate(self, request, google_user_id=None, **kwargs):
        try:
            user = get_user_model().objects.get(google_user_id=google_user_id)
            return user
        except get_user_model().DoesNotExist:
            return None