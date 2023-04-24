import { chain } from '../chains';

export default function chainMap<T>(map: Record<number, T>): T {
  const found = map[chain.id];

  if (!found) {
    throw new Error(`Cannot found value for chain ${chain.id}`);
  }

  return found;
}
