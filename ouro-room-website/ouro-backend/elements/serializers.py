# serializers.py
from rest_framework import serializers
from .models import Event
from .models import GalleryImg
from .models import Mix
from .models import DJ


class EventSerializer(serializers.ModelSerializer):
    isSelected = serializers.BooleanField()

    class Meta:
        model = Event
        fields = ['id', 'title', 'date', 'artists', 'location', 'description', 'rsvp_link', 'isSelected', 'isDelete', 'isUpcoming']

class DJSerializer(serializers.ModelSerializer):
    class Meta:
        model = DJ
        fields = ['id', 'artist', 'description', 'socialMedia', 'image', 'isSelected', 'isSpotlight', 'isDelete']

class GalleryImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImg
        fields = ['id', 'image', 'isSelected', 'isDelete']


class MixSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    audio = serializers.SerializerMethodField()

    class Meta:
        model = Mix
        fields = ['id', 'title', 'artist', 'audio', 'description', 'image', 'isSelected', 'isLatest', 'isDelete']

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return ""

    def get_audio(self, obj):
        request = self.context.get('request')
        if obj.audio and request:
            return request.build_absolute_uri(obj.audio.url)
        return ""
    
class MixSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mix
        fields = ['id', 'title', 'artist', 'audio', 'description', 'image', 'isSelected', 'isLatest', 'isDelete']