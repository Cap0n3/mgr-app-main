from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import jwt
from mgr_app_backend.settings import SECRET_KEY
from django.contrib.auth.models import User
from .models import Teacher

user_data = {
        'username' : 'TestUser',
        'first_name' : 'Al',
        'last_name' : 'Capone',
        'password' : 'kcknail2'
}

class SignupTest(APITestCase):
    '''
    Test signup process and proper user/teacher creation.
    '''
    def test_CreateUserView(self):
        '''
        Ensure we can create a new user account.
        '''
        url = reverse('signup')
        response = self.client.post(url, user_data, format='multipart')
        # Check request status
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Check if new user was properly created
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'TestUser')
        # Check if associated Teacher was properly created
        self.assertEqual(Teacher.objects.count(), 1)
        self.assertEqual(Teacher.objects.get().teacher_fname, 'Al')
        self.assertEqual(Teacher.objects.get().teacher_lname, 'Capone')
        self.assertEqual(Teacher.objects.get().user.id, User.objects.get().id)

class ProfileTest(APITestCase):
    '''
    Test standard user token, profile views & more.
    '''
    def setUp(self):
        '''
        Create a test user for testing.
        '''
        signupURL = reverse('signup')
        self.client.post(signupURL, user_data, format='multipart')
    
    def test_ObtainTokenPair(self):
        '''
        Test if token pair is properly generated and contain valid infos about current user.
        '''
        tokenURL = reverse('token_obtain_pair')
        userAuth = {
            'username' : user_data['username'],
            'password' : user_data['password']
        }
        tokenResponse = self.client.post(tokenURL, userAuth, format='json')
        # Test if token response is a success
        self.assertEqual(tokenResponse.status_code, status.HTTP_200_OK)
        # Extract token data from response
        userToken = {
            'access' : tokenResponse.data['access'],
            'refresh' : tokenResponse.data['refresh']
        }
        # Decode data
        userTokenData = jwt.decode(userToken['access'], SECRET_KEY, algorithms="HS256")
        # Test token data
        self.assertEqual(User.objects.get().id, userTokenData['user_id'])
        self.assertEqual(User.objects.get().username, userTokenData['username'])
        self.assertEqual(User.objects.get().first_name, userTokenData['fname'])
        self.assertEqual(User.objects.get().last_name, userTokenData['lname'])

    def test_TeachersView(self):
        url = reverse('teacher')
        # Authenticate user
        self.client.login(username=user_data['username'], password=user_data['password'])
        # Test view
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)