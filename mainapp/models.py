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


class User(models.Model):
    username = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    email = models.CharField(max_length=64, unique=True)
    role = models.ForeignKey(UserRole, verbose_name='Роль',
                             on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True, verbose_name='активный')

