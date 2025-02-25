'use client';

import { useRouter } from 'next/navigation';

import { Tabbar } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';

import { useState } from "react";
import { Camera, CircleUser, Vote, Medal, Send } from 'lucide-react';

const tabs = [
  {
    id: 1,
    text: 'Home',
    Icon: <Vote />,
    url: ''
  },
  {
    id: 2,
    text: 'Camera',
    Icon: <Camera />,
    url: 'theme-params'
  },
  {
    id: 3,
    text: 'Ranking',
    Icon: <Medal />,
    url: 'theme-params'
  },
  {
    id: 4,
    text: 'Profile',
    Icon: <CircleUser />,
    url: 'theme-params'
  },
]

export default function Footer() {
  const t = useTranslations('i18n');
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const router = useRouter();

  function changePage(id:number) {
    setCurrentTab(id)
    router.push('/'+tabs.find(x => x.id === id)?.url)  
  }

  return (
    <Tabbar>
    {tabs.map(({
    id,
    text,
    Icon
    }) => <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={() => changePage(id)}>
        {Icon}
        </Tabbar.Item>)}
    </Tabbar>
  );
}
