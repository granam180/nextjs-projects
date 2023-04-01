"use client";

import { db } from "@/firebase";
// import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import SidebarRow from "./SidebarRow";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo.png";

function Sidebar() {
  const [snapshot, loading, error] = useCollection(
    query(collection(db, "searches"), orderBy("start_eta", "desc"))
  );

  return (
    // overflow-y-auto, `auto` so it doesn't show when it needs to
    <div className="p-2 md:p-10 py-10 overflow-y-auto border-b border-indigo-500/50">
      <div className="flex flex-col items-center justify-center mb-10">
        {/* <DocumentMagnifyingGlassIcon className="h-16 md:w-16 text-indigo-600" /> */}

        <Link
          href="https://joeybonneville.com/app/"
          target="_blank"
          rel="noreferrer"
        >        
          <div style={{ width: 100 }}>
            {/* My Brand Logo */}
            <Image
              src={logo}
              className="drop-shadow backdrop-invert hover:backdrop-invert-0"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
        </Link>

        <Link href="/" className="text-center">
          <h1 className="hidden md:inline text-3xl mt-2 mb-2 font-bold">
            Web Scraper
          </h1>
          </Link>
          <Link href="/" className="space-x-0">
          <h1 className="md:hidden sm:inline text-sm mt-2 mb-2 font-bold">
            Home
          </h1>
          </Link>          
          <h2 className="hidden md:inline text-center text-xs italic">
            Scrape the Unscrapable
          </h2>
      </div>

      <ul className="flex flex-col gap-2 py-2">
        {snapshot?.docs.map((doc) => (
          <SidebarRow key={doc.id} doc={doc} />
        ))}
        {/* SidebarRow */}
        {/* SidebarRow */}
        {/* SidebarRow */}
        {/* SidebarRow */}
        {/* SidebarRow */}
      </ul>
    </div>
  );
}

export default Sidebar;
