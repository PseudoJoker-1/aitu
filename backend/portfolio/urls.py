from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, LeadViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'leads', LeadViewSet, basename='lead')

urlpatterns = router.urls
