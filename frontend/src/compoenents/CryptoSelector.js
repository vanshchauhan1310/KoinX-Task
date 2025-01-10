import React from 'react';

function CryptoSelector({ coins, selectedCoin, onSelect, loading }) {
  return (
    <div className="mb-6">
      <select
        value={selectedCoin}
        onChange={(e) => onSelect(e.target.value)}
        disabled={loading}
        className="w-full md:w-64 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {coins.map((coin) => (
          <option key={coin.id} value={coin.id}>
            {coin.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CryptoSelector;