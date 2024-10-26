import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import Pagination from "@/Components/Pagination";
import { useState } from "react";
import TableHeading from "@/Components/TableHeading";
export default function Show({ project, queryParams, tasks }) {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const onNameChange = (e) => {
        setName(e);
    };
    const onStatusChange = (e) => {
        setStatus(e);
        queryParams["status"] = e;
        router.get(route("project.show"), queryParams);
    };
    const onPress = (e) => {
        if (e != "Enter") return;
        queryParams["name"] = name;
        router.get(route("project.show"), queryParams);
    };
    const sortColumn = (e) => {
        if (queryParams["sorted"] == e) {
            queryParams["direction"] =
                queryParams["direction"] == "asc" ? "desc" : "asc";
        } else {
            queryParams["sorted"] = e;
            queryParams["direction"] = "desc";
        }
        router.get(route("project.show"), queryParams);
    };
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                        {`Project "${project.name}"`}
                    </h2>
                    {/* <Link
            href={route("project.edit", project.id)}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Edit
          </Link> */}
                </div>
            }
        >
            <Head title={`Project "${project.name}"`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={"/" + project.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Project ID
                                        </label>
                                        <p className="mt-1">{project.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Name
                                        </label>
                                        <p className="mt-1">{project.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={
                                                    "px-2 py-1 rounded text-white " +
                                                    PROJECT_STATUS_CLASS_MAP[
                                                        project.status
                                                    ]
                                                }
                                            >
                                                {
                                                    PROJECT_STATUS_TEXT_MAP[
                                                        project.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Created By
                                        </label>
                                        <p className="mt-1">
                                            {project.createdBy.name}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Due Date
                                        </label>
                                        <p className="mt-1">
                                            {project.due_date}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Create Date
                                        </label>
                                        <p className="mt-1">
                                            {project.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Updated By
                                        </label>
                                        <p className="mt-1">
                                            {project.updatedBy.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="font-bold text-lg">
                                    Project Description
                                </label>
                                <p className="mt-1">{project.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pb-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            {tasks.data.length>0 ? (
                                <>
                                    <div className="flex gap-[40px] p-[30px]">
                                        <div className="w-[50%] h-[50px] flex flex-col gap-3">
                                            <label
                                                htmlFor="name"
                                                className="text-white"
                                            >
                                                Name of the task
                                            </label>
                                            <input
                                                name="name"
                                                type="text"
                                                className="bg-black rounded-md text-white"
                                                placeholder="Name of the task"
                                                defaultValue={
                                                    queryParams["name"]
                                                }
                                                onChange={(e) =>
                                                    onNameChange(e.target.value)
                                                }
                                                onKeyDown={(e) =>
                                                    onPress(e.key)
                                                }
                                            ></input>
                                        </div>
                                        <div className="w-[50%] h-[50px] flex flex-col gap-3">
                                            <label
                                                htmlFor="name"
                                                className="text-white"
                                            >
                                                Status of the task
                                            </label>
                                            <select
                                                name="name"
                                                defaultValue={
                                                    queryParams["status"]
                                                }
                                                className="bg-black rounded-md text-white"
                                                onChange={(e) =>
                                                    onStatusChange(
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value={""}>
                                                    Select Status
                                                </option>
                                                <option value={"pending"}>
                                                    Pending
                                                </option>
                                                <option value={"in_progress"}>
                                                    In Progress
                                                </option>
                                                <option value={"completed"}>
                                                    Completed
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                                <tr className="text-nowrap">
                                                    <TableHeading
                                                        column={"id"}
                                                        sorted={
                                                            queryParams[
                                                                "sorted"
                                                            ]
                                                        }
                                                        direction={
                                                            queryParams[
                                                                "direction"
                                                            ]
                                                        }
                                                        sortColumn={sortColumn}
                                                    >
                                                        ID
                                                    </TableHeading>
                                                    <th className="px-3 py-3">
                                                        Image
                                                    </th>
                                                    <TableHeading
                                                        column={"name"}
                                                        sorted={
                                                            queryParams[
                                                                "sorted"
                                                            ]
                                                        }
                                                        direction={
                                                            queryParams[
                                                                "direction"
                                                            ]
                                                        }
                                                        sortColumn={sortColumn}
                                                    >
                                                        Name
                                                    </TableHeading>
                                                    <TableHeading
                                                        column={"status"}
                                                        sorted={
                                                            queryParams[
                                                                "sorted"
                                                            ]
                                                        }
                                                        direction={
                                                            queryParams[
                                                                "direction"
                                                            ]
                                                        }
                                                        sortColumn={sortColumn}
                                                    >
                                                        Status
                                                    </TableHeading>
                                                    <TableHeading
                                                        column={"created_at"}
                                                        sorted={
                                                            queryParams[
                                                                "sorted"
                                                            ]
                                                        }
                                                        direction={
                                                            queryParams[
                                                                "direction"
                                                            ]
                                                        }
                                                        sortColumn={sortColumn}
                                                    >
                                                        Created Date
                                                    </TableHeading>
                                                    <TableHeading
                                                        column={"due_date"}
                                                        sorted={
                                                            queryParams[
                                                                "sorted"
                                                            ]
                                                        }
                                                        direction={
                                                            queryParams[
                                                                "direction"
                                                            ]
                                                        }
                                                        sortColumn={sortColumn}
                                                    >
                                                        Due Date
                                                    </TableHeading>
                                                    <th className="px-3 py-3">
                                                        Created By
                                                    </th>
                                                    <th className="px-3 py-3">
                                                        Assigned To
                                                    </th>
                                                    <th className="px-3 py-3">
                                                        Actions
                                                    </th>
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
                                                                src={
                                                                    task.image_path
                                                                }
                                                                style={{
                                                                    width: 60,
                                                                }}
                                                            />
                                                        </td>
                                                        <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
                                                            {task.name}
                                                        </th>
                                                        <td className="px-3 py-2">
                                                            <span
                                                                className={
                                                                    "px-2 py-1 rounded text-white " +
                                                                    TASK_STATUS_CLASS_MAP[
                                                                        task
                                                                            .status
                                                                    ]
                                                                }
                                                            >
                                                                {
                                                                    TASK_STATUS_TEXT_MAP[
                                                                        task
                                                                            .status
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
                                                        <td className="px-3 py-2">
                                                            {
                                                                task.createdBy
                                                                    .name
                                                            }
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
                                                                    deleteProject(
                                                                        task
                                                                    )
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
                                        <Pagination
                                            links={tasks.meta.links}
                                        ></Pagination>
                                    </div>
                                </>
                            ) : (
                                <p className="p-[40px] text-center text-white">No Tasks in this project</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
