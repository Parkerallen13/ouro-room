from django.urls import path
from .views import CarListCreateAPIView, index

urlpatterns = [
    path('', CarListCreateAPIView.as_view(), name='car-list-create'),  # <-- empty string here
    path('index/', index, name='car-index'),  # optional
]