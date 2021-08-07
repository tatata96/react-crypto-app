import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './coin.css';
import Coin from './Coin.js';



function App() {

  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  //fetch data from API
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(
      res => {
        console.log(res.data);
        setCoins(res.data);
      }
    ).catch(error => console.log(error))
  }, []);

  //search coins
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))


  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search For A Cryptocurrency</h1>
        <form>
          <input type="text" placeholder="Ara" className="coin-input" onChange={handleSearch} />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin key={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            volume={coin.total_volume}
            image={coin.image}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        )
      })}



    </div>
  );
}

export default App;


//npm install axios