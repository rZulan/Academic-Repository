from django.urls import path
from .views import GoogleLoginView, UploadDocumentAPIView

urlpatterns = [
    path('login/', GoogleLoginView.as_view()),
    path('upload/', UploadDocumentAPIView.as_view(), name='upload_document'),
]