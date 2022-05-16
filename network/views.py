from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse

from network.forms import PostForm, EditForm
from network.models import Post, LikedPost, UserFollowing, ListFollowing, UserFollowers
from .models import User
from django.core.paginator import Paginator
import json


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def list_post(request):
    form = PostForm()
    all_post = Post.objects.all()
    paginator = Paginator(all_post, 10)
    user = request.user
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, "network/list_post.html", context={
        "all_post": all_post,
        'page_obj': page_obj,
        'user': user,
        'form': form,
    })


@login_required
def create_post(request):
    post_form = PostForm()
    if request.method == "POST":
        post_form = PostForm(request.POST)
        if post_form.is_valid():
            content = post_form.cleaned_data['content']
            user = request.user
            post_form = Post.objects.create(user=user, content=content)
            post_form.save()
            return redirect('list-post')
    return render(request, "network/create_post.html", context={
        "post_form": post_form
    })


@login_required
def likes_counter(request, post_id):
    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        post_likes = Post.objects.get(pk=post_id)
        if not LikedPost.objects.filter(user=request.user, liked_post=post_likes):
            add_like = LikedPost.objects.create(user=request.user, liked_post=post_likes)
            add_like.save()
            post_likes.likes_counter += 1
            post_likes.save()
            return JsonResponse({'body': "add like"})
        else:
            del_like = LikedPost.objects.get(user=request.user, liked_post=post_likes)
            del_like.delete()
            post_likes.likes_counter -= 1
            post_likes.save()
            return JsonResponse({'body': "remove like"})

    return redirect('list-post')


def fetch_profile(request, user_id):
    user_info = User.objects.get(pk=user_id)
    post_list = Post.objects.filter(user=user_info)
    user_list = User.objects.all()
    user = request.user
    follow = True
    followers_count = 0
    following_count = 0

    if user_info == request.user:
        follow = False
    text = 'Follow'
    for fuser in user_list:
        if UserFollowing.objects.filter(user=user_info, following=fuser):
            following_count += 1

        if UserFollowers.objects.filter(user=user_info, followers=fuser):
            followers_count += 1
    if request.user.is_authenticated:
        if UserFollowing.objects.filter(user=request.user, following=user_info).exists():
            text = 'Unfollow'

    else:
        follow = False

    return render(request, "network/user_profile.html", context={
        'post_list': post_list,
        'user_info': user_info,
        'follow': follow,
        'following_count': following_count,
        'followers_count': followers_count,
        'user': user,
        'text': text
    })


@login_required
def follow_user(request, user_id):
    user = User.objects.get(pk=user_id)
    following_post = Post.objects.filter(user=user)
    followed_user = User.objects.get(pk=user_id)
    following_user = request.user
    if not UserFollowing.objects.filter(user=following_user, following=followed_user):
        for following_user_post in following_post:
            add_following = UserFollowing.objects.create(user=following_user, following=followed_user, following_post=following_user_post)
            add_following.save()
        add_follower = UserFollowers.objects.create(user=followed_user, followers=following_user)
        add_follower.save()

    elif UserFollowing.objects.filter(user=following_user, following=followed_user):
        UserFollowing.objects.filter(user=following_user, following=followed_user).delete()
        UserFollowers.objects.filter(user=followed_user, followers=following_user).delete()
    return redirect('fetch-profile', user_id)


@login_required
def list_following(request):
    following_posts = UserFollowing.objects.filter(user=request.user)

    paginator = Paginator(following_posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'network/list_following.html', context={
        'following_posts': following_posts,
        'page_obj': page_obj,
    })


@login_required
def edit_form(request, post_id):
    if request.headers.get("x-requested-with") == "XMLHttpRequest":
        content = json.load(request)['content']
        Post.objects.filter(user=request.user, id=post_id).update(content=content)

    return render(request, 'network/index.html')
