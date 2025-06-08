from django.db import models
from django.utils import timezone


class Event(models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField(default=timezone.now)
    artists = models.JSONField(default=list, blank=True)
    location = models.TextField()
    description = models.TextField()
    rsvp_link = models.URLField()
    isSelected = models.BooleanField(default=False)
    isDelete = models.BooleanField(default=False)
    isUpcoming = models.BooleanField(default=False)
    

    def __str__(self):
        return f"{self.artist} @ {self.location}"
    


class DJ(models.Model):
    image = models.FileField(upload_to='dj_images/')
    artist = models.CharField(max_length=100)
    description = models.TextField()
    socialMedia = models.CharField(max_length=255, default="")
    isSelected = models.BooleanField(default=False)
    isSpotlight = models.BooleanField(default=False)
    isDelete = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.artist} + {self.description}"
    
class GalleryImg(models.Model):
    image = models.ImageField(upload_to="gallery/")
    isSelected = models.BooleanField(default=False)
    isDelete = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.image}"
    
class Mix(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    audio = models.FileField(upload_to='mixes/')
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='mix_images/', blank=True, null=True)
    isSelected = models.BooleanField(default=False)
    isLatest = models.BooleanField(default=False)
    isDelete = models.BooleanField(default=False)

    
    def __str__(self):
        return f"{self.artist} - {self.title}"

