from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import get_user_model
from authentication.serializers import UserSerializer
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser
from library.serializers import DocumentSerializer
from library.models import Document

import json
import requests

from pypdf import PdfReader

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

class UploadDocumentAPIView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = DocumentSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DocumentsView(APIView):
    def get(self, request):
        data = Document.objects.all()
        serializer = DocumentSerializer(data, many=True)
        return Response(serializer.data)


class CleanupView(APIView):
    parser_classes = [MultiPartParser, FileUploadParser]

    def post(self, request):
        file_obj = request.data.get('file')

        # headers = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWYwYzNjN2QtODE3Ny00YWE3LTlmNTctZmM5ZGNjYWQ0ZDkzIiwidHlwZSI6ImFwaV90b2tlbiJ9.vQRpYvpAxrrfZvHOI4gicG8pN2O1X0pptOL51JcBRF0"}
        full_text = ''
        
        reader = PdfReader(file_obj)
        for i in range(len(reader.pages)):
            page = reader.pages[i]
            full_text += page.extract_text()
        
        # url = "https://api.edenai.run/v2/text/ai_detection"
        # payload = {
        #     "providers": "originalityai",
        #     "text": full_text,
        #     "fallback_providers": ""
        # }

        # response = requests.post(url, json=payload, headers=headers)
        
        return Response({"ConvertedText" : full_text})