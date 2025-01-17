import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ApexCharts from 'react-apexcharts';
import BackgroundBeamsWithCollisionDemo from "./BackgroundBeamsWithCollisionDemo"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function StockContext() {

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState({});
  const [candlestickData, setCandlestickData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLineChart, setIsLineChart] = useState(false);
  const [isApiLimitMessage, setIsApiLimitMessage] = useState(false);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey={import.meta.env.VITE_API_KEY}`
      );
      const result = await response.json();
      setIsApiLimitMessage(result?.Information?.includes("Alpha Vantage"));
      if (result.bestMatches) {
        setSuggestions(result.bestMatches);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching stock symbols:', error);
    }
  };

  const fetchStockData = async (symbol) => {
    setLoading(true);
    try {
      const timeSeriesResponse = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey={import.meta.env.VITE_API_KEY}`
      );
      const timeSeriesResult = await timeSeriesResponse.json();
      setIsApiLimitMessage(timeSeriesResult?.Information?.includes("Alpha Vantage"));
      if (timeSeriesResult['Time Series (5min)']) {
        const times = timeSeriesResult['Time Series (5min)'];
        const timeLabels = Object.keys(times).reverse();
        const prices = timeLabels.map((time) => parseFloat(times[time]['1. open']));

        // Line chart data
        setChartData({
          labels: timeLabels,
          datasets: [
            {
              label: `${symbol} Price`,
              data: prices,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
              tension: 0.4,
            },
          ],
        });

        // Candlestick chart data
        const candlestick = timeLabels.map((time) => ({
          x: time,
          y: [
            parseFloat(times[time]['1. open']),
            parseFloat(times[time]['2. high']),
            parseFloat(times[time]['3. low']),
            parseFloat(times[time]['4. close']),
          ],
        }));
        setCandlestickData(candlestick);
      } else {
        console.error('Invalid data format from Alpha Vantage API');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleStockSelect = (symbol) => {
    setSelectedStock(symbol);
    setSearchQuery(symbol);
    setSuggestions([]);
    fetchStockData(symbol);
  };

  useEffect(() => {
    if (selectedStock) {
      fetchStockData(selectedStock);
    }
  }, [selectedStock, isApiLimitMessage]);

  return (
    <div className='w-full h-[98%] overflow-y-auto flex flex-col sm:flex-row text-white'>
      <div className='sm:w-[20%] w-full h-auto flex flex-col cursor-pointer'>
        <div className="w-full h-auto pl-2 pr-2 pb-0 mb-0 text-9xl flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">FIN</div>
        <div className="w-full h-auto pl-1 pr-1 pt-0 mt-0 mb-1 text-8xl flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-800">ANCE</div>
        <br />
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for a stock symbol..."
            className="w-full h-10 hover:shadow-red-500 shadow-lg text-gray-200 bg-black text-xl p-4 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 border"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white text-black text-xs border rounded-lg shadow-lg w-full mt-1 max-h-60 overflow-y-auto">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer p-2 hover:bg-gray-100"
                  onClick={() => handleStockSelect(item['1. symbol'])}
                >
                  <span className="font-bold">{item['1. symbol']}</span> - {item['2. name']}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="text-center mb-4">
          <div onClick={() => setIsLineChart(true)} className='p-2 mt-2 flex items-center justify-center w-full text-sm border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold'>LINE CHART</div>

          <div onClick={() => setIsLineChart(false)} className='p-2 mt-2 flex items-center justify-center w-full text-sm border hover:shadow-lg hover:shadow-white border-white rounded-lg hover:bg-white hover:text-black hover:font-bold'>CANDLESTICK CHART</div>
        </div>
      </div>
      <div className='sm:w-[2%] w-full sm:h-full h-16'></div>
      <div className={`sm:w-[78%] w-full h-auto relative ${isApiLimitMessage ? "bg-black overflow-y-auto" : "bg-white overflow-hidden"} sm:mt-0`}>
        {loading && <p className="text-center">Loading...</p>}

        {!loading && isApiLimitMessage && <div className="mx-auto max-w-3xl mt-4">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-yellow-800">
                  API Rate Limit Notice
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  You've reached the daily API request limit (25 requests). To continue using the service without limitations, please consider upgrading to a premium plan. BUT YOU CAN CHANGE UR NETWORK AND TRY ANOTHER 25 EEEACH TIME
                </p>
              </div>
            </div>
          </div>
        </div>}

        {selectedStock === "" && <div className='text-black w-full h-full'>
          <BackgroundBeamsWithCollisionDemo />
        </div>}

        {!loading && !isApiLimitMessage && isLineChart && chartData.labels && (
          <div>
            <h2 className="text-xl font-bold text-center mb-4 text-white">Line Chart</h2>
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Time',
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Price (USD)',
                    },
                  },
                },
              }}
            />
          </div>
        )}

        {!loading && !isApiLimitMessage && !isLineChart && candlestickData.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-center mt-32 mb-4 text-white">Candlestick Chart</h2>
            <ApexCharts
              options={{
                chart: {
                  type: 'candlestick',
                },
                xaxis: {
                  type: 'category',
                  labels: {
                    rotate: -45,
                  },
                },
              }}
              series={[{ data: candlestickData }]}
              type="candlestick"
              height={350}
            />
          </div>
        )}
      </div>
    </div>
  )
}
