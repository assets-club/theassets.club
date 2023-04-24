import { Metadata } from 'next';
import { FC, ReactNode } from 'react';
import Nav from '@/app/components/Nav';
import Player from '@/app/components/Player';
import MarkerFelt from '@/app/fonts/MarkerFelt';
import SuisseIntl from '@/app/fonts/SuisseIntl';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    template: '%s | The Assets Club',
    default: 'The Assets Club',
  },
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className={`${SuisseIntl.className} ${MarkerFelt.className}`}>
      <body>
        <Providers>
          <Nav position="fixed" top={0} left={0} right={0} zIndex={1000} />
          {children}
          <Player position="fixed" bottom="5vh" left="5vh" zIndex={1000} />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
