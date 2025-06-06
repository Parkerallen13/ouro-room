from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DJViewSet, EventListCreateView, MixListCreateView, GalleryImgListCreateView, MixRetrieveUpdateDestroyView, GalleryImgRetrieveUpdateDestroyView
from .views import EventViewSet

router = DefaultRouter()
router.register(r'djs', DJViewSet, basename='dj')
router.register(r'events', EventViewSet)


urlpatterns = [
    path('api/elements/', include(router.urls)),
    path('', include(router.urls)),  # <-- this adds /api/elements/ root with "djs/" included
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('mixes/', MixListCreateView.as_view(), name='mix-list-create'),
    path('gallery/', GalleryImgListCreateView.as_view(), name='gallery-list-create'),
    path('gallery/<int:pk>/', GalleryImgRetrieveUpdateDestroyView.as_view(), name='gallery-detail'),
     path('mixes/<int:pk>/', MixRetrieveUpdateDestroyView.as_view(), name='mix-detail'),
]