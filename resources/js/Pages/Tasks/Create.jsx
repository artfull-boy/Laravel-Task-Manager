import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
export default function Create({projects, users}) {
    const { data, setData, post, errors } = useForm({
        image_path: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
        priority: "",
        project_id: "",
        assigned_user_id: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("task.store"));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create a new Task
                </h2>
            }
        >
            <Head title="Create Task" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                <div>
                                    <label htmlFor="task_name">
                                        Task Name
                                    </label>

                                    <input
                                        id="task_name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full text-black"
                                        isFocused={true}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />

                                    <p className="mt-2 text-red-600">{errors.name}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="task_description">
                                        Task Description
                                    </label>

                                    <textarea
                                        id="task_description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <p className="mt-2 text-red-600">{errors.description}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="task_due_date">
                                        Task Deadline
                                    </label>

                                    <input
                                        id="task_due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                    />

                                    <p className="mt-2 text-red-600">{errors.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="task_image_path">
                                        Task Image
                                    </label>
                                    <input
                                        id="task_image_path"
                                        type="file"
                                        name="image_path"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("image_path", e.target.files[0])
                                        }
                                    />

                                    <p className="mt-2 text-red-600">{errors.image_path}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="task_status">
                                        Task Status
                                    </label>

                                    <select
                                        name="status"
                                        id="task_status"
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </select>

                                    <p className="mt-2 text-red-600">
                                        {errors.task_status}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="task_priority">
                                        Task Priority
                                    </label>

                                    <select
                                        name="status"
                                        id="task_priority"
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">
                                            Medium
                                        </option>
                                        <option value="high">
                                            High
                                        </option>
                                    </select>

                                    <p className="mt-2 text-red-600">
                                        {errors.priority}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="task_project">
                                        Task Project
                                    </label>

                                    <select
                                        name="project"
                                        id="task_project"
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData("project_id", e.target.value)
                                        }
                                    >
                                        <option value="">Select Project</option>
                                        {projects.data.map((project) => (
                                            <option value={project.id}>{project.name}</option>
                                        ))}
                                    </select>

                                    <p className="mt-2 text-red-600">
                                        {errors.project_id}
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="user_project">
                                        Assigned To
                                    </label>

                                    <select
                                        name="project"
                                        id="user_project"
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData("assigned_user_id", e.target.value)
                                        }
                                    >
                                        <option value="">Select User</option>
                                        {users.data.map((user) => (
                                            <option value={user.id}>{user.name}</option>
                                        ))}
                                    </select>

                                    <p className="mt-2 text-red-600">
                                        {errors.assigned_user_id}
                                    </p>
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("task.index")}
                                        className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                                    >
                                        Cancel
                                    </Link>
                                    <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
