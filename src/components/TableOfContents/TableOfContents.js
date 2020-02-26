// @flow strict
import React from 'react';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import Menu from './Menu';
import styles from './TableOfContents.module.scss';
import { useSiteMetadata } from '../../hooks';

type Props = {
  post?: Node,
};

const TableOfContents = ({ post }: Props) => {
  const { tableOfContents } = post;

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Menu menu={tableOfContents} />
      </div>
    </div>
  );
};

export default TableOfContents;


