from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

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
            print(credential)

            credential = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjViMzcwNjk2MGUzZTYwMDI0YTI2NTVlNzhjZmE2M2Y4N2M5N2QzMDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MjEzMzk1OTA5NDItMWVvOG9pNjB1MjJiOGluODRhY2w4ODkxbjQ3NXZuajYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MjEzMzk1OTA5NDItMWVvOG9pNjB1MjJiOGluODRhY2w4ODkxbjQ3NXZuajYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDg0NDY3NTYzNjg4ODExMTE3MjQiLCJoZCI6ImRodnN1LmVkdS5waCIsImVtYWlsIjoiMjAyMDEwNjMxN0BkaHZzdS5lZHUucGgiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzAwNjQ3MzQyLCJuYW1lIjoiQWxmcmVkbyBSb2kgTmFsdXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS3lDZS12cTZxamxybUlEX3NTLXhFOHNEYkVkRU0wV1I1aVFnQTljVW9PWUE9czk2LWMiLCJnaXZlbl9uYW1lIjoiQWxmcmVkbyBSb2kiLCJmYW1pbHlfbmFtZSI6Ik5hbHV6IiwibG9jYWxlIjoiZW4iLCJpYXQiOjE3MDA2NDc2NDIsImV4cCI6MTcwMDY1MTI0MiwianRpIjoiMGQ2M2UxNTBiMzk4ZjY3MzBiNjYxMThhOTQyYmVlZGQ0MjJhNGM0OCJ9.EbqNvd1wwfpzJblLJ6EI2dlSebSdwLKNIOiH10X4VHCILw0oKTUyGdc9jtOpwF5-IFHQv4MEDK2_GmtMhTPONlyQGx3pTmDuV5lZAEeNf7Qa_sXHBKo-PKNi-AGBGYgNWQWzRRJbPrSZwU22x81iTbxp37FIdpeL2l_mIBK0xfyXtmjcH1vwtOCg7wLiFL8cjxywatrWYdUoZQCY5HeXu_Ig2NYVsri4EKixeIN-ACoZZaOkab6sMDauhAxZrXjBcoOKc-uClqaebMAyyow9xVniaasf_PC_GXXFi9qg1Lzjfr2Dt8nbYsXz_Qp1dYXOG9GDg1Fr8HrsJWfkDP7_IQ'
            access_token_payload = jwt.decode(credential, verify=False, algorithms=["RS256"])
            
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
