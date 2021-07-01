from django.conf.urls import url
from .views import Boards as boards

urlpatterns = [
    url('register', boards.as_view())
]