import React, { useEffect, useState } from "react";

const QuoteBox = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [author, setAuthor] = useState(null);

  const fetchQuote = async () => {
    setLoading(true)
    let category = "happiness";

    fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      headers: {
        "X-Api-Key": "tdiBIKQZtHOHE4Hv/C0rlg==PmQMnQaNHfgFZDML",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuote(data[0].quote);
        setAuthor(data[0].author);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  
  useEffect(() => {
    fetchQuote();
  }, []); 
  const handleNewQuoteClick = () => {
    fetchQuote();
  };

  return (
    <div id="quote-box">
      <p id="text">{loading ? "loading" : quote}</p>
      <span id="author"> {author} </span>
      <div className="box">
        <a href="#" id="tweet-quote">
          Tweet Quote
        </a>
        <button id="new-quote" onClick={handleNewQuoteClick}> New Quote </button>
      </div>
    </div>
  );
};

export default QuoteBox;
