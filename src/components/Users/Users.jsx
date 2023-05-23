import * as React from 'react';
import { Box, CircularProgress, InputLabel, Typography } from '@mui/material';
import { useEffect } from 'react';

import logo from '../../assets/photo-cover.svg';

import styles from './Users.module.scss';
import User from './User';

export const Users = ({ isUsersLoading, fetchUsersNextPage, users }) => {

   return (
      <section id='users' className='container'>
         <h2 className={styles.header}>Working with GET request</h2>
         <div className={styles.users}>
            {users.map((props) => <User key={props.id} {...props} />)}
         </div>
         {isUsersLoading && (
            <div className={styles.loading}>
               <CircularProgress />
            </div>)
         }
         <button className={`${styles.more} mainButton`} onClick={fetchUsersNextPage}>
            Show more
         </button>
      </section>
   );
};
