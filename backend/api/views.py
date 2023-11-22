from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate, get_user_model
from authentication.serializers import UserSerializer

class GoogleLoginView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        try:
            serializer = UserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            credential = serializer.data
            
            email = credential['email']
            google_user_id = credential['google_user_id']
            picture = credential['picture']
            email_verified = credential['email_verified']

            user = get_user_model().objects.filter(email=email).first()

            if user:
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                return Response({'access_token': access_token}, status=status.HTTP_200_OK)

            user_serializer = UserSerializer(data={'email': email, 'google_user_id': google_user_id, 'picture': picture, 'email_verified': email_verified})
            user_serializer.is_valid(raise_exception=True)
            user = user_serializer.save()

            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({'access_token': access_token}, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
