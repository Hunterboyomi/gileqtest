// components/SearchKeywords.tsx

import React from 'react';

interface SearchKeywordsProps {
  keywords: string[];
}

const SearchKeywords: React.FC<SearchKeywordsProps> = ({ keywords }) => {
  return (
    <div className="my-6">
      <h3 className="font-bold text-lg mb-2">Search Keywords:</h3>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <a
            key={index}
            href={`https://www.google.com/search?q=${encodeURIComponent(keyword)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline"
          >
            {keyword}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SearchKeywords;
