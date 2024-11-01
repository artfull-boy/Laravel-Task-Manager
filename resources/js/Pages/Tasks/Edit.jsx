import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
export default function Create(dataSent) {
    const { data, setData, post, errors } = useForm({
        image_path: null,
        name: dataSent.dataSent[2].name,
        status: dataSent.dataSent[2].status,
        description: dataSent.dataSent[2].description,
        due_date:  new Date(dataSent.dataSent[2].due_date).toISOString().split('T')[0],
        priority: dataSent.dataSent[2].priority,
        project_id: dataSent.dataSent[2].project_id,
        assigned_user_id: dataSent.dataSent[2].assigned_user_id,
        _method:"PUT"
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("task.update",dataSent.dataSent[2].id));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Update a Task
                </h2>
            }
        >
            <Head title="Update Task" />


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
                                    <img width={150} src={dataSent.dataSent[2].image_path.startsWith("http") ? dataSent.dataSent[2].image_path : "/"+dataSent.dataSent[2].image_path} />
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
                                        value={data.status}
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
                                        value={data.priority}
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
                                        value={data.project_id}
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData("project_id", e.target.value)
                                        }
                                    >
                                        <option value="">Select Project</option>
                                        {dataSent.dataSent[0].data.map((project) => (
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
                                        value={data.assigned_user_id}
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData("assigned_user_id", e.target.value)
                                        }
                                    >
                                        <option value="">Select User</option>
                                        {dataSent.dataSent[1].data.map((user) => (
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
