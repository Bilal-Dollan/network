from datetime import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    time_created = models.DateTimeField(default=datetime.now())
    likes_counter = models.IntegerField(default=0)

    def __str__(self):
        return str(self.user)


class UserFollowing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')

    def __str__(self):
        return str(self.following)


class UserFollowers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    followers = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')

    def __str__(self):
        return str(self.followers)


class LikedPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    liked_post = models.ForeignKey(Post, on_delete=models.CASCADE)


class ListFollowing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    list_following = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True)

    def __str__(self):
        return str(self.user)


