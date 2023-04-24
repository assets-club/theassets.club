import { utils } from 'ethers';
import { useAccount } from 'wagmi';
import { useMemo } from 'react';
import alchemy from '@/web3/alchemy';
import { NFT_PARIS } from '@/web3/contracts/TheAssetsClub';
import { useQuery } from '@tanstack/react-query';

export default function useNFTParisToken() {
  const { address } = useAccount();
  const { data } = useQuery({
    enabled: typeof address === 'string',
    queryKey: ['nftparis', address],
    queryFn: () => {
      return alchemy.nft.getNftsForOwner(address!, {
        contractAddresses: [NFT_PARIS],
        omitMetadata: true,
      });
    },
  });

  const tokenId = data?.ownedNfts?.reduce<number | undefined>((current, token) => {
    return Math.max(current ?? 0, parseInt(token.tokenId));
  }, undefined);

  const proof = useMemo(() => {
    if (typeof tokenId === 'undefined') {
      return;
    }

    return [utils.hexZeroPad(NFT_PARIS, 32), utils.hexZeroPad(utils.hexlify(tokenId), 32)] as `0x${string}`[];
  }, [tokenId]);

  return { tokenId, proof };
}
