"use client";

import apiClient from "@/utilis/apiClient";
import { useDebounce } from "@/utilis/debounce";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type SuggestionPanelProps = {
  suggestions: [{ _id: string; name: string, location: { city: string; state: string; country: string } }];
};

function SuggestionPanel({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<SuggestionPanelProps>();
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (!search) {
      setSuggestions(undefined);
      return;
    }

    if (debouncedSearch) {
      fetchSuggestions();
    }
  }, [debouncedSearch]);

  const fetchSuggestions = async () => {
    try {
      const suggestions = await apiClient.getSuggestion(search);
      const data = suggestions as {data: SuggestionPanelProps};
      setSuggestions(data.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  return (
    <>
      {suggestions && (
        <div className="absolute w-full bg-white shadow-2xl rounded-2xl p-5 mt-2 z-50">
          <div>
            <ul className="text-md text-gray-500 flex flex-col gap-2">
              {suggestions.suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between hover:bg-gray-50 rounded-full p-3 cursor-pointer"
                  onClick={() => {
                    setSearch(suggestion.name);
                    params.set("query", suggestion.name);
                    navigate(`/search/?${params.toString()}`);
                  }}>
                  <span>{suggestion.name} {suggestion.location.city}, {suggestion.location.state}, {suggestion.location.country}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default SuggestionPanel;
