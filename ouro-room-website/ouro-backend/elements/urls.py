from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MixesFromJsonView

from .views import (
    DJViewSet, EventViewSet,
    EventListCreateView, MixListCreateView,
    GalleryImgListCreateView, MixRetrieveUpdateDestroyView,
    GalleryImgRetrieveUpdateDestroyView
)

router = DefaultRouter()
router.register(r'djs', DJViewSet, basename='dj')
router.register(r'events', EventViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('mixes/', MixListCreateView.as_view(), name='mix-list-create'),
    path('gallery/', GalleryImgListCreateView.as_view(), name='gallery-list-create'),
    path('gallery/<int:pk>/', GalleryImgRetrieveUpdateDestroyView.as_view(), name='gallery-detail'),
    path('mixes/<int:pk>/', MixRetrieveUpdateDestroyView.as_view(), name='mix-detail'),
    path('api/mixes/from-json/', MixesFromJsonView.as_view(), name='mixes-from-json'),
]