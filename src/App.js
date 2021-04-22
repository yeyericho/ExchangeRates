import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [headers, setHeaders] = useState([]);

  const getHeaders = async () => {
    try {
      const response = await axios(
        "https://api.exchangerate.host/latest?base=IDR&symbols=CAD,JPY,CHF,EUR,USD&amount=100000"
      );
      const arrCurr = [];
      const currTrade = 0.0005;
      const rates = response.data.rates;
      const jenis = Object.keys(rates);
      const harga = Object.values(rates);
      jenis.forEach((jenisC, indexKey) => {
        harga.forEach((valueC, indexV) => {
          if (indexKey === indexV) {
            arrCurr.push({
              currency: jenisC,
              value: valueC,
              sell: valueC + valueC * currTrade,
              buy: valueC - valueC * currTrade,
            });
          }
        });
      });

      setHeaders(arrCurr);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getHeaders();
  }, []);

  console.log(headers);

  return (
    <div className="App">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Base</th>
            <th>Currency</th>
            <th>Sell</th>
            <th>Base Rates</th>
            <th>Buy</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(headers).map((headers, index) => (
            <tr>
              <td>IDR</td>
              <td key={index}>{headers.currency}</td>
              <td key={index}>{headers.sell}</td>
              <td key={index}>{headers.value}</td>
              <td key={index}>{headers.buy}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
