import logging
import requests
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Lead

logger = logging.getLogger(__name__)


@receiver(post_save, sender=Lead)
def send_whatsapp_notification(sender, instance, created, **kwargs):
    """
    Send WhatsApp notification via Green-API when a new Lead is created.
    """
    if not created:
        return

    id_instance = settings.GREEN_API_ID_INSTANCE
    api_token = settings.GREEN_API_TOKEN
    phone = settings.GREEN_API_PHONE

    if not all([id_instance, api_token, phone]):
        logger.warning("Green-API credentials not configured. Skipping WhatsApp notification.")
        return

    url = f"https://api.green-api.com/waInstance{id_instance}/sendMessage/{api_token}"

    message = (
        f"🔔 *Новая заявка!*\n\n"
        f"👤 *Имя:* {instance.name}\n"
        f"📱 *Телефон:* {instance.phone or 'Не указан'}\n"
        f"📧 *Email:* {instance.email or 'Не указан'}\n"
        f"🎉 *Тип мероприятия:* {instance.event_type or 'Не указан'}\n"
        f"💬 *Сообщение:* {instance.message or 'Не указано'}\n\n"
        f"📅 *Дата:* {instance.created_at.strftime('%d.%m.%Y %H:%M')}"
    )

    payload = {
        "chatId": f"{phone}@c.us",
        "message": message
    }

    try:
        response = requests.post(url, json=payload, timeout=10)
        response.raise_for_status()
        logger.info(f"WhatsApp notification sent for Lead ID: {instance.id}")
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to send WhatsApp notification: {e}")
