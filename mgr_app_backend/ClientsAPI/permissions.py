from rest_framework import permissions


class IsAdminOrOwner(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		isAdmin = request.user.is_superuser
		isOwner = obj.teacher.user.id == request.user.id
		if isAdmin:
			return True
		elif isOwner:
			return True
		else:
			return False
