from rest_framework import permissions
from projects.models import ProjectMembership


class IsProjectAdminOrMemberReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        try:
            pmem = ProjectMembership.objects.get(member=request.user, project=obj)
        except ProjectMembership.DoesNotExist:
            return False

        # Разрешить доступ для чтения
        if request.method in permissions.SAFE_METHODS:
            return True

        # Участник может удалять только себя (проверяем ProjectMembership)
        if request.method == "DELETE":
            membership_id = view.kwargs.get('pk')  # Получаем ID Membership из URL
            try:
                membership_to_delete = ProjectMembership.objects.get(pk=membership_id)
                return membership_to_delete.member == request.user
            except ProjectMembership.DoesNotExist:
                return False

        # Администратор может изменять
        return pmem.access_level == 2


class IsProjectMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        try:
            pmem = ProjectMembership.objects.get(member=request.user, project=obj)
        except ProjectMembership.DoesNotExist:
            return False
        return True