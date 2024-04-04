import React from 'react';
import Link from 'next/link';

import Icon from '../icon/Icon';

interface Props {
  children: React.ReactNode;
  pageHeader: string;
  link: {
    href: string;
    text: string;
  };
}

const ViuFormPanel = (props: Props) => {
  const { children, pageHeader, link } = props;
  return (
    <div className="flex flex-col justify-center items-center w-full md:flex-row md:h-lvh lg:py-8">
      <div className="flex justify-center items-center bg-primary h-full w-full md:w-1/2 lg:w-1/3 lg:rounded-l-lg">
        <Icon width="200" height="200" icon="logo" fill="#fff" />
      </div>
      <div className="flex flex-col justify-center items-center gap-2 py-14 px-6 bg-white w-full h-full relative lg:px-14 lg:w-1/3 lg:shadow-2xl">
        <Link
          href={link.href}
          className="text-primary absolute top-5 right-5 font-bold"
        >
          {link.text}
        </Link>
        <h1>{pageHeader}</h1>
        {children}
      </div>
    </div>
  );
};

export default ViuFormPanel;
