from rest_framework.viewsets import ModelViewSet
from .models import User, UserRole
from .serializers import UserModelSerializer, UserRoleModelSerializer


class UserRoleModelViewSet(ModelViewSet):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

