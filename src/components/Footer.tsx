'use client';

import { Tabbar } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';

import { useState } from "react";
import { Camera, CircleUser, Vote, Medal, Send } from 'lucide-react';

const tabs = [
  {
    id: 1,
    text: 'Home',
    Icon: <Vote />
  },
  {
    id: 2,
    text: 'Camera',
    Icon: <Camera />
  },
  {
    id: 3,
    text: 'Ranking',
    Icon: <Medal />
  },
  {
    id: 4,
    text: 'Profile',
    Icon: <CircleUser />
  },
]

export default function Footer() {
  const t = useTranslations('i18n');
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
    <Tabbar>
    {tabs.map(({
    id,
    text,
    Icon
    }) => <Tabbar.Item key={id} text={text} selected={id === currentTab} onClick={() => setCurrentTab(id)}>
        {Icon}
        </Tabbar.Item>)}
    </Tabbar>
  );
}
