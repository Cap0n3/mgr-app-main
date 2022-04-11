from .models import User, Teacher
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

@receiver(post_save, sender=User)
def user_post_save_receiver(sender, instance, *args, **kwargs):
    '''
    This receiver allow to create a teacher just after user is crated during sign up.
    Teacher will inherit of basic user infos (first name, last name and email).
    
    Note : User can have only one teacher.
    '''
    # Get user infos
    userFname = instance.first_name
    userLname = instance.last_name
    userEmail = instance.email
    # Create a teacher with same data
    teacher = Teacher(user=instance, teacher_fname=userFname, teacher_lname=userLname, teacher_email=userEmail)
    teacher.save()