from rest_framework.generics import  RetrieveUpdateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status, permissions

from .models import User, UserRole, Project, Task
from .serializers import UserModelSerializer, UserRoleModelSerializer, \
    UserModelAdvancedSerializer, ProjectModelSerializer, TaskModelSerializer


class ProjectPaginator(LimitOffsetPagination):
    default_limit = 10


class TaskPaginator(LimitOffsetPagination):
    default_limit = 20


class UserRoleModelViewSet(ModelViewSet):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleModelSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserRetrieveUpdatelViewSet(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPaginator

    def get_queryset(self):
        param = self.request.query_params.get('name')
        if param:
            return Project.objects.filter(name__contains=param[0])
        return super().get_queryset()


class TaskModelViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskModelSerializer
    pagination_class = TaskPaginator
    filterset_fields = ['Project']

    def destroy(self, request, pk, *args, **kwargs):
        task = Task.objects.get(pk=pk)
        task.is_active = False
        task.save()
        data = TaskModelSerializer(task).data
        return Response(data, status=status.HTTP_200_OK)


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    # serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == '2.0':
            print(f'request: {self.headers["Vary"]}')
            return UserModelAdvancedSerializer
        else:
            print(f'request: {self.request}')
            return UserModelSerializer

