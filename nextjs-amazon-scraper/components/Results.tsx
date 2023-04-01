'use client'

import Link from "next/link";
import React, { useState } from "react";  // keeping track of state for sort order

type Props = {
  results: Product[];
};

function Results({ results }: Props) {

  // sort by price:

  /**
   * In this implementation, the sortedResults array is created by making a copy of the results array 
   * and sorting it based on the current sort order (which is controlled by the sortOrder state). 
   * The handleSortOrderChange function is called when the "Sort by price" button is clicked and updates 
   * the sortOrder state to the opposite of its current value.

    Note that this implementation assumes that the price property of each Product object is a number. 
    If it's a string, you may need to convert it to a number before doing the comparison in the sort() method.
   */
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedResults = results.slice().sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const handleSortOrderChange = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
  };

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full">

      <div className="flex-1 text-indigo-500 justify-end">
        <button
          onClick={handleSortOrderChange}
          className="bg-gray-200 px-3 py-2 rounded-lg font-semibold"
        >
          Sort by price ({sortOrder === "asc" ? "ascending" : "descending"})
        </button>
      </div>      
      {sortedResults.map((result) => (
        <Link
          href={result.url}
          key={result.title}
          className="flex flex-col space-x-4 w-full bg-white rounded-lg shadow-md p-5"
          target="_blank"
          rel="noreferrer"
        >
          <img
            srcSet={result.imageset}
            alt={result.title}
            className="object-contain w-full h-40 py-5"
          />

          <div className="flex space-x-2 justify-end flex-1">
            <p className="font-bold text-indigo-500 pt-2 text-xl mt-auto">
              {result.price > 0 ? `$${result.price}` : "N/A"}
            </p>

            {result.previous_price > 0 && (
              <p className="font-bold text-indigo-500/50 line-through pt-2 text-xl mt-auto">
                ${result.previous_price}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-end mt-5">
            {result.features.map((feature) =>
                feature && (
                  <p
                    key={feature}
                    className="text-xs bg-indigo-500 px-2 py-1 text-white rounded-md"
                  >
                    {feature}
                  </p>
                )
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Results;
