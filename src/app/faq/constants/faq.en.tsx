import { Link, Stack, Text } from '@chakra-ui/react';

export const titleEN = {
  title: <>Frequently assked questions</>,
  question: <>What is a non-fungible token (NFT)?</>,
  answer: (
    <>
      NFT stands for &lsquo;Non-fungible token&rsquo;, which means that it&apos;s a unique digital item with
      blockchain-managed ownership that users can buy, own, and trade. Some NFT&apos;s fundamental function is to be
      digital art.
      <br /> But they can also offer additional benefits like exclusive access to websites, event tickets, and ownership
      records. NFTs can be used to represent easily-reproducible items such as photos, videos, audio, and other types of
      digital files as unique items. NFTs use blockchain technology to establish a verified and public proof of
      ownership. Stay safe, always do your own research.
    </>
  ),
};

export const questionsEN = [
  {
    question: <>What is The Assets Club?</>,
    answer: (
      <>
        The Assets Club is a generative art collection with 31 base assets and 3000+ hand-drawn elements, enabled by a
        custom algorithm developed specifically for the generative process—no AI, just pure creativity and
        craftsmanship.
      </>
    ),
  },
  {
    question: <>Is the collection already available on market place?</>,
    answer: (
      <>
        Indeed, the 10% of the collection is available on OpenSea. You can find it by visiting this{' '}
        <Link href="https://opensea.io/collection/theassetsclub">link</Link>.
        <br />
        This small portion was minted on April 27, 2023. For the upcoming mint on Abstract Chain, a wallet snapshot will
        allow ETH collection holders to mint the new collection for free. The number of mints available to each wallet
        will depend on the number of assets held. Afterward, the minting process will proceed with a private phase,
        followed by a public mint.{' '}
      </>
    ),
  },
  {
    question: <>How many Assets are there going to be?</>,
    answer: <>There will be 3&apos;333 unique and randomly generated assets with over 3000 layers.</>,
  },
  {
    question: <>Why Abstract Chain?</>,
    answer: (
      <>
        Abstract Chain was chosen for our upcoming mint because it offers a user-friendly experience by simplifying
        blockchain technology, ensures cost efficiency with low transaction fees, provides high scalability for
        efficient operations, enhances security with zero-knowledge proofs, and includes community governance through
        Panoramic Governance, allowing community participation and rewards.
      </>
    ),
  },
  {
    question: <>What is generative art?</>,
    answer: (
      <>
        Generative art refers to any art practice where the artist creates a process, such as a set of natural language
        rules, a computer program, a machine, or other procedural invention, which is then set into motion with some
        degree of autonomy contributing to or resulting in a completed work of art.
      </>
    ),
  },
  {
    question: <>When can I mint Assets?</>,
    answer: <>Soon! Very Soon.</>,
  },
  {
    question: <>Which wallets are supported for minting?</>,
    answer: (
      <>You will be able to mint with any wallet supported by Wallet Connect on Abstract Chain, including MetaMask.</>
    ),
  },
  {
    question: <>What is the value of an Asset?</>,
    answer: <>This collection is an artistic creation, the value of an Asset is what someone will pay for it.</>,
  },
];
