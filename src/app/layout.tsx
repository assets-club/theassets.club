import { Metadata } from 'next';
import { FC, ReactNode } from 'react';
import Nav from '@/app/components/Nav';
import Player from '@/app/components/Player';
import Providers from './providers';

const metadata: Metadata = {
  title: 'The Assets Club',
};

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
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
