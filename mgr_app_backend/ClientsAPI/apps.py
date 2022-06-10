from django.apps import AppConfig


class ClientsapiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ClientsAPI'

    # To use django signals
    def ready(self):
        import ClientsAPI.signals
