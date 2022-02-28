# =========================== CUSTOM VALIDATORS =========================== #
# Purpose : Funcs to filter data sent by Client before storage in model.
# ========================================================================= #
from django.core.exceptions import ValidationError
import re

def validateCharField(value):
	'''
	Purpose : 
		Func to validate text inputs. No numbers and no special chars.
	Note :
		match var contains all special chars/numbers used in input.
	'''
	match = re.findall(r'[^A-Za-z\s\-\'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]', value)
	
	if len(match) != 0:
		raise ValidationError("No special characters please !")

def validateEmailField(value):
	'''
	Purpose : 
		Func to validate email inputs.
	'''
	match = re.search(r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', value)

	if match == None:
		raise ValidationError("Email is invalid !")
	
def validatePhoneField(value):
	
	# For Swiss format only ...
	swissPhone = re.search(r'(^0[27][0-9]\s[0-9]{3}[\s.][0-9]{2}\s[0-9]{2}$)', value)
	
	if swissPhone == None:

		raise ValidationError("Phone number is invalid !")