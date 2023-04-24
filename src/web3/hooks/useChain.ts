import { useNetwork, useSwitchNetwork } from 'wagmi';
import { chain as expectedChain } from '@/web3/chains';

export default function useChain() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({ chainId: expectedChain.id });
  const shouldSwitch = typeof chain?.id === 'number' && chain.id !== expectedChain.id;

  return {
    chain,
    expectedChain,
    shouldSwitch,
    switchNetwork: () => {
      if (shouldSwitch) {
        switchNetwork?.(expectedChain.id);
      }
    },
  };
}
