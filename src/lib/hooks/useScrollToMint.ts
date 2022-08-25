import { useGlobalState } from '../StateProvider';

export default function useScrollToMint() {
  const { mintRef } = useGlobalState();

  return () => {
    if (!mintRef.current) return;

    const mintRect = mintRef.current.getBoundingClientRect();

    window.scrollTo({
      top: mintRect.top - window.innerHeight / 2 + mintRect.height / 2,
      behavior: 'smooth',
    });
  };
}
