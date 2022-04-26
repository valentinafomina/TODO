from rest_framework.serializers import HyperlinkedModelSerializer, \
    PrimaryKeyRelatedField, SlugRelatedField
from .models import User, UserRole


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


