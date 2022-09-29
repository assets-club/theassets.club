export default function useScrollToMint() {
  return () => {
    window.scrollTo({
      top: window.innerHeight * 2,
      behavior: 'smooth',
    });
  };
}
