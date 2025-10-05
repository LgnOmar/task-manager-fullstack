from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        #we only want to deal with these three fields for registration
        fields = ['id','username','password']

        # make the password write-only for security
        extra_kwargs = {'password':{'write_only': True}}

    def create(self, validated_data):
        #this method is called when we save the serializer.
        #we use create_user to ensure the password is properly hashed
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user