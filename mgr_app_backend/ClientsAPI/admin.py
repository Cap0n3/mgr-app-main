from django.contrib import admin
from rest_framework_simplejwt import token_blacklist
from rest_framework_simplejwt.token_blacklist.admin import OutstandingTokenAdmin
# Register your models here.
from .models import Clients, Teacher, Notifications

#Register your models here.
admin.site.register(Teacher)
admin.site.register(Clients)
admin.site.register(Notifications)

# Simple JWT bug workaround
class OutstandingTokenAdmin(OutstandingTokenAdmin):
    '''
    Work around for a bug with Simple JWT, can't delete users if using token blacklist app.

    Bug Description
    ---------------

    When trying to delete a user, following message appears :
    - "Deleting the user `<UserName>` would result in deleting related objects, but your account doesn't have permission to delete the following types of objects: outstanding token".
    
    Solution
    --------

    Solution found in this github issues :

    - https://github.com/jazzband/djangorestframework-simplejwt/issues/266
    '''
    def has_delete_permission(self, *args, **kwargs):
        return True # or whatever logic you want

admin.site.unregister(token_blacklist.models.OutstandingToken)
admin.site.register(token_blacklist.models.OutstandingToken, OutstandingTokenAdmin)