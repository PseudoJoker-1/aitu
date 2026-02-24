import requests
from django.conf import settings
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

    def perform_create(self, serializer):
        lead = serializer.save()
        self.send_whatsapp_notification(lead)

    def send_whatsapp_notification(self, lead):
        if not settings.GREEN_API_ID_INSTANCE or not settings.GREEN_API_TOKEN or not settings.GREEN_API_PHONE:
            return
            
        url = f"https://7103.api.greenapi.com/waInstance{settings.GREEN_API_ID_INSTANCE}/sendMessage/{settings.GREEN_API_TOKEN}"
        
        # Build message
        msg_parts = ["Новая заявка с сайта! 🔔\n"]
        msg_parts.append(f"Имя: {lead.name}")
        
        if lead.phone:
            msg_parts.append(f"Телефон: {lead.phone}")
        if lead.event_type:
            msg_parts.append(f"Тип мероприятия: {lead.event_type}")

            
        message_text = "\n".join(msg_parts)
        
        # Phone number must end with @c.us
        chat_id = f"{settings.GREEN_API_PHONE}@c.us"
        
        payload = {
            "chatId": chat_id,
            "message": message_text
        }
        
        headers = {
            'Content-Type': 'application/json'
        }
        
        try:
            requests.post(url, json=payload, headers=headers, timeout=5)
            
            # Send contact card if phone is provided
            if lead.phone:
                contact_url = f"https://7103.api.greenapi.com/waInstance{settings.GREEN_API_ID_INSTANCE}/sendContact/{settings.GREEN_API_TOKEN}"
                contact_payload = {
                    "chatId": chat_id,
                    "contact": {
                        "phoneContact": lead.phone.replace("+", "").replace(" ", "").replace("-", ""),
                        "firstName": lead.name or "Клиент",
                        "lastName": "с сайта"
                    }
                }
                requests.post(contact_url, json=contact_payload, headers=headers, timeout=5)
                
        except Exception as e:
            print(f"Failed to send WhatsApp notification: {e}")

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Thank you! We'll contact you soon."},
            status=status.HTTP_201_CREATED
        )
