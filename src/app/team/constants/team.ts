import adrien from '@/public/team/adrien.png';
import johann from '@/public/team/johann.png';
import kali from '@/public/team/kali.png';
import lymnah from '@/public/team/lymnah.png';
import marc from '@/public/team/marc.png';
import mathieu from '@/public/team/mathieu.png';
import mawuli from '@/public/team/mawuli.png';
import { TeamCardProps } from '../components/TeamCard';

const team: TeamCardProps[] = [
  {
    name: 'Johann P. (Sélwat)',
    image: johann,
    title: 'Co-founder / CPO / Creative Director / Film director',
    twitter: 'selwatisback',
    instagram: 'selwat',
  },
  {
    name: 'Adrien P. (Apisler)',
    image: adrien,
    title: 'Co-founder / Lead Artist / Creative Director / Illustrator',
    twitter: 'apisler',
    instagram: 'adrien.pisler',
  },
  {
    name: 'Charly M. (Lymnah)',
    image: lymnah,
    title: 'Co-Founder / Software Engineer',
    twitter: 'lymnah',
    github: 'Lymnah',
  },
  {
    name: 'Mathieu B. (Windyy)',
    image: mathieu,
    title: 'Blockchain Software Engineer',
    twitter: 'mathieu_bour_',
    github: 'mathieu-bour',
  },
  {
    name: 'Mawuli A. (Mawulisan)',
    image: mawuli,
    title: 'Artist / Illustrator',
    twitter: 'amuklumawuli',
    instagram: 'Mawulisan',
  },
  {
    name: 'Marc M. (Mandril)',
    image: marc,
    title: 'Artist / Illustrator / Professor / Art Historian',
    twitter: 'mandrilmarc',
    instagram: 'la_mandr',
  },
  {
    name: 'Kali A.',
    image: kali,
    title: 'Student / Apprentice',
    twitter: 'kaliataripsni',
  },
];

export default team;
