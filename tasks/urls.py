#'path' and 'include' are for defining URL patterns.
# 'defaultRouter' is the tool that automatically generates our API URLs
from django.URLs import path, include
from rest_framework.routers import defaultRouter

#import the viewset we created
from .views import TaskViewSet


#Create a router object
router = DefaultRouter()

#Register our TaskViewSet with the router.
#'tasks' is the base name for our URL endpoint.
#'TaskViewSet' is the logic controller
#'task' is a base name for the generated URL names
router.register(r'tasks', TaskViewSet, basename='task')

# The API URLs are now determined automatically by the router.
# We just need to include the generated URLs in our url patterns.

urlpatterns = [
    path('', include(router.URLs)),
]