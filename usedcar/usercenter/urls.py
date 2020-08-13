from django.urls import path

from . import views

urlpatterns = [
    # path("one/",views.one),#http://127.0.0.1:8000/beta/users/one/ 通信后端的路由
    path("<str:username>/", views.UserCenterViews.as_view()), #http://127.0.0.1:8000/beta/users/<str:username>/
]