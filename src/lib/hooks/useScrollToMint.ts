import { MINT_PRINCESS_TOP_POSITION_PERCENT } from '../../constants';
import { useGlobalState } from '../StateProvider';

export default function useScrollToMint() {
  const { mintRef } = useGlobalState();

  return () => {
    console.log('sss');
    if (!mintRef.current) return;

    const winHeight = window.visualViewport.height;
    const height = mintRef.current.clientHeight;
    const top =
      mintRef.current.clientTop +
      (height * MINT_PRINCESS_TOP_POSITION_PERCENT) / 100 -
      (2 * winHeight * (100 - MINT_PRINCESS_TOP_POSITION_PERCENT)) / 100;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };
}
