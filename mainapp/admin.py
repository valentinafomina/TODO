from django.contrib import admin

from mainapp.models import User, UserRole

admin.site.register(User)
admin.site.register(UserRole)