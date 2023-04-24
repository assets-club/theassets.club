'use client';

import ReactCountdown, { CountdownRendererFn } from 'react-countdown';
import { FC } from 'react';
import MarkerFelt from '@/app/fonts/MarkerFelt';
import useMounted from '@/lib/hooks/useMounted';
import { START_DATE } from '@/web3/contracts/TheAssetsClub';
import { Box, BoxProps, Grid, GridItem, Text } from '@chakra-ui/react';

const startDate = new Date(START_DATE * 1000);

const MintCountdown: FC<BoxProps> = (props) => {
  const mounted = useMounted();
  const renderer: CountdownRendererFn = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null;
    }

    const parts = { days, hours, minutes, seconds };

    return (
      <Grid templateColumns="repeat(4,1fr)" gap={4}>
        {Object.entries(parts).map(([plural, value]) => {
          const singular = plural.replace(/s$/, '');
          const label = value >= 2 ? plural : singular;

          return (
            <GridItem
              key={label}
              fontFamily={MarkerFelt.style.fontFamily}
              p={3}
              textAlign="center"
              bgColor="whiteAlpha.200"
              borderRadius="xl"
            >
              <Text fontSize={{ base: '3xl', lg: '6xl' }} lineHeight={1}>
                {value}
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>{label}</Text>
            </GridItem>
          );
        })}
      </Grid>
    );
  };

  if (!mounted) {
    return null;
  }

  return <Box {...props}>{mounted && <ReactCountdown date={startDate} renderer={renderer} />}</Box>;
};

export default MintCountdown;
