To utilize process variables
```bash
pip install python-decouple
```

Database in backend/backend/settings.py
```python
DATABASES = {
    'default':{
        'ENGINE':"django.db.backends.mysql",
        'NAME':'',
        'HOST':'',
        'USER':'',
        'PASSWORD':'',
        'PORT':'3306',
    }
}
```

Install REST framework to use serilizers

### Classic serializer
```py
class TaskBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskBoard
        fields = "__all__"
```

### Classic Model for the above serializer
```py
class TaskBoard(models.Model):
    username = models.CharField(max_length=40)
    task_name = models.CharField(max_length=100)
    task_description = models.TextField()
```

### Classic view example
```py
class TaskBoardView(viewsets.ModelViewSet):
    queryset = TaskBoard.objects.all()
    serializer_class = TaskBoardSerializer
```

### Auth password hashing using django.contrib.auth.models.User
```py
def create(self, validated_data):
        password = validated_data['password'].pop()
        user = User.objects.create(**validated_data)

        if password is not None:
            user.set_password(password)
            user.save()
```

To start with the frontend to backend communication first install cors in django
```bash
pip install django-cors-headers
```

