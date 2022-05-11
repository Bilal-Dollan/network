
from django.urls import path

from . import views

urlpatterns = [
    path("", views.list_post, name="index"),
    path("", views.list_post, name='list-post'),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create/post", views.create_post, name="create-post"),
    path("likes/counter/<int:post_id>", views.likes_counter, name="likes-counter"),
    path("profile/page/<int:user_id>", views.fetch_profile, name="fetch-profile"),
    path("follow/<int:user_id>", views.follow_user, name="follow-user"),
    path("list/following", views.list_following, name="list-following-post"),
    path("edit/<int:post_id>", views.edit_form, name="edit-form"),
]
