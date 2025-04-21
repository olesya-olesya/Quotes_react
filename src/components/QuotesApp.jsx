import React, { useEffect, useState, useMemo, useReducer } from "react";
import QuotesCard from "./QuotesCard";
export default function QuotesApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");
  const sortReducer = (state, action) => {
    return {
      direction: !state.direction,
      field: action.field,
    };
  };
  const [sort, dispatch] = useReducer(sortReducer, {
    direction: 0,
    field: null,
  });
  const filteredQuotes = useMemo(() => {
    let result = [...quotes];
    if (search) {
      result = result.filter(
        (q) =>
          q.quote.toLowerCase().includes(search.toLowerCase()) ||
          q.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sort.field === "author") {
      sort.direction
        ? result.sort((a, b) => a.author.localeCompare(b.author))
        : result.sort((a, b) => b.author.localeCompare(a.author));
    } else if (sort.field === "quote") {
      sort.direction
        ? result.sort((a, b) => a.quote.localeCompare(b.quote))
        : result.sort((a, b) => b.quote.localeCompare(a.quote));
    }

    return result;
  }, [quotes, search, sort]);

  useEffect(() => {
    getAllQuotes();
  }, []);
  const getAllQuotes = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://qapi.vercel.app/api/quotes");
      const data = await res.json();
      setQuotes(data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getRandomQuotes = async () => {
    try {
      const res = await fetch("https://qapi.vercel.app/api/random");
      const data = await res.json();
      const dataArray = [];
      dataArray.push(data);
      setQuotes(dataArray);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  const getRandomQuotesButtonClick = async () => {
    await getRandomQuotes();
  };
  return (
    <div>
      {isLoading && <div className="spinner">Загрузка...</div>}
      <h1>Цитаты</h1>
      <div className="buttons-wrapper">
        <button onClick={getRandomQuotesButtonClick}>
          Получить рандомную цитату
        </button>
        <button onClick={getAllQuotes}>Получить все цитаты</button>
        <p style={{ "margin-right": "5px" }}>Искать по автору или тесту </p>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />

        <button onClick={() => dispatch({ field: "author" })}>
          {sort.direction ? "↑" : "↓"} автор
        </button>
        <button onClick={() => dispatch({ field: "quote" })}>
          {sort.direction ? "↑;" : "↓"} цитата
        </button>
      </div>

      <div className="quote-list">
        {filteredQuotes.map((q) => (
          <QuotesCard quote={q} />
        ))}
      </div>
    </div>
  );
}
