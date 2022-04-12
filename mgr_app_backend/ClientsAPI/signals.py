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

@receiver(post_save, sender=User)
def user_post_save_receiver(sender, instance, created, *args, **kwargs):
    '''
    This receiver allow to create a teacher just after user is crated during sign up.
    Teacher will inherit of basic user infos (first name, last name and email).
    
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
        
        # === Add new user to group === #
        '''
        Note : I kept this code here because it seems impossible to assign group from post_save signals.
        This code should work but it doesn't, it's possible to change user group later on but not from here
        and I have no clue why...
        '''
        # try:
        #     standardUserGroup = Group.objects.get(name='standard_user')
        # except Group.DoesNotExist:
        #     pass
        # else:
        #     standardUserGroup.user_set.add(instance)
        #     #instance.save()