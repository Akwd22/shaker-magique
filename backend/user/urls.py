from django.urls import path
from .views import CustomUserCreate, BlacklistTokenUpdateView, CurentUserView

app_name = 'user'

urlpatterns = [
    path('userdetail/<str:user_name>', UserDetail.as_view(), name="userdetail"),
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('current/', CurentUserView.as_view(), name="current_user")
]