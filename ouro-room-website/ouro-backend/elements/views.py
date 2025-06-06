from django.shortcuts import render
from rest_framework import generics, viewsets  # ✅ fixed import
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Event, Mix, GalleryImg, DJ  # ✅ make sure DJ is imported
from .serializers import EventSerializer, MixSerializer, GalleryImgSerializer, DJSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class DJViewSet(viewsets.ModelViewSet):  # ✅ this now works
    queryset = DJ.objects.all()
    serializer_class = DJSerializer


class MixListCreateView(generics.ListCreateAPIView):
    queryset = Mix.objects.all()
    serializer_class = MixSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        print("FILES received:", request.FILES)
        return super().post(request, *args, **kwargs)


class GalleryImgListCreateView(generics.ListCreateAPIView):
    queryset = GalleryImg.objects.all()
    serializer_class = GalleryImgSerializer
    parser_classes = (MultiPartParser, FormParser)  # Add for file uploads

class GalleryImgRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GalleryImg.objects.all()
    serializer_class = GalleryImgSerializer
    parser_classes = (MultiPartParser, FormParser)

class MixRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mix.objects.all()
    serializer_class = MixSerializer
    parser_classes = (MultiPartParser, FormParser)