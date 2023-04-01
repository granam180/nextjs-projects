import Link from "next/link";
import React from "react";

type PageProps = {
  params: {
    searchTerm: string;
  };
};

type SearchResult = {
  organic_results: [
    {
      position: number;
      title: string;
      link: string;
      thumbnail: string;
      snippet: string;
      // related_searches?: {
      //   // first check if the `related_searches` exists in the `results` object
      //   query: string;
      //   link: string;
      // }[];
    }
  ];
};

const search = async (searchTerm: string) => {
  const res = await fetch(
    // https://serpapi.com/dashboard --> Google Search API!!
    // *** ONLY 100 SEARCHES per MONTH ***
    `https://serpapi.com/search.json?q=${searchTerm}&api_key=${process.env.API_KEY}`
  );

  // throw new Error("WHOOPS something broke");
  const data: SearchResult = await res.json();
  return data;
};

async function SearchResults({ params: { searchTerm } }: PageProps) {
  const searchResults = await search(searchTerm);
  console.log(searchResults);
  return (
    <div>
      <p className="text-gray-500 text-sm">You searched for: {searchTerm}</p>

      <ol className="space-y-5 p-5">
        {searchResults.organic_results.map((result) => (
          <Link
            href={result.link}
            className="flex flex-col space-x-4 w-full bg-white rounded-lg shadow-md p-5"
            target="_blank"
            rel="noreferrer"
          >
            <li key={result.position} className="list-decimal">
              <p className="font-bold" key={result.position}>
                {result.title}
              </p>
              <p>{result.snippet}</p>
            </li>

            {/* TODO for related_searches API results
            
            {result.related_searches && // if `related_searches` exists, then map over it
              result.related_searches.map((relatedSearch) => (
                <li key={relatedSearch.query} className="list-decimal">
                  <Link
                    href={relatedSearch.link}
                    className="flex flex-col space-x-4 w-full bg-white rounded-lg shadow-md p-5"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <p className="font-bold" key={relatedSearch.query}>
                      {relatedSearch.query}
                    </p>
                  </Link>
                </li>
              ))} 
              
              */}
          </Link>
        ))}
      </ol>
    </div>
  );
}

export default SearchResults;
