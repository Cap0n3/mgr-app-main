# =========================== CUSTOM VALIDATORS =========================== #
# Purpose : Funcs to filter data sent by Client before storage in model.
# ========================================================================= #
from django.core.exceptions import ValidationError
import re
from .magicNumber import determine_filetype
# ========================================== #
# =============== VALIDATORS =============== #
# ========================================== #

def validateFile(value):
	# File extension for file image only is done by Django with ImageField

	# Get first 4 bytes of file
	fileBytes = value.file.read()
	magicNumbers = fileBytes[0:4]
	print(magicNumbers.hex())
	
	#Error
	#test = determine_filetype(value.file.read())
	raise ValidationError("File mime is : ")


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