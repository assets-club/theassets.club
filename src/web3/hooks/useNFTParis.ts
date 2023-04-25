import { BigNumber, utils } from 'ethers';
import { useAccount, useContractRead } from 'wagmi';
import { useMemo } from 'react';
import alchemy from '@/web3/alchemy';
import TheAssetsClub, { NFT_PARIS } from '@/web3/contracts/TheAssetsClub';
import { useQuery } from '@tanstack/react-query';

export default function useNFTParisToken() {
  const { address } = useAccount();
  const { data } = useQuery({
    enabled: typeof address === 'string',
    cacheTime: 60e3,
    queryKey: ['nftparis', address],
    queryFn: () => {
      return alchemy.nft.getNftsForOwner(address!, {
        contractAddresses: [NFT_PARIS],
        omitMetadata: true,
      });
    },
  });

  const tokenId = data?.ownedNfts?.reduce<number | undefined>((current, token) => {
    return Math.max(current ?? 0, BigNumber.from(token.tokenId).toNumber());
  }, undefined);

  const { data: used } = useContractRead({
    enabled: typeof tokenId === 'number',
    ...TheAssetsClub,
    functionName: 'nftParisUsed',
    args: typeof tokenId === 'number' ? [BigNumber.from(tokenId)] : undefined,
  });

  const proof = useMemo(() => {
    if (typeof tokenId === 'undefined') {
      return;
    }

    return [utils.hexZeroPad(NFT_PARIS, 32), utils.hexZeroPad(utils.hexlify(tokenId), 32)] as `0x${string}`[];
  }, [tokenId]);

  return { tokenId, proof, used };
}
