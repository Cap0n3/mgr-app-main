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
		Func to validate text inputs. 
		@isValid - Letters, spaces and [-] (no numbers or special chars.)
		@Note - Match var contains all special chars/numbers used in input.
	'''
	forbidChars = re.findall(r'[^A-Za-z\s\-\'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]', value)
	
	if len(forbidChars) != 0:
		raise ValidationError("No special characters or numbers please !")

def validateBusinessName(value):
	'''
		Func to validate business name.
		@isNOTValid : [*%#<>="+\t\r\n\] are not valid chars.
	'''
	forbidChars = re.findall(r'[*%#<>="+\t\r\n\\\\]+', value)

	if len(forbidChars) != 0:
		raise ValidationError("No special characters please !")

def validateWebsite(value):
	'''
		Func to validate business website format.
	'''
	match = re.search(r'(^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$)', value)

	if match == None:
		raise ValidationError("Domain name for website is invalid !")

def validateEmailField(value):
	'''
		Func to validate email inputs.
	'''
	match = re.search(r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)', value)

	if match == None:
		raise ValidationError("Email is invalid !")
	
def validatePhoneField(value):
	'''
		Func to validate phones input.
		@isValid : only digits, spaces and optional '+' at the beginning (+33, +41, etc...).
	'''
	isPhoneValid = re.search(r'^\+?[\d, \s]+$', value)
	
	if isPhoneValid == None:
		raise ValidationError("Phone number is invalid ! Only digits, spaces and optional '+' at beginning (+33, +41, etc...).")

def validateAddress(value):
	'''
		Func to validate address input.
		@isValid : Letters, space, digits and [.,-:].
	'''
	specialChars = re.findall(r'[^\w\s.,:-]+', value)

	if len(specialChars) != 0:
		raise ValidationError("No special characters please ! Only [.,-:] are accepted.")

def validatePostal(value):
	'''
		Func to validate postal input.
		@isValid : All caps letters, number and [-].
	'''
	forbidChars = re.findall(r'[^A-Z0-9\s-]+', value)

	if len(forbidChars) != 0:
		raise ValidationError("Postal code is invalid !")

def validateNote(value):
	'''
		Func to validate note textarea.
		@isNOTValid : [*#<>='+\t\] are not valid chars.
	'''
	forbidChars = re.findall(r"[*#<>=+\t\\\\]+", value)

	if len(forbidChars) != 0:
		raise ValidationError("No special characters please !")

def validateBankNumber(value):
	'''
		Func to validate bank account number.
		@isValid : Letters (upper, lower), spaces, numbers and [-].
	'''
	forbidChars = re.findall(r'[^\d-A-Za-z\s]+', value)

	if len(forbidChars) != 0:
		raise ValidationError("Bank account number is invalid !")

def validateBankIban(value):
	'''
		Func to validate bank IBAN number.
		@isValid : Letters (upper, lower), spaces and numbers.
	'''
	forbidChars = re.findall(r'[^\dA-Za-z\s]+', value)

	if len(forbidChars) != 0:
		raise ValidationError("Bank IBAN number is invalid !")

def validateBankSwift(value):
	'''
		Func to validate bank Bic/Swift number.
		@isValid : Letters (upper), spaces and numbers.
	'''
	forbidChars = re.findall(r'[^\dA-Z\s]+', value)

	if len(forbidChars) != 0:
		raise ValidationError("Swift number is invalid !")