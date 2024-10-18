'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Google Programmable Search Engine script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://cse.google.com/cse.js?cx=1483fc36f0efd449d'; // Your Google Programmable Search Engine cx value
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Get the query parameter from the URL on the initial load
    const urlParams = new URLSearchParams(window.location.search);
    const initialQuery = urlParams.get('q');
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== '') {
      // Navigate to the same search page with the new query parameter
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="container mx-auto py-6">
      {/* Search Box */}
      <form className="mb-6" onSubmit={handleSearch}>
        <div className="flex items-center justify-center">
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2 text-lg"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-lg"
          >
            Search
          </button>
        </div>
      </form>

      {/* Google Programmable Search Results */}
      <div className="gcse-searchresults" />
    </div>
  );
}
