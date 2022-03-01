# =========================== CUSTOM VALIDATORS =========================== #
# Purpose : Funcs to filter data sent by Client before storage in model.
# ========================================================================= #
from django.core.exceptions import ValidationError
import re

# ====== UTILS FUNCS ====== #

# TO SAVE & ERASE => NOT USED HERE BUT CAN BE HELPFUL
def isSwissNumber(phoneNumber):
	'''
		Check if swiss phone number is in correct format.
		Accepted values are 02[0-9] 344 55 66 or 07[0-9] 344 55 66
		@Params {str} - Phone number to check.
		@Return {bool} - True if correct.
	'''
	isSwiss = re.search(r'(^0[27][0-9]\s[0-9]{3}[\s.][0-9]{2}\s[0-9]{2}$)', phoneNumber)
	return True if isSwiss != None else False

def isFrenchNumber(phoneNumber):
	'''
		Check if french phone number is in correct format.
		Accepted values are 0[0-9] 45 66 55 76 or 00[0-9][0-9] 45 66 55 76
		@Params {str} - Phone number to check.
		@Return {bool} - True if correct.
	'''
	isThereZeros = re.search(r'^00', phoneNumber)
    
	if isThereZeros != None:
        # There's two zeros, check format
		twoZeros = re.search(r'^0{2}\d{2}\s?[6,7]?\s\d{2}\s\d{2}\s\d{2}\s\d{2}$', phoneNumber)
		return True if twoZeros != None else False
        
	elif isThereZeros == None:
        # There's not two zeros, check format
		noZeros = re.search(r'^0\d\s\d{2}\s\d{2}\s\d{2}\s\d{2}$', phoneNumber)
		return True if noZeros != None else False

# ========================================== #
# =============== VALIDATORS =============== #
# ========================================== #

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
		Func to validate email inputs.
	'''
	match = re.search(r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', value)

	if match == None:
		raise ValidationError("Email is invalid !")
	
def validatePhoneField(value):
	'''
		Func to check phones input
		@isValid : only digits, spaces and '+' at beginning (optional)
	'''
	isPhoneValid = re.search(r'^\+?[\d, \s]+$', value)
	
	if isPhoneValid == None:
		raise ValidationError("Phone number is invalid ! Only digits, spaces and '+' at beginning (optional).")