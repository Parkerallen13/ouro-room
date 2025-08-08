import os
from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.http import JsonResponse
from django.views import View


from .models import Event, Mix, GalleryImg, DJ
from .serializers import EventSerializer, MixSerializer, GalleryImgSerializer, DJSerializer

class MixViewSet(viewsets.ModelViewSet):
    serializer_class = MixSerializer
    queryset = Mix.objects.all()

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class DJViewSet(viewsets.ModelViewSet):  # ✅ Cleaned
    serializer_class = DJSerializer
    queryset = DJ.objects.filter(isDelete=False) 

# elements/views.py
class MixListCreateView(generics.ListCreateAPIView):
    queryset = Mix.objects.all()
    serializer_class = MixSerializer

    def get_serializer_context(self):
        return {'request': self.request}

class GalleryImgListCreateView(generics.ListCreateAPIView):
    queryset = GalleryImg.objects.all()
    serializer_class = GalleryImgSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)  # Add for file uploads

class GalleryImgRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GalleryImg.objects.all()
    serializer_class = GalleryImgSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser)

class MixRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mix.objects.all()
    serializer_class = MixSerializer
    parser_classes = (JSONParser, MultiPartParser, FormParser )

class MixesFromJsonView(View):
    def get(self, request):
        data = {"message": "MixesFromJsonView loaded successfully"}
        return JsonResponse(data)
    
def show_secret_key(request):
    return JsonResponse({'status': 'working'})