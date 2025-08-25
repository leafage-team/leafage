import React from 'react';
import { Helmet } from 'leafage/component';

import styles from './style.module.scss';

const HomePage = () => (
  <>
    <Helmet>
      <title>home title</title>
    </Helmet>
    <div className={styles.container}>HomePage</div>
  </>
);

export default HomePage;
