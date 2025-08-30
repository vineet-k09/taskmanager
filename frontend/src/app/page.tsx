import CreateTask from './components/createTask';
import Tasks from './components/tasks';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`

export type Task = {
  id: number
  username: string
  task_name: string
  task_description: string
}
// const isAuthenticated = !!localStorage.getItem('access_token') => gives True/False
export default async function Home() {
  const res = await fetch(baseUrl, {
    cache: "force-cache",
    next: {revalidate: 7060},
    credentials: "include",
  })
  // const res = await axios.get<Task[]>(baseUrl, { withCredentials: true })
  const tasks: Task[] = await res.json()

  return (
    <div className="sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section id='tasks'>
        <Tasks tasks={tasks} />
        <CreateTask />
      </section>
    </div>
  );
}