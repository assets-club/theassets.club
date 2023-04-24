import { useAccount } from 'wagmi';
import { z } from 'zod';
import { useMemo } from 'react';
import { StandardMerkleTree } from '@openzeppelin/merkle-tree';
import { useQuery } from '@tanstack/react-query';
import { Proof, Tier } from '../contracts/TheAssetsClub';

const tierSchema = z.nativeEnum(Tier);

const leafSchema = z.tuple([
  z.string().min(1), // address
  z.nativeEnum(Proof),
  z.number().int(),
]);

const treeSchema = z.object({
  format: z.enum(['standard-v1']),
  tree: z.array(z.string().min(1)),
  values: z.array(
    z.object({
      value: leafSchema,
      treeIndex: z.number().int(),
    }),
  ),
  leafEncoding: z.array(z.string().min(1)),
});

export type Leaf = z.infer<typeof leafSchema>;

async function fetchMerkleTree() {
  const res = await fetch('https://static.theassets.club/tree.json');
  if (!res.ok) {
    throw new Error('Cannot fetch Merkle Tree');
  }

  const treeData = treeSchema.parse(await res.json());

  return StandardMerkleTree.load(treeData);
}

export default function useTree() {
  const { data: tree, ...rest } = useQuery({
    queryFn: fetchMerkleTree,
  });
  const { address } = useAccount();

  const leaves = useMemo(() => {
    if (!address || !tree) return;

    const found: Leaf[] = [];
    for (const [_, leaf] of tree.entries()) {
      if (address === leaf[0]) {
        found.push(leaf);
      }
    }

    return found;
  }, [address, tree]);

  return {
    tree,
    leaves,
    ...rest,
  };
}
