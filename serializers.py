# we need 'serializers' from the rest_framework to build our translator.

from rest_framework import serializers

# We also need to import our 'task' model blueprint
from .models import Task



class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id','title','description','completed','created_at']
        