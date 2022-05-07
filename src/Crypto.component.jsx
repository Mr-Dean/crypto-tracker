import React, { useState, useEffect } from "react";
import ethLogo from './eth.png';
import bitLogo from './bitcoin.png';
import './crypto.css';

const Crypto = () => {
  const [hasError, setErrors] = useState(false);
  const [ethereum, setEth] = useState();
  const [bitcoin, setBitcoin] = useState();

  const fetchData = async () => {
    const eth = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=ETH");
    eth
      .json()
      .then(data => setEth(data.data.rates.GBP))
      .catch(err => setErrors(err));

  
    const bit = await fetch("https://api.coinbase.com/v2/exchange-rates?currency=BTC");
    bit
      .json()
      .then(data => setBitcoin(data.data.rates.GBP))
      .catch(err => setErrors(err));
    };


    useEffect(() => {
      const interval = setInterval(() => {
        fetchData()
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);
  

  if (hasError){
    console.log(hasError)
    return(
      <div>
        <h2>Oops, something went wrong...try again!</h2>
      </div>
    )
  } else {
    return(
      <div className='container'>
        <div className='box'>
          <img className="logo" src={ethLogo} alt="logo"/>
          <h2>ethereum</h2>
          <h3>{ethereum ? `£${Number(ethereum).toLocaleString()}` : 'Loading...'}</h3>
        </div>
        <div className='box'>
          <img className="logo" src={bitLogo} alt="logo"/>
          <h2>bitcoin</h2>
          <h3>{bitcoin ? `£${Number(bitcoin).toLocaleString()}` : 'Loading...'}</h3>
        </div>
        
        
        
      </div>
    )
  };
};

export default Crypto;