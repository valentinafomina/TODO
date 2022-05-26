from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db import models


class UserRole(models.Model):
    name = models.CharField(
        verbose_name='имя',
        max_length=64,
    )
    description = models.TextField(
        verbose_name='описание',
        blank=True,
    )


class User(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.CharField(max_length=64, unique=True)
    role = models.ForeignKey(UserRole, verbose_name='Роль',
                             on_delete=models.CASCADE, null=True)
    is_active = models.BooleanField(default=True, verbose_name='активный')
    # groups = related_name='non-admin'
    # user_permissions = 'non-admin'


class Project(models.Model):
    name = models.CharField(max_length=64)
    repo = models.CharField(max_length=128)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,)
    created_date = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True, null=False)
    closed_date = models.DateTimeField(blank=True, null=True)


class Task(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE,
                                   related_name='owner')
    Project = models.ForeignKey(Project, on_delete=models.CASCADE)
    description = models.TextField()
    assigned_to = models.ManyToManyField(User, related_name='responsible')
    created_date = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField(default=True, null=False)
    closed_date = models.DateTimeField(blank=True, null=True)

