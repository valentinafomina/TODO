from django.core.management.base import BaseCommand
from django.contrib.auth.models import User as AuthUser

from mainapp.models import User, UserRole, Project, Task


class Command(BaseCommand):
    def handle(self, *args, **options):

        UserRole.objects.all().delete()
        UserRole.objects.create(name='administrator',
                                description='администратор',
                            )
        UserRole.objects.create(name='manager',
                                description='менеджер, может создавать проекты, '
                                            'добавлять разработчиков, создавать'
                                            ' таски, назначать ответсвтенных, '
                                            'менять статус тасок',
                                )
        UserRole.objects.create(name='developer',
                                description='разработчик, может добавлять '
                                            'таски, менять их статус',
                                )



        User.objects.all().delete()
        User.objects.create(username='IvanI', first_name='Ivan',
                            last_name='Ivanov', email='ivan@mail.com',
                            role=UserRole.objects.get(name='manager'),
                            )
        User.objects.create(username='FedorF', first_name='Fedor',
                            last_name='Fedorov', email='fedor@mail.com',
                            role=UserRole.objects.get(name='manager'),
                            )

        # AuthUser.objects.all().delete()
        # AuthUser.objects.create_superuser('admin', 'admin@admin.local',
        #                                   'admin', first_name='admin')

        Project.objects.all().delete()
        Project.objects.create(name='Curiosity', repo='https://github/curiosity',
                               owner=User.objects.get(last_name='Ivanov'),
                            )

        Task.objects.all().delete()
        Task.objects.create(created_by=User.objects.get(last_name='Fedorov'),
                            Project=Project.objects.get(name='Curiosity'),
                            description='измерить расстояние до Марса'
                               )

        Task.objects.create(created_by=User.objects.get(last_name='Ivanov'),
                            Project=Project.objects.get(name='Curiosity'),
                            description='взять образец грунта'
                            )