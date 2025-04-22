import React, { useEffect, useState, useMemo, useReducer } from "react";
import QuotesCard from "./QuotesCard";
import useData from "../hooks/useData";
import Loader from "./Loader";
import FilterPanel from "./FilterPanel";
export default function QuotesApp() {
  const [isLoading, setIsLoading] = useState(false);
  const { data, loadData } = useData({ isLoading, setIsLoading });
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredData = useMemo(() => {
    const filtered = data.filter(
      (item) =>
        item.quote.toLowerCase().includes(search.toLowerCase()) ||
        item.author.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.quote.localeCompare(b.quote);
      } else {
        return b.quote.localeCompare(a.quote);
      }
    });
  },[data,search,sortOrder]);
 

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <FilterPanel
        search={search}
        setSearch={setSearch}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
<div className="quote-list">
{filteredData.map((item) => (
        <QuotesCard quote={item} />
      ))}
</div>
      
    </>
  );
}
