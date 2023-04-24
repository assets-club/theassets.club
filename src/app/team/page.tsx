import { Metadata } from 'next';
import { FC } from 'react';
import TeamPageClient from '@/app/team/page.client';

export const metadata: Metadata = {
  title: 'Team',
};

const TeamPage: FC = () => {
  return <TeamPageClient />;
};

export default TeamPage;
