from django.contrib import admin
from django.urls import path,include
from dissectixserver import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dissectix/',include("dissectixserver.urls"))
]
