from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate

class GoogleLoginView(generics.GenericAPIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        google_user_id = request.data.get('google_user_id')

        try:
            user=authenticate(google_user_id=google_user_id)

            if user is None:
                return Response({'error': 'User is not found!'}, status=status.HTTP_404_NOT_FOUND)

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({'access_token': access_token}, status=status.HTTP_302_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
