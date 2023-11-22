from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

import jwt

from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

class GoogleLoginSerializer(serializers.Serializer):
    credential = serializers.CharField()

class GoogleLoginView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        try:
            serializer = GoogleLoginSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            credential = serializer.validated_data['credential']
            
            access_token_payload = AccessToken().decode(credential, verify=False)
            
            google_user_id = access_token_payload.get(access_token_payload.get('sub'))
            email = access_token_payload.get('email')
            picture = access_token_payload.get('picture')
            email_verified = access_token_payload.get('email_verified')

            user=authenticate(google_user_id=google_user_id)
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            if user is None:
                user = get_user_model().objects.create_user(email=email, google_user_id=google_user_id, picture=picture, email_verified=email_verified)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                return Response({'created': 'success', 'access_token': access_token}, status=status.HTTP_201_CREATED)
            
            return Response({'access_token': access_token}, status=status.HTTP_302_FOUND)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
