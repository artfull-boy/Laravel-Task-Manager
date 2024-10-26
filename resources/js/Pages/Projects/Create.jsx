import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
export default function Create() {
    const { data, setData, post, errors } = useForm({
        image_path: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("project.store"));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create a new Project
                </h2>
            }
        >
            <Head title="Create Project" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                <div>
                                    <label htmlFor="project_name">
                                        Project Name
                                    </label>

                                    <input
                                        id="project_name"
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
                                    <label htmlFor="project_description">
                                        Project Description
                                    </label>

                                    <textarea
                                        id="project_description"
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
                                    <label htmlFor="project_due_date">
                                        Project Deadline
                                    </label>

                                    <input
                                        id="project_due_date"
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
                                    <label htmlFor="project_image_path">
                                        Project Image
                                    </label>
                                    <input
                                        id="project_image_path"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("image_path", e.target.files[0])
                                        }
                                    />

                                    <p className="mt-2 text-red-600">{errors.image_path}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="project_status">
                                        Project Status
                                    </label>

                                    <select
                                        name="status"
                                        id="project_status"
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
                                        {errors.project_status}
                                    </p>
                                </div>
                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("project.index")}
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
