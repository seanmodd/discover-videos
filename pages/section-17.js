import { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Banner from '../components/banner/banner';
import NavBar from '../components/nav/navbar';

import SectionCards from '../components/card/section-cards';

import { getVideos, getPopularVideos } from '../lib/videos';
import { startFetchMyQuery } from '../lib/db/hasura';

export async function getServerSideProps(context) {
  const disneyVideos = await getVideos('disney trailer');
  const productivityVideos = await getVideos('Productivity');

  const travelVideos = await getVideos('indie music');

  const popularVideos = await getPopularVideos();
  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
    },
  };
}

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  startFetchMyQuery();
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar username="ankita@ank.com" />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
        />

        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
}
