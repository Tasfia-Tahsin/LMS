from ..firebase_init import *
from django.http import JsonResponse
import hashlib


async def signup(userdata, password, user_type: str):
    """
    Creates a firebase user instance and stores in the firestore database.
    """

    collection = None

    hash_obj = hashlib.new('sha512')
    hash_obj.update(password.encode('utf-8'))
    password = hash_obj.hexdigest()

    userdata["credentials"]["password"] = password

    if user_type == "customer":
        collection = customers_collection
    elif user_type == "provider":
        collection = providers_collection

    user = None

    try:

        user = auth.create_user(
            email_verified=False,
            phone_number=userdata["credentials"]["phone"],
            password=password,
            display_name=userdata["names"]["username"],
            disabled=False)

        collection.document(user.uid).set(userdata)
        print(user.uid)

        return JsonResponse({
            "status": True
        })

    except auth.PhoneNumberAlreadyExistsError:

        if user_type == "customer":
            print("Account already exists")
            return JsonResponse({
                "status": False
            })

        elif user_type == "provider":
            user = None

            user = auth.get_user_by_phone_number(
                userdata["credentials"]["phone"])

            provider_instance = providers_collection.document(user.uid).get()

            if not provider_instance.exists:

                collection.document(user.uid).set(userdata)
                return JsonResponse({
                    "status": True
                })
            else:
                return JsonResponse({
                    "status": False
                })
