from django.db import models

#GLOBAL LISTS (FOR CHOICES)

COUNTRY = (
    ('Suisse', 'Suisse'),
    ('France', 'France'),
)

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
		('Hebdomadaire', 'Hebdomadaire'),
		('Bimensuel', 'Bimensuel'),
		('A la carte', 'A la carte'),
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

	#teacher = models.ForeignKey(Teacher, null=True, on_delete=models.SET_NULL)
	#student_pic = models.ImageField(default='studentPic.png', null=True, blank=True)
	first_name = models.CharField(max_length=200)
	last_name = models.CharField(max_length=200)
	invoice_fname = models.CharField(max_length=200)
	invoice_lname = models.CharField(max_length=200)
	student_birth = models.DateField(blank=True, null=True)
	lesson_day = models.CharField(max_length=20, default="Lundi", choices=DAY_LIST)
	lesson_hour = models.TimeField(blank=True)
	lesson_duration = models.CharField(max_length=15, default=60, choices=LESSON_DURATION)
	lesson_frequency = models.CharField(max_length=100, choices=LESSONS_FREQ)
	instrument = models.CharField(max_length=40, blank=True)
	student_level = models.CharField(max_length=100, blank=True, choices=STUDENT_LEVEL)
	student_email = models.EmailField(blank=True)
	student_phone = models.CharField(max_length=200, blank=True)
	billing_rate = models.IntegerField(default=50)
	billing_currency = models.CharField(max_length=20, default="CHF", choices=CURRENCY)
	invoice_numbering = models.BooleanField(default=False)
	invoice_email = models.EmailField()
	invoice_phone = models.CharField(max_length=100, blank=True)
	invoice_address = models.CharField(max_length=200)
	invoice_postal = models.CharField(max_length=200)
	invoice_city = models.CharField(max_length=200)
	invoice_country = models.CharField(max_length=200, default="Suisse", choices=COUNTRY)
	payment_option = models.CharField(max_length=100, default="Versement", choices=PAYMENT_OPTION)
	notes = models.TextField(blank=True)
	creation_date = models.DateField(auto_now_add=True)

	def __str__(self):
		return self.last_name + " " + self.first_name + "(" + str(self.id) + ")"
