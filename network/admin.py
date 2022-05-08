from django.contrib import admin
from .models import *


admin.site.register(Post)
admin.site.register(UserFollowing)
admin.site.register(UserFollowers)
admin.site.register(User)
admin.site.register(ListFollowing)
