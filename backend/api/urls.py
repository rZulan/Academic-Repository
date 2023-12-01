from django.urls import path
from .views import GoogleLoginView, UploadDocumentAPIView, DocumentsView, CleanupView

urlpatterns = [
    path('login/', GoogleLoginView.as_view()),
    path('upload/', UploadDocumentAPIView.as_view(), name='upload_document'),
    path('library/', DocumentsView.as_view(), name='upload_document'),
    path('cleanup/', CleanupView.as_view())
]