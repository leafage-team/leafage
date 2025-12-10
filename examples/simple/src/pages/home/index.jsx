import React from 'react';
import { Head } from 'leafage/component';

import styles from './style.module.scss';

const HomePage = () => (
  <>
    <Head>
      <title>home title</title>
    </Head>
    <div className={styles.container}>HomePage</div>
  </>
);

export default HomePage;
