"use client"; // Client-Side Component

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => { // definition... could also instantiate on the form onSubmit event directly
    e.preventDefault();
    setSearch("");
    router.push(`/search/${search}`);
  };

  return (
    <form onSubmit={handleSearch} className="position: relative md:bottom-2">
      <input
        type="text"
        value={search}
        className="bg-slate-300/50 py-1 px-4 rounded-lg"
        placeholder="Enter the Search term"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-1 px-4 md:ml-2 mt-2 rounded-lg"
      >
        Search
      </button>
    </form>
  );
}

export default Search;
