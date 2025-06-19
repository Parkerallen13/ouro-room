import json
import os

from django.core.management.base import BaseCommand
from elements.models import Mix  # or Event, etc.
from django.conf import settings

class Command(BaseCommand):
    help = 'Load mixes from a JSON file'

    def handle(self, *args, **kwargs):
        file_path = os.path.join(settings.BASE_DIR, 'backend', 'data', 'mixes.json')
        with open(file_path, 'r') as f:
            data = json.load(f)
        
        for item in data:
            Mix.objects.create(**item)

        self.stdout.write(self.style.SUCCESS('Successfully loaded mixes!'))