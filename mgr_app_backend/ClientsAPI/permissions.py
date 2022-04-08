from rest_framework import permissions

class IsAdminOrUser(permissions.BasePermission):
	'''
	Permissions for Users.
	'''
	def has_object_permission(self, request, view, obj):
		isAdmin = request.user.is_superuser
		# Request user associated with teacher and connected user (should be equal)
		isUser = obj.id == request.user.id

		if isAdmin:
			return True
		elif isUser:
			return True
		else:
			return False

class IsAdminOrTeacher(permissions.BasePermission):
	'''
	Permissions for Teachers.
	'''
	def has_object_permission(self, request, view, obj):
		isAdmin = request.user.is_superuser
		# Request user associated with teacher and connected user (should be equal)
		isTeacher = obj.user.id == request.user.id

		if isAdmin:
			return True
		elif isTeacher:
			return True
		else:
			return False

class IsAdminOrOwner(permissions.BasePermission):
	'''
	Action permissions for stored client.
	'''
	def has_object_permission(self, request, view, obj):
		isAdmin = request.user.is_superuser
		# Request user associated with object and connected user (should be equal)
		isOwner = obj.teacher.user.id == request.user.id
		if isAdmin:
			return True
		elif isOwner:
			return True
		else:
			return False

class IsSignUp(permissions.BasePermission):
	'''
	Permission to create a new user during sign up. Perms are granted only 
	to first time users during sign up or administrators at any time.
	'''
	message = 'Existing users are not allowed to create new users.'

	def has_permission(self, request, view):
		isAdmin = request.user.is_superuser
		isUserLogged = request.user.is_authenticated

		if isAdmin:
			return True
		elif isUserLogged:
			return False
		else:
			#It's a new user
			# WARNING => HOW TO LIMIT THIS TO FRESH USERS ONLY ??
			return True
