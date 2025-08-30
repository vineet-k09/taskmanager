from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes, api_view

from django.contrib.auth.models import User
from .models import TaskBoard
from .serializers import TaskBoardSerializer

# Create your views here.
class TaskBoardView(viewsets.ModelViewSet):
    queryset = TaskBoard.objects.all()
    serializer_class = TaskBoardSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Duplicate username"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    user = User.objects.create(username=username,email=email)
    user.set_password(password)
    user.save()
    return Response(
        {"message":"User created"
        #  ,"user":user
         },
        status=status.HTTP_201_CREATED
    )
# class RegisterClassView(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = RegisterSerializer