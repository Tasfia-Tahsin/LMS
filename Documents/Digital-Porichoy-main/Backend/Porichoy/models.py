from django.db import models

# Create your models here.


class ImageStore(models.Model):
    image_name = models.CharField(max_length=512)
    # This images/ folder will be created in the media subdirectory
    image_content = models.ImageField(
        null=True, blank=True, upload_to="images/")
