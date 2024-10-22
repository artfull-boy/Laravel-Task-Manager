import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
export default function TableHeading({children , column, sorted, direction, sortColumn}) {
    return (
        <th onClick={() => sortColumn(column)}>
            <div className="flex items-center justify-between px-3 py-3 cursor-pointer">
                {children}
                <div className="flex flex-col justify-center">
                    <ChevronUpIcon
                        className={
                            "w-4 " +
                            (sorted == column &&
                            direction == "asc"
                                ? "text-white"
                                : "")
                        }
                    />
                    <ChevronDownIcon
                        className={
                            "w-4 " +
                            (sorted == column &&
                            direction == "desc"
                                ? "text-white"
                                : "")
                        }
                    />
                </div>
            </div>
        </th>
    );
}
