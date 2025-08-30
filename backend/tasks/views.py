from rest_framework import viewsets
from django.http import HttpResponse

from .models import TaskBoard
from .serializers import TaskBoardSerializer

# Create your views here.
class TaskBoardView(viewsets.ModelViewSet):
    queryset = TaskBoard.objects.all()
    serializer_class = TaskBoardSerializer

def register_view(request):
    return HttpResponse("User created")