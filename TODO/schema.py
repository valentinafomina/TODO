import graphene
from graphene_django import DjangoObjectType

from mainapp.models import User, Task, Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_tasks = graphene.List(TaskType)

    def resolve_all_users(root, info):
            return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_tasks(root, info):
        return Task.objects.all()




schema = graphene.Schema(query=Query)

