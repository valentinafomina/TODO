from rest_framework.viewsets import ModelViewSet
from .models import User, UserRole, Project, Task
from .serializers import UserModelSerializer, UserRoleModelSerializer, \
    ProjectModelSerializer, TaskModelSerializer


class UserRoleModelViewSet(ModelViewSet):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TaskModelViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskModelSerializer
