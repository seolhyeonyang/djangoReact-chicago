from django.conf.urls import url
from .views import Members as members, Member as member

urlpatterns = [
    url('signup', members.as_view()),
    url('login', member.as_view()),
]