from django.forms import ModelForm, TextInput, Textarea
from network.models import *


class PostForm(ModelForm):
    class Meta:
        model = Post
        fields = ['content']
        labels = {
            'content': 'Create New Post'

        }
        widgets = {
            'content': Textarea(attrs={
                'cols': 50, 'rows': 20,
                'class': "form-control", 'id': "exampleFormControlTextarea1",
                'rows': "8",
            })

        }


class EditForm(ModelForm):
    class Meta:
        model = Post
        fields = ['content']
