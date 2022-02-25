from django.db import models
from django.contrib.auth.models import User
from .CustomValidators import validateCharField, validateEmailField

#GLOBAL LISTS (FOR CHOICES)

COUNTRY = (
    ('Suisse', 'Suisse'),
    ('France', 'France'),
)

# ====== TEACHER ====== #
class Teacher(models.Model):
	user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
	business_name = models.CharField(max_length=200, default='My School', blank=True)
	business_logo = models.ImageField(default='genericLogo.png', null=True, blank=True)
	business_website = models.CharField(max_length=200, default='www.myschool.com', blank=True)
	teacher_fname = models.CharField(max_length=200, default='Pierre')
	teacher_lname = models.CharField(max_length=200, default='Dupont')
	teacher_email = models.EmailField(default='myschool@mymail.com')
	teacher_phone = models.CharField(max_length=200, blank=True)
	teacher_address = models.CharField(max_length=200, default='6 chemin de Nullepart')
	teacher_postal = models.CharField(max_length=200, default='1200')
	teacher_city = models.CharField(max_length=200, default='Genève')
	teacher_country = models.CharField(max_length=200, default='Suisse', choices=COUNTRY)
	teacher_bankNumber = models.CharField(max_length=200, default='45-875468-3')
	teacher_iban = models.CharField(max_length=200, default='CH65 7654 5221 0000 4587 5468 3')
	teacher_bicSwift = models.CharField(max_length=200, default='POSXF')
	teacher_taxLabel = models.CharField(max_length=50, default="Taxe")
	teacher_tax = models.IntegerField(default=0)
	teacher_dueDays = models.IntegerField(default=10)

	def __str__(self):
		return self.teacher_lname + " " + self.teacher_fname + " (" + str(self.id) + ")"

# ====== CLIENTS (STUDENTS) ====== #
class Clients(models.Model):
	#Choices Lists
	DAY_LIST = (
		('Lundi', 'Lundi'),
		('Mardi', 'Mardi'),
		('Mercredi', 'Mercredi'),
		('Jeudi', 'Jeudi'),
		('Vendredi', 'Vendredi'),
		('Samedi', 'Samedi'),
		('Dimanche', 'Dimanche'),
	)
	LESSONS_FREQ = (
		('Quotidien', 'Quotidien'),
		('Hebdomadaire', 'Hebdomadaire'),
		('Bimensuel', 'Bimensuel'),
		('Libre', 'A la carte'),
	)
	LESSON_DURATION = (
		('25', '25'),
		('30', '30'),
		('35', '35'),
		('40', '40'),
		('45', '45'),
		('50', '50'),
		('55', '55'),
		('60', '60'),
		('65', '65'),
		('70', '70'),
		('75', '75'),
		('80', '80'),
		('85', '85'),
		('90', '90'),
	)
	STUDENT_LEVEL = (
		('D1', 'Débutant 1'),
		('D2', 'Débutant 2'),
		('D3', 'Débutant 3'),
		('I1', 'Intermédiaire 1'),
		('I2', 'Intermédiaire 2'),
		('I3', 'Intermédiaire 3'),
		('A1', 'Avancé 1'),
		('A2', 'Avancé 2'),
		('A3', 'Avancé 3'),
	)
	PAYMENT_OPTION = (
		('Versement', 'Versement'),
		('Bulletin', 'Bulletin'),
		('Twint', 'Twint'),
		('Cash', 'Cash'),
	)
	CURRENCY = (
		('CHF', 'CHF'),
		('EUR', 'EUR'),
	)

	teacher = models.ForeignKey(Teacher, null=True, on_delete=models.SET_NULL)
	student_pic = models.ImageField(default='ProfilPic.png', null=True, blank=True)
	first_name = models.CharField(max_length=50, validators=[validateCharField])
	last_name = models.CharField(max_length=50, validators=[validateCharField])
	lesson_day = models.CharField(max_length=20, default="Lundi", choices=DAY_LIST)
	lesson_hour = models.TimeField(blank=True)
	lesson_duration = models.CharField(max_length=15, default=60, choices=LESSON_DURATION)
	lesson_frequency = models.CharField(max_length=50, choices=LESSONS_FREQ)
	instrument = models.CharField(max_length=40, blank=True, validators=[validateCharField])
	student_email = models.EmailField(blank=True, validators=[validateEmailField])
	student_phone = models.CharField(max_length=200, blank=True)
	student_level = models.CharField(max_length=100, blank=True, choices=STUDENT_LEVEL)
	student_birth = models.DateField(blank=True, null=True)
	invoice_fname = models.CharField(max_length=50, validators=[validateCharField])
	invoice_lname = models.CharField(max_length=50, validators=[validateCharField])
	invoice_email = models.EmailField(validators=[validateEmailField])
	invoice_phone = models.CharField(max_length=100, blank=True)
	invoice_address = models.CharField(max_length=100)
	invoice_postal = models.CharField(max_length=100)
	invoice_city = models.CharField(max_length=50, validators=[validateCharField])
	invoice_country = models.CharField(max_length=200, default="Suisse", choices=COUNTRY)
	invoice_numbering = models.BooleanField(default=False)
	billing_rate = models.IntegerField(default=50)
	billing_currency = models.CharField(max_length=20, default="CHF", choices=CURRENCY)
	payment_option = models.CharField(max_length=100, default="Versement", choices=PAYMENT_OPTION)
	notes = models.TextField(blank=True)
	creation_date = models.DateField(auto_now_add=True)

	def __str__(self):
		return self.last_name + " " + self.first_name + "(" + str(self.id) + ")"
