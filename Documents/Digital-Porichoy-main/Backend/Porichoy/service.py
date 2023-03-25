
"""
services handles all the requests that are related to services. 
"""
import json
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse, Http404, JsonResponse
from .firebase_init import *


async def create_service(request: HttpRequest):

    service_data = json.loads(request.body.decode("utf-8"))

    try:
        user_id = auth.get_user(service_data["credentials"]["provider_id"]).uid

        service_instance = services_collection.document(user_id).get()

        if not service_instance.exists:
            services_collection.document(user_id).set(service_data)

            return HttpResponse('''
            <h1>Your Service Created!</h1>
            ''')
        else:
            return HttpResponse('''
            <h1>Service Already Exists</h1>
            ''')

    except auth.UserNotFoundError:
        return HttpResponse('''
        <h1>Not A valid provider!</h1>
        ''')


async def add_offering(request: HttpRequest):

    request_body = json.loads(request.body.decode("utf-8"))
    service_id = request_body["service_id"]
    new_offering = request_body["new_offering"]

    service_instance = services_collection.document(service_id)
    service_data = service_instance.get()

    if service_data.exists:
        service_instance.update({
            "offerings": firestore.ArrayUnion([new_offering])
        })
        return HttpResponse('''
        <h1>New service offering added!</h1>
        ''')
    else:
        return HttpResponse('''
        <h1>The service does not exist!</h1>
        ''')


async def remove_offering(request: HttpRequest):

    request_body = json.loads(request.body.decode("utf-8"))
    service_id = request_body["service_id"]
    deleted_offering = request_body["deleted_offering"]

    service_instance = services_collection.document(service_id)
    service_data = service_instance.get()

    if service_data.exists:
        service_instance.update({
            "offerings": firestore.ArrayRemove([deleted_offering])
        })
        return HttpResponse('''
        <h1>Service offering deleted!</h1>
        ''')
    else:
        return HttpResponse('''
        <h1>The service does not exist!</h1>
        ''')


async def search_service(request: HttpRequest):

    """
    Searches for a service based on category and location. 
    """

    request_params = request.GET
    district = request_params["district"].lower()
    category = request_params["category"].lower()
    customer_long = float(request_params["long"])
    customer_lat = float(request_params["lat"])
    distance = float(request_params["distance"])
    search_limit = int(request_params["search_limit"])

    # Setting max search limit and max distance limit.
    if search_limit > 1000:
        search_limit = 1000

    if distance > 50:
        distance = 50

    query = services_collection.where(
        "location.district", "==", district).where("credentials.category", "==", category).limit(search_limit).stream()

    result = [x.to_dict() for x in query]

    # Only taking the instances who's distance is less than or equal to the specified distance
    result = [x for x in result if (((x["location"]["long"] - customer_long)**2 +
                                     (x["location"]["lat"] - customer_lat)**2)**0.5)*111 <= distance]

    result.sort(key=lambda x: (
        (((x["location"]["long"] - customer_long)**2 +
         (x["location"]["lat"] - customer_lat)**2)**0.5)
    ))

    response_data = {
        "result": result
    }

    return JsonResponse(response_data)
