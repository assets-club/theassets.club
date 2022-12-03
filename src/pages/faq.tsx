import { NextPage } from 'next';
import Image from 'next/future/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import faq from '../../public/faq/faq.png';
import leafLeft from '../../public/faq/leaf-left.png';
import leafRight from '../../public/faq/leaf-right.png';
import leafTop from '../../public/faq/leaf-top.png';
import HeadingMF from '../components/HeadingMF';
import Nav from '../components/Nav';
import { questionsEN, titleEN } from '../constants/faq.en';
import { questionsZH, titleZH } from '../constants/faq.zh';

const languages = {
  en: {
    title: titleEN,
    questions: questionsEN,
  },
  zh: {
    title: titleZH,
    questions: questionsZH,
  },
};

const FAQPage: NextPage = () => {
  const router = useRouter();
  const lang = router.query.lang === 'zh' ? 'zh' : 'en';
  const title = languages[lang].title;
  const questions = languages[lang].questions;

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

        <Flex gap={4} textAlign="center" justifyContent="center" mx="auto">
          <NextLink href="/faq" passHref>
            <Link as={Text} textDecoration="underline" cursor="pointer">
              English
            </Link>
          </NextLink>{' '}
          |{' '}
          <NextLink href="/faq?lang=zh" passHref>
            <Link as={Text} textDecoration="underline" cursor="pointer">
              中文
            </Link>
          </NextLink>
        </Flex>

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
            {title.title}
          </HeadingMF>
          <Heading as="h2" fontSize="2xl" mb={6}>
            {title.question}
          </Heading>

          <Text lineHeight={1.8}>{title.answer}</Text>
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
