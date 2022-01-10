from django.contrib import admin

# Register your models here.
from .models import Clients, Teacher

#Register your models here.
admin.site.register(Teacher)
admin.site.register(Clients)