import { React, useState, useEffect } from "react";
import Plot from "react-plotly.js";

function Stock() {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [StockSymbol, setStockSymbol] = useState("TSCO");

  const [stockData, setStockData] = useState([]);
  const setX = (x) => {
    setStockChartXValues(x);
  };

  const setY = (y) => {
    setStockChartYValues(y);
  };

  const handleSubmit = async () => {
    const response = await fetch(url, options);
    const result = await response.json();
    if (result) {
      setStockData(result);
      let stockChartXValuesFunction = [];
      let stockChartYValuesFunction = [];

      for (let key in result["Time Series (Daily)"]) {
        stockChartXValuesFunction.push(key);
        stockChartYValuesFunction.push(
          result["Time Series (Daily)"][key]["1. open"]
        );
      }

      //console.log(stockChartXValuesFunction);

      setX(stockChartXValuesFunction);
      setY(stockChartYValuesFunction);

      console.log(result);
    }
  };

  const handleOnChangeSymbol = (event) => {
    setStockSymbol(event.target.value);
  };
  /*
    const handleOnChangeNation = (event) => {
      setStockNation(event.target.value);
    };
  */
  const API_KEY = "RLKGUFGPP780ERR1";

  let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
  const options = {
    method: "GET",
  };

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (result) {
          setStockData(result);
          let stockChartXValuesFunction = [];
          let stockChartYValuesFunction = [];

          for (let key in result["Time Series (Daily)"]) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(
              result["Time Series (Daily)"][key]["1. open"]
            );
          }

          console.log(stockChartXValuesFunction);

          setX(stockChartXValuesFunction);
          setY(stockChartYValuesFunction);
        }
      } catch (error) {
        console.log(error);
      }
    };

    FetchData();
  }, []);
  return (
    <>
      <h1>Stock Market</h1>
      <div>
        <div className="page">
          <div className="field field_v1 my-2">
            <label htmlFor="first-name" className="ha-screen-reader">
              COMPANY SYMBOL NAME
            </label>

            <input
              id="first-name"
              className="field__input"
              placeholder="e.g.AMZN ,MSFT"
              type="text"
              value={StockSymbol}
              onChange={handleOnChangeSymbol}
            />
          </div>

          <button className="button2" type="button" onClick={handleSubmit}>
            SUBMIT
          </button>
        </div>

        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "grey" },
            },
          ]}
          layout={{
            width: 720,
            height: 440,
            title: `Line chart of ${StockSymbol}`,
          }}
        />
        <Plot
          data={[
            {
              x: stockChartXValues,
              y: stockChartYValues,
              type: "bar",
              mode: "lines+markers",
              marker: { color: "grey" },
            },
          ]}
          layout={{
            width: 720,
            height: 440,
            title: `Bar chart of ${StockSymbol}`,
          }}
        />
      </div>
    </>
  );
}
export default Stock;
