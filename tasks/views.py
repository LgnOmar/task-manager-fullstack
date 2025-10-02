# Import the necessary modules
# we need 'viewsets' to build our logic hub.
# we also need 'IsAuthenticated' to enforce our security rules

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Task
from .serializers import TaskSerializer

# This is our ViewSet - the main logic controller for Tasks.
# It inherites from ModelViewSet, which provides all the default CRUD actions

class TaskViewSet(viewsets.ModelViewSet):
    """
    An API endpoint that allows users to view or edit their tasks.
    """

    #Connect the translator: This viewset will use the TaskSerializer to convert data ro and from JSON.
    serializer_class = TaskSerializer

    #Set the security rule: Only authenticated [logged-in] users can access this endpoint. no exceptions.
    permission_classes = [IsAuthenticated]

    # This function defines EXACTLY which tasks should be visible
    def get_queryset(self):
        """
        This view should return a list of all the tasks for the currently authenticated user.
        """

        # self.request.user gives us the user object for the person making the request.
        # we filter the Task objects to only include the ones owned by this user.

        return Task.objects.filter(user=self.request.user)

    # this function is called right before a new task is saved.
    def perform_create(self, serializer):
        """
        when creating a new task, automatically assign it to the currently authenticated user.
        """

        # The serializer is about to save the data. we inject the user object into the data before it's saved. this prevents a user from creating a task for someone else.

        serializer.save(user=self.request.user)