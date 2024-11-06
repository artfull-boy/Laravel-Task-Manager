import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants";
import TableHeading from "@/Components/TableHeading";

export default function Dashboard({
    tasks,
    user,
    allPendingTasks,
    myPendingTasks,
    allCompletedTasks,
    myCompletedTasks,
    allInProgressTasks,
    myProgressTasks,
    totalTasks,
}) {
    const handleTask = (task) => {
        router.get(route("task.show", task));
    };
    const deleteProject = (e) => {
        router.delete(route("task.destroy", e));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Welcome {user.name}!
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 flex flex-col gap-6 w-full">

                <div className="w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Total Tasks:{" "}
                            <span className="text-[25px] font-bold">
                                {totalTasks}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 sm:px-6 lg:px-8 gap-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-[30px] font-bold text-orange-500 flex flex-col">
                            Pending Tasks
                            <div className="flex gap-3 justify-end text-white text-[20px] font-medium">
                                <span>{myPendingTasks}</span> /{" "}
                                <span>{allPendingTasks}</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-[30px] font-bold text-green-500 flex flex-col">
                            Completed Tasks
                            <div className="flex gap-3 justify-end text-white text-[20px] font-medium">
                                <span>{myCompletedTasks}</span> /{" "}
                                <span>{allCompletedTasks}</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-[30px] font-bold text-purple-500 flex flex-col">
                            In Progress Tasks
                            <div className="flex gap-3 justify-end text-white text-[20px] font-medium">
                                <span>{myProgressTasks}</span> /{" "}
                                <span>{allInProgressTasks}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:px-6 lg:px-8">

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="flex justify-between items-center text-gray-900 dark:text-gray-100 px-6 py-3">
                        <p className="text-[30px] font-bold">My Assigned Tasks:</p>
                        <Link className="hover:underline " href={route("task.my_tasks")}>See All</Link>
                    </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">Image</th>
                                        <th className="px-3 py-3">
                                            Project Name
                                        </th>
                                        <th className="px-3 py-3">Task Name</th>
                                        <th className="px-3 py-3">Status</th>
                                        <th className="px-3 py-3">Priority</th>
                                        <th className="px-3 py-3">
                                            Created Date
                                        </th>
                                        <th className="px-3 py-3">Due Date</th>

                                        <th className="px-3 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={task.id}
                                        >
                                            <td className="px-3 py-2">
                                                {task.id}
                                            </td>
                                            <td className="px-3 py-2">
                                                <img
                                                    src={task.image_path}
                                                    style={{ width: 60 }}
                                                />
                                            </td>
                                            <td
                                                className="px-3 py-2 text-gray-100 text-nowrap hover:underline cursor-pointer"
                                                onClick={() =>
                                                    handleClick(task.project)
                                                }
                                            >
                                                {task.project.name}
                                            </td>
                                            <th
                                                onClick={() => handleTask(task)}
                                                className="px-3 py-2 text-gray-100 text-nowrap cursor-pointer hover:underline"
                                            >
                                                {task.name}
                                            </th>
                                            <td className="px-3 py-2">
                                                <span
                                                    className={
                                                        "px-2 py-1 rounded text-white " +
                                                        TASK_STATUS_CLASS_MAP[
                                                            task.status
                                                        ]
                                                    }
                                                >
                                                    {
                                                        TASK_STATUS_TEXT_MAP[
                                                            task.status
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span
                                                    className={
                                                        "px-2 py-1 rounded text-white " +
                                                        TASK_PRIORITY_CLASS_MAP[
                                                            task.priority
                                                        ]
                                                    }
                                                >
                                                    {
                                                        TASK_PRIORITY_TEXT_MAP[
                                                            task.priority
                                                        ]
                                                    }
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {task.created_at}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {task.due_date}
                                            </td>

                                            <td className="px-3 py-2 text-nowrap">
                                                <Link
                                                    href={route(
                                                        "task.edit",
                                                        task.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteProject(task)
                                                    }
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
