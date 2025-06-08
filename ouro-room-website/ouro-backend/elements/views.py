from django.shortcuts import render
from rest_framework import generics, viewsets  # ✅ fixed import
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser

from .models import Event, Mix, GalleryImg, DJ  # ✅ make sure DJ is imported
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


class DJViewSet(viewsets.ModelViewSet):  # ✅ this now works
    queryset = DJ.objects.all()
    serializer_class = DJSerializer


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