'use client';

import { useTranslations } from 'next-intl';
import { Page } from '@/components/Page';
import PostsComponent from '@/components/Posts'

export default function Home() {
  const t = useTranslations('i18n');

  return (
    <Page back={false}>
{/*      <CameraComponent /> */}
      <PostsComponent />

    </Page>
  );
}
