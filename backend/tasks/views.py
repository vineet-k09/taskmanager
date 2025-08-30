from django.http import HttpResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_user_session(request):
    user = request.user
    return Response({
        "id":user.id,
        "username": user.username,
        "email": user.email,
    })



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # add custom claims if you want
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({
            "user": {
                "id": self.user.id,
                "username": self.user.username,
                "email": self.user.email,
            }
        })
        return data  


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        # Let parent view run serializer & generate tokens
        response = super().post(request, *args, **kwargs)
        data = response.data

        access_token = data.get("access")
        refresh_token = data.get("refresh")

        # Set cookies for SSR-friendly auth
        if access_token:
            response.set_cookie(
                key="access",
                value=access_token,
                httponly=True,
                secure=True,       # set False if testing on http://localhost
                samesite="Lax",
                max_age=60 * 5,    # access token expiry (5 minutes here)
            )

        if refresh_token:
            response.set_cookie(
                key="refresh",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="Lax",
                max_age=60 * 60 * 24,  # refresh expiry (1 day here)
            )

        return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    refresh_token = request.data.refresh
    token = RefreshToken(refresh_token)
    token.blacklist()