from django.urls import path
from .views import GoogleLoginView, UploadDocumentAPIView, DocumentsView

urlpatterns = [
    path('login/', GoogleLoginView.as_view()),
    path('upload/', UploadDocumentAPIView.as_view(), name='upload_document'),
    path('library/', DocumentsView.as_view(), name='upload_document'),
]