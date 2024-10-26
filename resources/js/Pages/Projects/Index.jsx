import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { useEffect, useState } from "react";
import TableHeading from "@/Components/TableHeading";

export default function Index({
    projects,
    nameQuery,
    statusQuery,
    sortField,
    direction,
    success,
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
        router.get(route("project.index"), queryParams);
    };
    const onPress = (e) => {
        if (e != "Enter") return;
        queryParams["name"] = name;
        router.get(route("project.index"), queryParams);
    };
    const sortColumn = (e) => {
        if (queryParams["sorted"] == e) {
            queryParams["direction"] =
                queryParams["direction"] == "asc" ? "desc" : "asc";
        } else {
            queryParams["sorted"] = e;
            queryParams["direction"] = "desc";
        }
        router.get(route("project.index"), queryParams);
    };
    const handleClick = (project) => {
        router.get(route("project.show", project));
    };
    useEffect(()=> {
        const elm = document.getElementById("success_div")
        setTimeout(()=> {
            elm.style.display = "none"
        },3000)
    },[])
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Projects
                    </h2>
                    <Link
                        href={route("project.create")}
                        className="bg-green-600 p-2 text-sm rounded-lg text-white"
                    >
                        Add Project
                    </Link>
                </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="flex gap-[40px] p-[30px]">
                            <div className="w-[50%] h-[50px] flex flex-col gap-3">
                                <label htmlFor="name" className="text-white">
                                    Name of the project
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    className="bg-black rounded-md text-white"
                                    placeholder="Name of the project"
                                    defaultValue={nameQuery}
                                    onChange={(e) =>
                                        onNameChange(e.target.value)
                                    }
                                    onKeyDown={(e) => onPress(e.key)}
                                ></input>
                            </div>
                            <div className="w-[50%] h-[50px] flex flex-col gap-3">
                                <label htmlFor="name" className="text-white">
                                    Status of the project
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
                        {success && (
                            <div id="success_div" className="bg-green-600 text-white m-[40px] p-[30px]">
                                {success}
                            </div>
                        )}
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
                                        <TableHeading
                                            column={"name"}
                                            sorted={queryParams["sorted"]}
                                            direction={queryParams["direction"]}
                                            sortColumn={sortColumn}
                                        >
                                            Name
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
                                    {projects.data.map((project) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={project.id}
                                        >
                                            <td className="px-3 py-2">
                                                {project.id}
                                            </td>
                                            <td className="px-3 py-2">
                                                <img
                                                    src={project.image_path}
                                                    style={{ width: 60 }}
                                                />
                                            </td>
                                            <th
                                                onClick={() =>
                                                    handleClick(project)
                                                }
                                                className="px-3 cursor-pointer py-2 text-gray-100 text-nowrap hover:underline"
                                            >
                                                {project.name}
                                            </th>
                                            <td className="px-3 py-2">
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
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {project.created_at}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {project.due_date}
                                            </td>
                                            <td className="px-3 py-2">
                                                {project.createdBy.name}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link
                                                    href={route(
                                                        "project.edit",
                                                        project.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteProject(project)
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
                                links={projects.meta.links}
                            ></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
