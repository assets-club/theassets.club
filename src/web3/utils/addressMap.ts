import { Address } from 'wagmi';
import { chain } from '../chains';

export default function chainMap<T>(map: Record<number, T>): T {
  const found = map[chain.id];

  if (!found) {
    throw new Error(`Cannout found value for chain ${chain.id}`);
  }

  return found;
}
