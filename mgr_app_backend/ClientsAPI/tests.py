from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Teacher

# Create your tests here.
class SignupTests(APITestCase):
    def test_create_account(self):
        """
        Ensure we can create a new user account.
        """
        url = reverse('signup')
        data = {
            'username' : 'TestUser',
            'first_name' : 'Al',
            'last_name' : 'Capone',
            'password' : 'kcknail2'
        }
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Check if new user was properly created
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'TestUser')
        # Check if associated Teacher was properly created
        self.assertEqual(Teacher.objects.count(), 1)
        self.assertEqual(Teacher.objects.get().teacher_fname, 'Al')