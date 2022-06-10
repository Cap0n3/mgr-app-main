from .models import Teacher
from django.contrib.auth.models import Group, User
from django.dispatch import receiver
from django.db.models.signals import (
    pre_save,
    post_save,
)

@receiver(pre_save, sender=User)
def user_pre_save_receiver(sender, instance, *args, **kwargs):
    '''
    This receiver will put freshly created user as active by default.
    '''
    instance.is_active = True
    
    '''
    Just in case. User shouln't be able to control this values if UserSerializer
    fields are not explicitly activated.
    '''
    instance.is_superuser = False
    instance.is_staff = False

@receiver(post_save, sender=User)
def user_post_save_receiver(sender, instance, created, *args, **kwargs):
    '''
    This receiver allow to create a teacher just after user is crated during sign up.
    Teacher will inherit of basic user infos (first name, last name and email). It'll
    also assign user to group standard_user.
    
    Note : User can have only one teacher.
    '''
    if created:
        # === Create Corresponding Teacher === #
        # Get user infos
        userFname = instance.first_name
        userLname = instance.last_name
        userEmail = instance.email
        # Create a teacher with same data
        teacher = Teacher(user=instance, teacher_fname=userFname, teacher_lname=userLname, teacher_email=userEmail)
        teacher.save()

        # === Add new user to standard group === #
        '''
        WARNING ! Don't activate 'groups' or 'permissions' fields in UserSerializer otherwise it'll override 
        these post_save instructions with what was put in the JSON request. It can also be dangerous because a hacker 
        could potentially gain privileges with a corrupted HTTP request.
        '''
        try:
            standardUserGroup = Group.objects.get(name='standard_user')
        except Group.DoesNotExist:
            pass
        else:
            standardUserGroup.user_set.add(instance)
            #instance.save()