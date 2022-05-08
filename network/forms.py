from django.forms import ModelForm
from network.models import *


class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = ['content']


class EditForm(ModelForm):
    class Meta:
        model = Post
        fields = ['content']


