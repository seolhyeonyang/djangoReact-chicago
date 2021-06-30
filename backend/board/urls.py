from django.conf.urls import url
from .views import Boards as boards

urlpatterns = [
    url('create', boards.as_view())
]