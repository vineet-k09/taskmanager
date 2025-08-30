// components/tasks.tsx 
// this component supports server side rendering, by fetching data from the server and passing that as props to the components.
import Link from "next/link";
import { Task } from "../page";
interface TasksProps {
    tasks: Task[];
}

export default function Tasks({ tasks }: TasksProps) {
    return (
        <div className='columns-2 sm:columns-3'>
            {tasks &&
                tasks.map((t) => {
                    return <div key={t.id} className='border-white border-1 rounded-md break-inside-avoid p-2 mb-4'>
                        <h2>{t.task_name}</h2>
                        <em>{t.username}</em>
                        <p>{t.task_description}</p>
                        <Link href={`/task/${t.id}`}>
                            <button className="p-2 mt-1 bg-emerald-900 hover:bg-emerald-800 rounded-md">{t.task_name}</button>
                        </Link>
                    </div>
                })
            }
        </div>
    )
}