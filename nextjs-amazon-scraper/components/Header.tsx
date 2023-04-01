'use client' //* use only when loading on the BROWSER, not the SERVER
            // now we can attach state, eventHandlers, etc.

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'  // use next/naviagtion when building in NextJS 13!! 
import { FormEvent, useRef } from 'react'  // client rendering
import { toast } from 'react-hot-toast'

function Header() {
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter();

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const input = inputRef.current?.value
    if (!input) return;

    const notification = toast.loading(`${input} is getting Scraaaaped!`);

    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }

    try {
      // Call our API to activate the Scraper...
      // endpoint: /api/activateScraper

      const response = await fetch('/api/activateScraper', {  // request to endpoint, skipped over app/api/activateScraper 
        method: "POST",                                       // problems using NextApiRequest import
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: input }),
      });

      toast.success("You Are Now Scraping The Unscrapable", {
        id: notification,
      });

      const { collection_id, start_eta } = await response.json();

      router.push(`/search/${collection_id}`);

    } catch (error) {
      // Handle any err

      toast.error("Whoops... Something Went Wrong!");
    }

    // Wait for the response to come back
  }
  return (
    <header>
      <form
        className="flex items-center md:space-x-2 justify-center rounded-full py-2 px-4 bg-indigo-100 max-w-xl mx-auto mb-3"
        // onSubmit={e => handleSearch} // hover over handleSearch to find 
        onSubmit={handleSearch}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..." // will show instead of <button>
          // take upt eh rest of the room of <form>
          className="flex-1 outline-none bg-transparent pl-10 md:px-2 text-indigo-400 placeholder:text-indigo-300"
        />
        <button hidden>Search</button>
        <MagnifyingGlassIcon className="h-6 w-6 text-indigo-300" />
      </form>
    </header>
  )
}

export default Header
