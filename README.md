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

### App router vs Pages router
**Pages Router**
- Routes using ```pages/about.js```, ```pages/login.js```
- Lets u use getServerSideProps, getStaticProps, getStaticPaths
- app/ doesnt't exist

**App Router**
- Nested routes in ```app/``` folder. ```app/about/page.js```, ```app/login/page.js```
- By default server component, 'use client' for client components
- getServerSideProps replaced by fetch with ```{cache: 'no-store'}``` or generateStaticParams
- React 18 streaming + suspense
- Server actions to mutate server state without API routes

### App router
Since we are using app router
- ```app/task/[id]/page.tsx``` could render task based on the task id. ```(useParams())```

**```page.tsx```** could be made async component and fetch the server side props and pass them in the following manner:

```ts
//app/page.tsx
export default async function Home() {
  const res = await axios.get<Task[]>(baseUrl, { withCredentials: true })
  const tasks: Task[] = res.data

  return (
    <div className="min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Tasks tasks={tasks} />
    </div>
  );
}
```
and then in 
```ts
// app/components/tasks.tsx
interface TasksProps {
    tasks: Task[];
}
export default function Tasks({ tasks }: TasksProps) {
    return (
        <div className='columns-2 sm:columns-3'>
            {tasks &&
                tasks.map((t) => {
                    return <div key={t.id}>
                        <h2>{t.task_name}</h2>
                        <em>{t.username}</em>
                        <p>{t.task_description}</p>
                        <Link href={`/task/${t.id}`}>
                            <button>{t.task_name}</button>
                        </Link>
                    </div>
                })
            }
        </div>
    )
}
```
while the type **Task** will be:
```ts
type Task = {
  id: number
  username: string
  task_name: string
  task_description: string
}
```
### User registration
In django ```from django.contrib.auth.models import User``` model can be used to make a SQL model
```py
@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username, email, password = request.data.get('username'), request.data.get('email'), request.data.get('password')
    
    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Duplicate username"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    user = User.objects.create(username=username,email=email)
    user.set_password(password)
    user.save()
    return Response(
        {"message":"User created"},
        status=status.HTTP_201_CREATED
    )
```