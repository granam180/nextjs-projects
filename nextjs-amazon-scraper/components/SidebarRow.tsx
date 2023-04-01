'use client';

import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { DocumentData } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "react-spinkit";

type Props = {
    doc: DocumentData;
};

function SidebarRow({ doc }: Props) {
    const router = useRouter();
    const [active, setActive] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname) return;
        setActive(pathname.includes(doc.id));
    }, [pathname, doc]); // if you are using the variable `doc` you must include in the depenency array

  return (
    <li
        onClick={() => router.push(`/search/${doc.id}`)} // clicking on a list element will send to selected url
        // using JSX to use `active state` for sidebar row elements
        className={`flex flex-col md:flex-row gap-2 justify-between p-4 cursor-pointer hover:bg-white hover:shadow-md rounded-lg ${
            active && "bg-white shadow-md"
        }`}
    >
        <div className=" flex flex-col justify-center">
            <p className="text-xs md:text-base font-bold">{doc.data().search}
            </p>
            {doc.data().status === "pending" && (
                <p className="text-xs">Scrapies...</p>
            )}
        </div>

        <span className="-order-2 md:order-1">
            {doc.data().status === "pending" ? (
                <Spinner name="wordpress" fadeIn="none" color="indigo" />
            ) : (
                <CheckCircleIcon className="h6 w-6 text-green-500" />
            )}
        </span>
    </li>
  );
}

export default SidebarRow