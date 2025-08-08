"""
URL configuration for the Ouro backend project.

Routes defined here include:
- Admin interface
- JWT authentication (token obtain and refresh)
- App-specific routes (authapp, elements)

For more details, see Django’s URL routing documentation:
https://docs.djangoproject.com/en/5.2/topics/http/urls/

Typical usage:
    - Include app-level URLs with `include()`
    - Add REST API endpoints using DRF or function/class-based views
    - Serve media and static files during development (DEBUG=True)
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authapp.urls')),  # Authentication endpoints
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/elements/', include('elements.urls')),  # Elements app endpoints
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)