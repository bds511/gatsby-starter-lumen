// @flow strict
import React from 'react';
import moment from 'moment';
import styles from './Meta.module.scss';
moment.locale();
type Props = {
  date: string
};

const Meta = ({ date }: Props) => (
  <div className={styles['meta']}>
    <p className={styles['meta__date']}>Published {moment(date).format('YYYY/MM/DD HH:mm')}</p>
  </div>
);

export default Meta;
