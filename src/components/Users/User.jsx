import React from 'react'
import styles from './Users.module.scss';
import { InputLabel } from '@mui/material';

export default function User({ id, name, phone, photo, position, email }) {
  return (
    <li className={styles.users__container}>
      <div className={styles.users__avatar}>
        <img src={photo || logo} alt='user' />
      </div>
      <p className={styles.users__name}>{name}</p>
      <div>
        <p className={styles.users__position}>{position}</p>
        <p className={`${styles.users__email} tooltip`}>
          <InputLabel>{email}</InputLabel>
          <span className='tooltipContent'>{email}{' '}</span>
        </p>
        <p className={styles.users__phone}>{phone}</p>
      </div>
    </li>
  )
}
