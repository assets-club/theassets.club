import { NextPage } from 'next';
import Image from 'next/future/image';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import faq from '../../public/faq/faq.png';
import leafLeft from '../../public/faq/leaf-left.png';
import leafRight from '../../public/faq/leaf-right.png';
import leafTop from '../../public/faq/leaf-top.png';
import HeadingMF from '../components/HeadingMF';
import Nav from '../components/Nav';

const questions = [
  {
    question: <>What is The Assets Club?</>,
    answer: (
      <>
        The Assets Club are unique Non-fungible ERC-721-A tokens created on Ethereum blockchain. Assets are an early
        access p-ASS.{' '}
      </>
    ),
  },
  {
    question: <>Is this a «profile picture project»?</>,
    answer: (
      <>
        It was not designed to be. Please be careful when using it as profile picture on social networks like twitter,
        the algorithm does not like overly naked assets.
      </>
    ),
  },
  {
    question: <>How many Assets are there going to be?</>,
    answer: <>There will be 5’777 unique and randomly generated assets. </>,
  },
  {
    question: <>Do each Asset looks different?</>,
    answer: <>All of them are unique. We have more than 25 different asset shapes!</>,
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
    question: <>What is the price of an Asset?</>,
    answer: (
      <Stack gap={1}>
        <Text>Private sale: 1 Free NFT per wallet and 1 optional NFT for paid. Price TBA. (Less than 100$).</Text>
        <Text>Public sale: Price TBA. (If there is a public sale).</Text>
        <Text>
          Please keep in mind that additional cost will occur because of transaction fees on the Ethereum blockchain.
        </Text>
      </Stack>
    ),
  },
  {
    question: <>How will The Assets Club funds be used?</>,
    answer: (
      <>
        45% of the primary sale + 100% of the 5.5% secondary sales royalties contributed towards building out Inspirata.
        55% of the primary sale will be used to pay the team.
      </>
    ),
  },
  {
    question: <>How can I get on the Asset List?</>,
    answer: (
      <>
        We frequently offer spots to our community and genuine people on Twitter/Discord. There will be raffles and it
        will also be possible to apply through a form.
      </>
    ),
  },
  {
    question: <>Do you have OG role?</>,
    answer: (
      <>
        We have a limited number of « Original Asset » roles for those who wish to be more closely involved in this
        journey. If you wish to apply, please send an application containing your presentation socials and references
        to: contact@theassets.club
      </>
    ),
  },
  {
    question: <>What are the benefits of owning an Asset NFT?</>,
    answer: (
      <>
        We really want to recognize our early supporters and community members. Owning Assets means you&apos;re one of
        them. You will have priority access to our future project: Inspirata. Holding multiple Assets NFTs entitles you
        to something that has not yet been disclosed.
      </>
    ),
  },
  {
    question: <>When can I mint Assets?</>,
    answer: <>To be announced.</>,
  },
  {
    question: <>Which wallets are supported for minting?</>,
    answer: <>You will be able to mint with any wallet supported by Wallet Connect, including MetaMask.</>,
  },
  {
    question: <>Will the mint list spots be over-allocated?</>,
    answer: <>Yes, slightly over-allocated.</>,
  },
  {
    question: <>When reveal?</>,
    answer: <>TBA.</>,
  },
  {
    question: <>Smart contract released?</>,
    answer: <>Written, not public yet.</>,
  },
  {
    question: <>Token $ASS?</>,
    answer: (
      <>
        Not planned, yet plausible. For any tokenomics, we will publish a white-paper first and If there is one, we’ll
        make sure any token we come out with would adhere to regulations and be sustainable in our ecosystem.
      </>
    ),
  },
  {
    question: <>Do you have a DAO?</>,
    answer: <>No, we do not have a DAO, and it is not currently on our agenda.</>,
  },
  {
    question: <>Do you have lands?</>,
    answer: <>No, we do not offer lands, and land is not on our agenda.</>,
  },
  {
    question: <>What intellectual property rights do Asset holders receive?</>,
    answer: (
      <>
        Do whatever you want with your assets, you have every right to it. Full commercial art rights for the Asset NFT
        token you own.
      </>
    ),
  },
  {
    question: <>Laws, lawyers?</>,
    answer: (
      <>
        We’ll be closely working with lawyers on our legal, regulatory and tax strategy for our holders benefits. Laws
        around the world are catching up to the web3 innovation.
      </>
    ),
  },
  {
    question: <>What is the value of this NFT?</>,
    answer: <>This collection is first an artistic creation. The value of an Asset is what someone will pay for it.</>,
  },
  {
    question: <>Last butt not least.</>,
    answer: (
      <>
        Remember we will never do &ldquo;Stealth Mints&rdquo; or &ldquo;Surprise Drops&rdquo;. We will always announce
        events weeks ahead and only through official channels. The team, mods and bots will never DM you and if you have
        been contacted, they are 100% impersonators/imposters
      </>
    ),
  },
];

const FAQPage: NextPage = () => {
  return (
    <Box position="relative" color="white" bgColor="#1c201f" py={32}>
      <Nav position="fixed" top={0} left={0} right={0} zIndex={100} />

      {/* Decorations */}
      <Image
        src={leafTop}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '30%',
          zIndex: 0,
        }}
      />
      <Image
        src={leafLeft}
        alt=""
        style={{
          position: 'absolute',
          top: '20vh',
          left: 0,
          maxWidth: '30%',
          zIndex: 0,
        }}
      />
      <Image
        src={leafRight}
        alt=""
        style={{
          position: 'absolute',
          top: '20vh',
          right: 0,
          maxWidth: '30%',
          zIndex: 0,
        }}
      />

      <Box position="relative" zIndex={1}>
        <Box w={{ base: '60%', md: '20%' }} mx="auto" mb={16}>
          <Image src={faq} alt="FAQ text logo" />
        </Box>

        <Container
          maxW={{ base: 'calc(100% - 32px)', md: '100ch' }}
          mx={{ base: 4, md: 'auto' }}
          my={16}
          px={{ base: 8, md: 16 }}
          py={{ base: 4, md: 8 }}
          textAlign="center"
          bgColor="#131716"
          borderRadius={8}
        >
          <HeadingMF as="h1" fontSize="6xl" mb={6}>
            Frequently assked questions
          </HeadingMF>
          <Heading as="h2" fontSize="2xl" mb={6}>
            What is a non-fungible token (NFT)?
          </Heading>

          <Text lineHeight={1.8}>
            NFT stands for &lsquo;Non-fungible token&rsquo;, which means that it&apos;s a unique digital item with
            blockchain-managed ownership that users can buy, own, and trade. Some NFT&apos;s fundamental function is to
            be digital art.
            <br /> But they can also offer additional benefits like exclusive access to websites, event tickets, and
            ownership records. NFTs can be used to represent easily-reproducible items such as photos, videos, audio,
            and other types of digital files as unique items. NFTs use blockchain technology to establish a verified and
            public proof of ownership. Stay safe, always do your own research.
          </Text>
        </Container>

        <Container maxW="80ch">
          <Accordion allowToggle borderColor="#555d5b">
            {questions.map((q, i) => (
              <AccordionItem key={i}>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {q.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>{q.answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Box>
    </Box>
  );
};

export default FAQPage;
