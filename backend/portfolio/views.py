from rest_framework import viewsets, mixins, status
from rest_framework.response import Response
from .models import Project, Lead
from .serializers import ProjectSerializer, LeadSerializer


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint for viewing projects.
    Supports list and retrieve operations.
    Projects can be retrieved by slug using lookup_field.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'


class LeadViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    """
    API endpoint for creating leads (contact form submissions).
    Only supports POST (create) operation.
    """
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Thank you! We'll contact you soon."},
            status=status.HTTP_201_CREATED
        )
