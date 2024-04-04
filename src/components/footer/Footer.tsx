'use client';

import React from 'react';

import Icon from '../icon/Icon';

const footerItems = [
  {
    title: 'Melde dich',
    info: [
      '<a href="tel:+41 44 500 96 76">+41 44 500 96 76</a>',
      '<a href="">team@viu.ch</a>',
    ],
  },
  {
    title: 'Komm vorbei',
    info: ['<span>Rennweg 38</span>', '<span>8001 Zürich</span>'],
  },
  {
    title: 'Folge uns',
    info: ['<a href="">Linkedin</a>', '<a href="">Instagram<a/>'],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-8 px-6 flex flex-col gap-8 items-end md:px-24:px-8 lg:px-28">
      <div className="flex gap-2 flex-wrap self-stretch justify-between items-center md:gap-6">
        <Icon icon="logo" fill="#FF2300" width="50" height="50" />
        <h3 className="text-heading-m-mobile font-black text-primary text-right md:text-m-tablet lg:text-m-desktop">
          Einfach die Lösung.
        </h3>
      </div>
      <div className="flex gap-8 flex-col md:flex-row text-right">
        {footerItems.map((item) => {
          return (
            <div key={item.title} className="flex flex-col gap-2">
              <h4 className="text-body-s font-bold decoration-none text-secondary">
                {item.title}
              </h4>
              {item.info.map((data) => {
                return (
                  <span
                    key={data}
                    className="text-body-xs text-secondary has(a):cursor-pointer"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: data }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
