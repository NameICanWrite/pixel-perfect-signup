import SuccessImage from '../../../assets/success-image.svg';

import styles from './SignUpSuccess.module.scss';

export const SuccessMessage = () => (
   <div className={styles.signUpSuccess}>
      <p className={styles.signUpSuccess__message}>
         User successfully registered
      </p>
      <div className={styles.signUpSuccess__image}>
         <img src={SuccessImage} alt="worker succesfully send a file" />
      </div>
   </div>
);
