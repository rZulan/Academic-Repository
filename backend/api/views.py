from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import get_user_model
from authentication.serializers import UserSerializer

class GoogleLoginView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        try:
            email = request.data.get('email')
            user = get_user_model().objects.get(email=email)
            refresh = RefreshToken.for_user(user)

            refresh['email'] = user.email
            refresh['first_name'] = user.first_name
            refresh['last_name'] = user.last_name
            refresh['picture'] = user.picture
            refresh['is_staff'] = user.is_staff

            access_token = str(refresh.access_token)

            response = Response({'access_token': access_token}, status=status.HTTP_200_OK)

        except get_user_model().DoesNotExist:
            credential = request.data
            data = {
                'email': credential['email'],
                'google_user_id': credential['google_user_id'],
                'picture': credential['picture'],
                'email_verified': credential['email_verified'],
                'first_name': credential['first_name'],
                'last_name': credential['last_name'],
            }

            serializer = UserSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            refresh = RefreshToken.for_user(serializer.instance)
            refresh['email'] = serializer.instance.email
            refresh['first_name'] = serializer.instance.first_name
            refresh['last_name'] = serializer.instance.last_name
            refresh['picture'] = serializer.instance.picture
            refresh['is_staff'] = False

            access_token = str(refresh.access_token)

            response = Response({'access_token': access_token}, status=status.HTTP_201_CREATED)

        response.set_cookie(key='access_token', value=access_token, httponly=True)

        return response
