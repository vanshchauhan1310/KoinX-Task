import React from 'react';

function DeviationCard({ deviation, coinName }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Standard Deviation for {coinName}</h2>
      <p className="text-3xl font-bold">
        ${deviation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
    </div>
  );
}

export default DeviationCard;