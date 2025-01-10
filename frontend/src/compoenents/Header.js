import React from 'react';
import { ModeToggle } from './ModeToggle';

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">Crypto Stats</h1>
      <ModeToggle />
    </header>
  );
};

export default Header;

