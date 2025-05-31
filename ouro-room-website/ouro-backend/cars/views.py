from django.shortcuts import render

from rest_framework import generics
from .models import Car
from .serializers import CarSerializer
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello from the cars index view!")

class CarListCreateAPIView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
