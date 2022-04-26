from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from mainapp.views import UserModelViewSet, UserRoleModelViewSet


router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('user_roles', UserRoleModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
]

