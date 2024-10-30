import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import { useEffect, useState } from "react";
import TableHeading from "@/Components/TableHeading";

export default function Index({
    users,
    nameQuery,
    emailQuery,
    sortField,
    direction,
    success,
}) {
    const queryParams = {};
    if (emailQuery) {
        queryParams["email"] = emailQuery;
    }
    if (nameQuery) {
        queryParams["name"] = nameQuery;
    }
    queryParams["sorted"] = sortField;
    queryParams["direction"] = direction;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const onNameChange = (e) => {
        setName(e);
    };
    const onEmailChange = (e) => {
        setEmail(e);
    };
    const onPress = (e) => {
        if (e != "Enter") return;
        queryParams["name"] = name;
        queryParams["email"] = email;
        router.get(route("user.index"), queryParams);
    };
    const sortColumn = (e) => {
        if (queryParams["sorted"] == e) {
            queryParams["direction"] =
                queryParams["direction"] == "asc" ? "desc" : "asc";
        } else {
            queryParams["sorted"] = e;
            queryParams["direction"] = "desc";
        }
        router.get(route("user.index"), queryParams);
    };

    const deleteUser = (user) => {
        router.delete(route("user.destroy",user))
    }
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
                        Users
                    </h2>
                    <Link
                        href={route("user.create")}
                        className="bg-green-600 p-2 text-sm rounded-lg text-white"
                    >
                        Add User
                    </Link>
                </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="flex gap-[40px] p-[30px]">
                            <div className="w-[50%] h-[50px] flex flex-col gap-3">
                                <label htmlFor="name" className="text-white">
                                    Name of the user
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    className="bg-black rounded-md text-white"
                                    placeholder="Name of the user"
                                    defaultValue={nameQuery}
                                    onChange={(e) =>
                                        onNameChange(e.target.value)
                                    }
                                    onKeyDown={(e) => onPress(e.key)}
                                ></input>
                            </div>
                            <div className="w-[50%] h-[50px] flex flex-col gap-3">
                                <label htmlFor="email" className="text-white">
                                    Email of the user
                                </label>
                                <input
                                    name="email"
                                    type="text"
                                    className="bg-black rounded-md text-white"
                                    placeholder="Email of the user"
                                    defaultValue={emailQuery}
                                    onChange={(e) =>
                                        onEmailChange(e.target.value)
                                    }
                                    onKeyDown={(e) => onPress(e.key)}
                                ></input>
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
                                        <TableHeading
                                            column={"name"}
                                            sorted={queryParams["sorted"]}
                                            direction={queryParams["direction"]}
                                            sortColumn={sortColumn}
                                        >
                                            Name
                                        </TableHeading>
                                        <TableHeading
                                            column={"email"}
                                            sorted={queryParams["sorted"]}
                                            direction={queryParams["direction"]}
                                            sortColumn={sortColumn}
                                        >
                                            Email
                                        </TableHeading>
                                        <TableHeading
                                            column={"created_at"}
                                            sorted={queryParams["sorted"]}
                                            direction={queryParams["direction"]}
                                            sortColumn={sortColumn}
                                        >
                                            Created Date
                                        </TableHeading>

                                        <th className="px-3 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            key={user.id}
                                        >
                                            <td className="px-3 py-2">
                                                {user.id}
                                            </td>

                                            <th

                                                className="px-3 py-2 text-gray-100 text-nowrap "
                                            >
                                                {user.name}
                                            </th>
                                            <td className="px-3 py-2">
                                               {user.email}
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {user.created_at}
                                            </td>

                                            <td className="px-3 py-2 text-nowrap">
                                                <Link
                                                    href={route(
                                                        "user.edit",
                                                        user.id
                                                    )}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) =>
                                                        deleteUser(user)
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
                                links={users.meta.links}
                            ></Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
