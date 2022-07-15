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
    Test standard user token, views & more.
    '''
    def setUp(self):
        '''
        Create a test user for testing.
        '''
        signupURL = reverse('signup')
        self.client.post(signupURL, user_data, format='multipart')
        # Get associated teacher ID
        self.teacherID = Teacher.objects.get().id
    
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
        # Test decoded data in token
        self.assertEqual(User.objects.get().id, userTokenData['user_id'])
        self.assertEqual(User.objects.get().username, userTokenData['username'])
        self.assertEqual(User.objects.get().first_name, userTokenData['fname'])
        self.assertEqual(User.objects.get().last_name, userTokenData['lname'])

    def test_TeachersView(self):
        '''
        Test Teacher view, basic data response and update of informations.
        '''
        urlView = reverse('teacher')
        # ================ #
        # === Security === #
        # ================ #
        # Test if unauthenticated user can view page
        notAuth_response = self.client.get(urlView)
        self.assertEqual(notAuth_response.status_code, status.HTTP_401_UNAUTHORIZED)
        # Authenticate user
        self.client.login(username=user_data['username'], password=user_data['password'])
        # ================= #
        # === Test view === #
        # ================= #
        viewResponse = self.client.get(urlView)
        self.assertEqual(viewResponse.status_code, status.HTTP_200_OK)
        # Test viewResponse data
        self.assertEqual(viewResponse.data[0]['teacher_fname'], user_data['first_name'])
        self.assertEqual(viewResponse.data[0]['teacher_lname'], user_data['last_name'])

    def test_UpdateTeacherView(self):
        urlUpdate = reverse('teacher-update', kwargs={'pk' : self.teacherID})
        # Create data for update
        updateData = {
            'business_name' : 'Test Company',
            'business_website' : 'www.mytestbusiness.com',
            'teacher_fname' : 'Franky',
            'teacher_lname' : 'Letest',
            'teacher_email' : 'test@gemal.com',
            'teacher_phone' : '076 766 78 99',
            'teacher_address' : '2 Chemin du Teste',
            'teacher_postal' : '1207',
            'teacher_city' : 'Lausanne',
            'teacher_country' : 'Suisse',
            'teacher_bankNumber' : '01-444001-3',
            'teacher_iban' : 'CH66 0200 4000 0001 044 4000 3',
            'teacher_bicSwift' : 'TESTSXF',
            'teacher_taxLabel' : 'TestTax',
            'teacher_tax' : 10,
            'teacher_dueDays' : 20
        }
        # ================ #
        # === Security === #
        # ================ #
        # Test if unauthenticated user can udpate teacher infos
        notAuthResponse = self.client.put(urlUpdate, updateData)
        self.assertEqual(notAuthResponse.status_code, status.HTTP_401_UNAUTHORIZED)
        # ================= #
        # === Test view === #
        # ================= #
        # Authenticate user
        self.client.login(username=user_data['username'], password=user_data['password'])
        # Test if update is a success
        updateResponse = self.client.put(urlUpdate, updateData)
        self.assertEqual(updateResponse.status_code, status.HTTP_200_OK)
        # Test a few data to see if anything went wrong (maybe not necessary ...)
        getResponse = self.client.get(reverse("teacher"))
        self.assertEqual(getResponse.data[0]['teacher_fname'], updateData['teacher_fname'])
        self.assertEqual(getResponse.data[0]['teacher_lname'], updateData['teacher_lname'])
