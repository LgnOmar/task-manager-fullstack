from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()

    #the serializerswe just created
    serializer_class = UserSerializer

    #the key to making this public:
    permission_classes = [AllowAny]