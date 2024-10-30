import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
export default function Create() {
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("user.store"));
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create a new User
                </h2>
            }
        >
            <Head title="Create User" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100 overflow-auto">
                            <form
                                onSubmit={onSubmit}
                                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                            >
                                <div>
                                    <label htmlFor="user_name">
                                        User Name
                                    </label>

                                    <input
                                        id="user_name"
                                        type="text"
                                        name="name"
                                        placeholder="Enter user name"
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
                                    <label htmlFor="user_email">
                                        User Email
                                    </label>

                                    <input
                                        id="user_email"
                                        name="email"
                                        placeholder="Enter a valid Email"
                                        value={data.email}
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <p className="mt-2 text-red-600">{errors.email}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="user_password">
                                        User Password
                                    </label>

                                    <input
                                        id="user_password"
                                        type="password"
                                        name="password"
                                        placeholder="*********"
                                        value={data.password}
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />

                                    <p className="mt-2 text-red-600">{errors.password}</p>
                                </div>
                                <div className="mt-4">
                                    <label htmlFor="password_confirmation">
                                        Confirm Password
                                    </label>

                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        placeholder="*********"

                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full text-black"
                                        onChange={(e) =>
                                            setData("password_confirmation", e.target.value)
                                        }
                                    />

                                    <p className="mt-2 text-red-600">{errors.password_confirmation}</p>
                                </div>

                                <div className="mt-4 text-right">
                                    <Link
                                        href={route("user.index")}
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
