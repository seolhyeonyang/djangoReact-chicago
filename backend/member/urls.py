from django.conf.urls import url
from member import views

urlpatterns = [
    url(r'^register', views.members),
    url(r'^list', views.members),
]

'''
cbv(class based view) 방식
from django.conf.urls import url
from .views import Members as members
from .views import Member as member
from django.urls import path, include
urlpatterns = [
    url('/register', members.as_view()),
    path('/<int:pk>/', member.as_view()),
]

'''