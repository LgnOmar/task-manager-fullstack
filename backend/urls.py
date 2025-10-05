from django.contrib import admin
from django.urls import path, include

#import the specific views from the simplejwl library for getting tokens.
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# this is the main URL configuration for the whole project
urlpatterns = [
    # this is the default Django admin site URL, we can leave it.
    path('admin/', admin.site.urls),


    # AUTHENTICATION URLS
    # When a user POSTs to '/api/token/', it will be handled by TokenObtainPairView
    # which will return an access and refresh token pair upon successful login.
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

    # when a user POSTSs to '/api/token/refresh/', it will be handled by TokenRefreshView which returns a new access token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # --- our user management URLs ---
    #any requests to /api/users/... will be handled by the users app
    path('api/users/', include('users.urls')),
    
    # APP URLS
    #This line is the main switchboard operator
    # it says "any URL that starts with 'api/' should be forwarded to the urls.py file inside the 'tasks' app for further instructions"
    path('api/', include('tasks.urls')),
]


