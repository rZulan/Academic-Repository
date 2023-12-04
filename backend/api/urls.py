from django.urls import path
from .views import DocumentView, GoogleLoginView, UploadDocumentAPIView, DocumentsView, CleanupView

urlpatterns = [
    path('login/', GoogleLoginView.as_view()),
    path('upload/', UploadDocumentAPIView.as_view(), name='upload_document'),
    path('library/', DocumentsView.as_view(), name='upload_document'),
    path('cleanup/', CleanupView.as_view()),
    path('document/<int:id>/', DocumentView.as_view(), name='document-detail'),
]