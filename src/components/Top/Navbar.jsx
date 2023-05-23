import React from 'react'


import styles from './Top.module.scss';
import logo from '../../assets/Logo.svg';
import { useScrollToAnchor } from '../../utils/useScrollToAnchor.hook';

function Navbar({isSignUpSuccess}) {
  
  const scrollToAnchor = useScrollToAnchor()
  return (
    <div id="top" className={styles.nav}>
      <div className={styles.nav__container}>
          <div className={styles.nav__logo}>
            <a href="#top">
                <img src={logo} alt="logo" />
            </a>
          </div>
          <div className={styles.nav__navigation}>
            <button className={'mainButton'} onClick={() => scrollToAnchor('users')}>Users</button>
            {!isSignUpSuccess && <button className={'mainButton'} onClick={() => {scrollToAnchor('register')}}>Sign up</button>}
          </div>
      </div>
    </div>
  )
}

export default Navbar