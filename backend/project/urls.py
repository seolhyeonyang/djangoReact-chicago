"""admin URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.conf.urls import url, include
from common.views import Connection
from rest_framework import routers
router = routers.DefaultRouter()

urlpatterns = [
    path('connection', Connection.as_view()),
    url('board', include('board.urls')),
    url(r'^api/member/', include('member.urls')),
    url(r'^adm/member/', include('member.urls')),
]


'''
cbv(class based view) 방식
from common.views import Connection
from django.urls import path, include
from rest_framework import routers
# router = routers.DefaultRouter()

urlpatterns = [
    path('connection', Connection.as_view()),
    path('board', include('board.urls')),
    path('member', include('member.urls')),

]
'''