from rest_framework.serializers import HyperlinkedModelSerializer, \
    PrimaryKeyRelatedField, SlugRelatedField, ModelSerializer
from .models import User, UserRole, Task, Project


class UserRoleModelSerializer(HyperlinkedModelSerializer):
    queryset = UserRole.objects.all()

    class Meta:
        model = UserRole
        fields = ['name']


class UserModelSerializer(HyperlinkedModelSerializer):
    role = SlugRelatedField(queryset=UserRole.objects.all(),
                            slug_field='name')

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'role']


class ProjectModelSerializer(ModelSerializer):
    queryset = Project.objects.all()

    class Meta:
        model = Project
        exclude = ['closed_date', 'updated_at']


class TaskModelSerializer(ModelSerializer):
    Project = SlugRelatedField(queryset=Project.objects.all(),
                            slug_field='name')

    class Meta:
        model = Task
        fields =['Project', 'description', 'assigned_to', 'created_by', 'updated_at']