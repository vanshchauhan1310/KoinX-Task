import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './compoenents/ThemeProvider';
import Header from './compoenents/Header';
import CryptoSelector from './compoenents/CryptoSelector';
import StatsCard from './compoenents/StatsCard';
import DeviationCard from './compoenents/DeviationCard';
import { Toast } from './compoenents/ui/Toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

function App() {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [stats, setStats] = useState(null);
  const [deviation, setDeviation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/stats?coin=${selectedCoin}`);
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      } else {
        throw new Error(data.error || 'Failed to fetch stats');
      }
    } catch (error) {
      setError(error.message);
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeviation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/deviation?coin=${selectedCoin}`);
      const data = await response.json();
      if (response.ok) {
        setDeviation(data.deviation);
      } else {
        throw new Error(data.error || 'Failed to fetch deviation');
      }
    } catch (error) {
      setError(error.message);
      setDeviation(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when coin changes
  useEffect(() => {
    fetchStats();
    fetchDeviation();
  }, [selectedCoin]);

  const coins = [
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'matic-network', name: 'Matic' },
    { id: 'ethereum', name: 'Ethereum' }
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-8">
          <Header />
          <main className="space-y-6">
            <CryptoSelector
              coins={coins}
              selectedCoin={selectedCoin}
              onSelect={setSelectedCoin}
              loading={loading}
            />
            
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
              </div>
            ) : (
              <>
                {stats && (
                  <StatsCard 
                    stats={stats} 
                    coinName={coins.find(c => c.id === selectedCoin)?.name} 
                  />
                )}
                {deviation !== null && (
                  <DeviationCard 
                    deviation={deviation} 
                    coinName={coins.find(c => c.id === selectedCoin)?.name} 
                  />
                )}
              </>
            )}
          </main>
        </div>
        {error && <Toast message={error} type="error" />}
      </div>
    </ThemeProvider>
  );
}

export default App;