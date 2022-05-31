from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


from mainapp.views import UserModelViewSet, UserRoleModelViewSet, \
    ProjectModelViewSet, TaskModelViewSet, UserRetrieveUpdatelViewSet

schema_view = get_schema_view(
    openapi.Info(
    title="TODO",
    default_version='1',
    description="Project Documentation",
    contact=openapi.Contact(email="me@admin.local"),
    license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
    )


router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('user_roles', UserRoleModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('tasks', TaskModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api/users/<int:pk>/retrieve-update',
         UserRetrieveUpdatelViewSet.as_view(), name='user_retrieve_update'),
    path('api-token-auth/', views.obtain_auth_token),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
]

