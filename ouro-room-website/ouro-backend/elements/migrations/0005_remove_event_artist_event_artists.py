# Generated by Django 5.2.1 on 2025-06-06 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('elements', '0004_alter_galleryimg_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='artist',
        ),
        migrations.AddField(
            model_name='event',
            name='artists',
            field=models.JSONField(blank=True, default=list),
        ),
    ]
