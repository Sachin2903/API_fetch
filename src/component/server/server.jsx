import React, { useEffect, useState } from 'react';
import styles from './server.module.css'

export default function Api() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch('https://api.coincap.io/v2/assets/bitcoin/markets');
        const jsonData = await response.json();
        jsonData.data.sort((a,b)=>a.volumeUsd24Hr-b.volumeUsd24Hr)
        setCoins(jsonData.data);
        
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className={styles.Api}>
      <h1>Top 100 Cryptocurrency Coins with max change</h1>
      <div className={styles.list}>
        <ul>
        {coins.map((coin,i) => (
          <li key={i*10}>
            <div className={styles.coins}><strong>{coin.name}</strong> ({coin.symbol}): ${coin.priceUsd}</div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}


