'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import Navbar from '../navbar/Navbar';
import Icon from '../icon/Icon';

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <header className="flex w-full place-items-center justify-between bg-primary px-6 py-2 xl:px-10">
      <Link href="/">
        <Icon fill="#fff" icon="logo" width="50" height="50" />
      </Link>
      <button type="button" onClick={() => setShowNavbar(true)}>
        <Icon icon="menu" stroke="#fff" width="35" height="35" />
      </button>
      {showNavbar && <Navbar onClose={() => setShowNavbar(false)} />}
    </header>
  );
};

export default Header;
