import { JSX, SVGProps } from 'react';

import {
  ContributionsIcon,
  HomeIcon,
  SettingsIcon,
  SupportIcon,
  WalletsIcon,
} from '@/components/icons';

export type TSidebarItems = {
  url: string;
  label: string;
  icon: ({ width, height, color }: SVGProps<SVGSVGElement>) => JSX.Element;
};

export const SIDEBAR_ITEMS: TSidebarItems[] = [
  {
    icon: HomeIcon,
    label: 'Overview',
    url: '/dashboard',
  },
  {
    icon: ContributionsIcon,
    label: 'Contributions',
    url: '/dashboard/contributions',
  },
  {
    icon: WalletsIcon,
    label: 'Wallets',
    url: '/dashboard/wallets',
  },
  {
    icon: SupportIcon,
    label: 'Support',
    url: '/dashboard/support',
  },

  {
    icon: SettingsIcon,
    label: 'Settings',
    url: '/dashboard/settings',
  },
];
