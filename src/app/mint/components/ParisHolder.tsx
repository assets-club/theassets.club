import { FC } from 'react';
import MintBox from '@/app/mint/components/MintBox';
import useNFTParisToken from '@/web3/hooks/useNFTParis';
import { Text } from '@chakra-ui/react';

const ParisHolder: FC = () => {
  const { tokenId } = useNFTParisToken();

  if (typeof tokenId !== 'number') {
    return null;
  }

  return (
    <MintBox title="TheAssetsClub at NFT Paris Holder">
      <Text>You are an early supporter of the project! You will be able to mint two tokens for free!</Text>
    </MintBox>
  );
};

export default ParisHolder;
