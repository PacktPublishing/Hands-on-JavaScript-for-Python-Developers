from django.urls import path

from . import views

urlpatterns = [
    path('api', views.api, name='api'),
    path('', views.index, name='index'),
]
