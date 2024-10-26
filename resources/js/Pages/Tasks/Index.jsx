import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { useState } from "react";
import TableHeading from "@/Components/TableHeading";

export default function Index({
    tasks,
    nameQuery,
    statusQuery,
    sortField,
    direction,
}) {
    const queryParams = {};
    if (statusQuery) {
        queryParams["status"] = statusQuery;
    }
    if (nameQuery) {
        queryParams["name"] = nameQuery;
    }
    queryParams["sorted"] = sortField;
    queryParams["direction"] = direction;
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const onNameChange = (e) => {
        setName(e);
    };
    const onStatusChange = (e) => {
        setStatus(e);
        queryParams["status"] = e;
        router.get(route("task.index"), queryParams);
    };
    const onPress = (e) => {
        if (e != "Enter") return;
        queryParams["name"] = name;
        router.get(route("task.index"), queryParams);
    };
    const sortColumn = (e) => {
        if (queryParams["sorted"] == e) {
            queryParams["direction"] =
                queryParams["direction"] == "asc" ? "desc" : "asc";
        } else {
            queryParams["sorted"] = e;
            queryParams["direction"] = "desc";
        }
        router.get(route("task.index"), queryParams);
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    tasks
                </h2>
            }
        >
            <Head title="tasks" />

            <div className="py-12">
                <div className="mx-auto  sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="flex gap-[40px] p-[30px]">
                            <div className="w-[50%] h-[50px] flex flex-col gap-3">
                                <label htmlFor="name" className="text-white">
                                    Name of the task
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    className="bg-black rounded-md text-white"
                                    placeholder="Name of the task"
                                    defaultValue={nameQuery}
                                    onChange={(e) =>
                                        onNameChange(e.target.value)
                                    }
                                    onKeyDown={(e) => onPress(e.key)}
                                ></input>
                            </div>
                            <div className="w-[50%] h-[50px] flex flex-col gap-3">
                                <label htmlFor="name" className="text-white">
                                    Status of the task
                                </label>
                                <select
                                    name="name"
                                    defaultValue={statusQuery}
                                    className="bg-black rounded-md text-white"
                                    onChange={(e) =>
                                        onStatusChange(e.target.value)
                                    }
                                >
                                    <option value={""}>Select Status</option>
                                    <option value={"pending"}>Pending</option>
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
                                            sorted={queryParams["sorted"]}
                                            direction={queryParams["direction"]}
                                            sortColumn={sortColumn}
                                        >
                                            ID
                                        </TableHeading>
                                        <th className="px-3 py-3">Image</th>
                                        <th className="px-3 py-3">Project Name</th>
                                        <TableHeading
                                            column={"name"}
                                            sorted={queryParams["sorted"]}
                                            direction={queryParams["direction"]}
                                            sortColumn={sortColumn}
                                        >
                                            Task Name
                                        </TableHeading>
                                        <TableHeading
                                            column={"status"}
                                            sorted={queryParams["sorted"]}
                                            direction={queryParams["direction"]}
                                            sortColumn={sortColumn}
                                        >
                                            Status
                                        </TableHeading>
                                        <TableHeading
                                            column={"created_at"}
                                            sorted={queryParams["sorted"]}
                                            direction={queryParams["direction"]}
                                            sortColumn={sortColumn}
                                        >
                                            Created Date
                                        </TableHeading>
                                        <TableHeading
                                            column={"due_date"}
                                            sorted={queryParams["sorted"]}
                                            direction={queryParams["direction"]}
                                            sortColumn={sortColumn}
                                        >
                                            Due Date
                                        </TableHeading>
                                        <th className="px-3 py-3">
                                            Created By
                                        </th>
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
                                            <td className="px-3 py-2">
                                                {task.project.name}
                                            </td>
                                            <th className="px-3 py-2 text-gray-100 text-nowrap hover:underline">
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
                                            <td className="px-3 py-2 text-nowrap">
                                                {task.created_at}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {task.due_date}
                                            </td>
                                            <td className="px-3 py-2">
                                                {task.createdBy.name}
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
                            <Pagination
                                links={tasks.meta.links}
                            ></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
