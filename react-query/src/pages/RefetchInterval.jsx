import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchBitcoinPrice = async () => {
  const cachedData = localStorage.getItem("bitcoinPrice");
  const currentTime = new Date().getTime();

  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    // Check if cached data is less than 1 minute old
    if (currentTime - parsedData.timestamp < 60000) {
      return parsedData.data;
    }
  }

  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,bdt"
  );
  const priceData = response.data.bitcoin;

  // Cache the data with a timestamp
  localStorage.setItem(
    "bitcoinPrice",
    JSON.stringify({ data: priceData, timestamp: currentTime })
  );

  return priceData;
};

const BitcoinPrice = () => {
    const { data, isLoading, error, refetch, isFetching, isError } = useQuery({
        queryKey: ["bitcoin-price"],
        queryFn: fetchBitcoinPrice,
        refetchInterval: 60000, // auto-refresh every 1 minute
      });

  if (isLoading) return <p>Loading Bitcoin price...</p>;
  if (isError) return <p>Error fetching price!</p>;

  return (
    <div>
      <h2>Current Bitcoin Price</h2>
      <p>USD: ${data?.usd}</p>
      <p>BDT: ৳{data?.bdt}</p>
      <p>Last updated: {new Date().toLocaleTimeString()}</p>
      <button onClick={refetch} disabled={isFetching}>
        {isFetching ? "Refreshing..." : "Refetch Bitcoin Price"}
      </button>
    </div>
  );
};

export default BitcoinPrice;
