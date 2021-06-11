import React, { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [first, setFirst] = useState('AUD');
  const [second, setSecond] = useState('USD');
  const [rate, setRate] = useState([]);

  const getRate = (first, second) => {
    axios({
      method: 'GET',
      url: `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=5a49beefa5e7696bc287`,
    })
      .then((response) => {
        console.log(response.data);
        setRate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="header">Currency Converter PRO</div>
      <div
        style={{ height: '5px', width: '100%', backgroundColor: '#9ffe36' }}
      ></div>
      <br />
      <div className="left-width">
        <div className="converter-screen">
          1 {first} = {rate[`${first}_${second}`]} {second}
        </div>
        <br />
        <label>From :</label>
        <input
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
        />
        &nbsp;&nbsp;
        <label>To :</label>
        <input
          type="text"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
        />
        &nbsp;&nbsp;
        <button
          onClick={() => {
            getRate(first, second);
          }}
        >
          Convert
        </button>
      </div>
    </>
  );
};
export default CurrencyConverter;
