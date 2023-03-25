from django.urls import path
from . import auth_module
from . import service

urlpatterns = [
    path('customer_auth/login', auth_module.customer_login),
    path('customer_auth/signup', auth_module.customer_signup),
    path('provider_auth/signup', auth_module.provider_signup),
    path('create_service', service.create_service),
    path('add_offering', service.add_offering),
    path('remove_offering', service.remove_offering),
    path('search_service', service.search_service),
    path('get_user', auth_module.get_user_info)
]
