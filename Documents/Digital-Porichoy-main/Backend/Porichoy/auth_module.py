
"""
auth handles all the requests that are related to authentication. 
"""
import json
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, Http404, JsonResponse
from .AuthHandler.signup_handler import signup
from .firebase_init import *
import hashlib


async def get_user_info(request: HttpRequest):
    request_body = json.loads(request.body.decode("utf-8"))
    verified_obj = auth.verify_id_token(request_body["token"])
    current_user_id = verified_obj["uid"]
    # print("here is my obj", verified_obj["uid"])

    # Search in both customer and provider collection, as the user may be anyone
    current_customer_data = customers_collection.document(
        current_user_id).get()
    current_provider_data = providers_collection.document(
        current_user_id).get()

    if current_customer_data.exists:
        return JsonResponse(current_customer_data.to_dict())
    elif current_provider_data.exists:
        return JsonResponse(current_provider_data.to_dict())


async def customer_login(request: HttpRequest):

    request_body = json.loads(request.body.decode("utf-8"))

    phone = request_body["phone"]
    password = request_body["password"]

    hash_obj = hashlib.new('sha512')
    hash_obj.update(password.encode('utf-8'))
    password = hash_obj.hexdigest()

    query = customers_collection.where("credentials.phone", "==", phone).where(
        "credentials.password", "==", password).limit(1).stream()

    customer = [x.to_dict() for x in query]

    if customer:
        user_id = auth.get_user_by_phone_number(phone).uid

        user_id_token = auth.create_custom_token(user_id).decode('utf-8')

        return JsonResponse({
            "userId": user_id_token,
            "role": "customer"
        })
    else:
        return JsonResponse({
            "userId": None
        })


async def customer_signup(request: HttpRequest):

    request_body = json.loads(request.body.decode("utf-8"))
    return await signup(request_body["userdata"], request_body["password"], "customer")


async def provider_signup(request: HttpRequest):

    request_body = json.loads(request.body.decode("utf-8"))
    return await signup(request_body["userdata"], request_body["password"], "provider")
