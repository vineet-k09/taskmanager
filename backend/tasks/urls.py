from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from rest_framework_simplejwt import 
from .views import TaskBoardView, register_view

router = DefaultRouter()
router.register('tasks',TaskBoardView)

urlpatterns = [
    path('',include(router.urls)),
    path('register/',register_view)
]