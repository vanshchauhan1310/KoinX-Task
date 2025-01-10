import React from 'react';

const StatsCard = ({ stats, coinName }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Stats for {coinName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
          <p className="text-2xl font-bold">${stats.price.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Market Cap</p>
          <p className="text-2xl font-bold">${stats.marketCap.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">24h Change</p>
          <p className={`text-2xl font-bold ${stats['24hChange'] >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stats['24hChange'].toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;