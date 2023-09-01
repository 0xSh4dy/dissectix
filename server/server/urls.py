from django.contrib import admin
from django.urls import path,include
from authserver import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',include("authserver.urls")),
    path('dissectix/',include("dissectix.urls"))
]
