from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskBoardView, register_view, get_user_session,logout_view, CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register('tasks', TaskBoardView)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_view),
    path('logout/', logout_view),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/',get_user_session, name='user_session')
]