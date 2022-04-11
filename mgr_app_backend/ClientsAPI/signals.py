from .models import Teacher
from django.contrib.auth.models import Group, User
from django.dispatch import receiver
from django.db.models.signals import (
    pre_save,
    post_save,
    pre_delete,
    post_delete,
    m2m_changed,
)

@receiver(pre_save, sender=User)
def user_pre_save_receiver(sender, instance, *args, **kwargs):
    '''
    This receiver will put freshly created user as active by default.
    '''
    instance.is_active = True
    
    # standardUserGroup = Group.objects.get(name='standard_user')
    # standardUserGroup.user_set.add()

@receiver(post_save, sender=User)
def user_post_save_receiver(sender, instance, created, *args, **kwargs):
    '''
    This receiver allow to create a teacher just after user is crated during sign up.
    Teacher will inherit of basic user infos (first name, last name and email).
    
    Note : User can have only one teacher.
    '''
    # Get user group
    try:
        userGroup = instance.groups.get(name="standard_user")
        print("Try")
    except Exception:
        print("except")
        standardUserGroup = Group.objects.get(name='standard_user')
        standardUserGroup.user_set.add(instance)
        instance.save()
    else:
        print("success")
        userGroup = instance.groups.get(name="standard_user")
        print(instance)
        print(userGroup)

        # # Get user infos
        # userFname = instance.first_name
        # userLname = instance.last_name
        # userEmail = instance.email
        # # Create a teacher with same data
        # teacher = Teacher(user=instance, teacher_fname=userFname, teacher_lname=userLname, teacher_email=userEmail)
        # teacher.save()
    
    # if not instance:
    #     return

    # if hasattr(instance, '_dirty'):
    #     return

    # try:
    #     instance._dirty = True
    #     standardUserGroup = Group.objects.get(name='standard_user')
    #     standardUserGroup.user_set.add(instance)
    #     instance.save()
    # finally:
    #     del instance._dirty
    

    #     # Get user infos
    #     userFname = instance.first_name
    #     userLname = instance.last_name
    #     userEmail = instance.email
    #     # Create a teacher with same data
    #     teacher = Teacher(user=instance, teacher_fname=userFname, teacher_lname=userLname, teacher_email=userEmail)
    #     teacher.save()

    # Check here, why it does't work ...

    

    #g = Group.objects.get(name='standard_user') 
    #g.user_set.add(instance)
    #g.permissions.set([1])
    #g.permissions.set([permission_list])

    # standardUserGroup = Group.objects.get(name='standard_user')
    # standardUserGroup.user_set.add(instance.user)
    #instance.groups.add(standardUserGroup)