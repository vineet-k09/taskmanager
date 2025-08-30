from rest_framework import serializers

from django.contrib.auth.models import User
from .models import TaskBoard

class TaskBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskBoard
        fields = "__all__"

# class RegisterSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username','email','password']

#     def create(self, validated_data):
#         password = validated_data.pop('password')
#         user = User.objects.create(**validated_data)

#         if password is not None:
#             user.set_password(password)
#             user.save()
#         return user