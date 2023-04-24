import { Metadata } from 'next';
import { FC } from 'react';
import FAQPageClient from '@/app/faq/page.client';

export const metadata: Metadata = {
  title: 'FAQ',
};

const FAQPage: FC = () => {
  return <FAQPageClient />;
};

export default FAQPage;
