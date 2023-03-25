# %%
import firebase_admin
from firebase_admin import credentials, firestore

admin_cred = credentials.Certificate(
    "digital-porichoy-firebase-adminsdk-b7p79-b63edb5cd3.json")
firebase_admin.initialize_app(admin_cred)
print(admin_cred)

# %%
database = firestore.client()
customers_collection = database.collection("customers")

# %%
customers_document1 = customers_collection.document(
    "customer_test").get().to_dict()
print(customers_document1)
# %%
customers_collection.document("maheen01778654757").set(
    {
        "credentials": {
            "email": "maheen01778654757@gmail.com",
            "password": "tfqwceir8623475234cycvdtfucefvq",
            "phone": "01778654757"
        },
        "names": {
            "name": "Maheen Hoque",
            "username": "maheen"
        },
        "service_data": {
            "favorite_provider": "raiyan",
            "favorite_service": "mechanic",
            "used_service_and_provider": {}
        }
    }
)

# %%

# %%
