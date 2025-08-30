import 'axios'
import axios from 'axios';
import Tasks from './components/tasks';

// const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/`
const baseUrl = "http://localhost:8000/api/tasks/"

export type Task = {
  id: number
  username: string
  task_name: string
  task_description: string
}

// export default async function Home({tasks}:{tasks: Task[]}) {
export default async function Home() {
  const res = await axios.get<Task[]>(baseUrl, { withCredentials: true })
  const tasks: Task[] = res.data

  return (
    <div className="min-h-screen sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Tasks tasks={tasks} />
    </div>
  );
}
// export async function getStaticProps() {
//   const res = await axios.get<Task[]>(baseUrl, { withCredentials: true })
//   const tasks = res.data
//   // gets the static props from server by sending a request for a response of the type Task and saves that into tasks
//   // later the tasks are passed as props tot the main component
//   return {
//     props: { tasks },
//     revalidate: 60,
//   }
// }