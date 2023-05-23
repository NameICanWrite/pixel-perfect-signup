import * as React from 'react';
import * as Yup from 'yup'



import styles from './SignUp.module.scss';
import { useFormik } from 'formik';
import TextFields from './FormParts/TextFields';
import PositionsRadioGroup from './FormParts/PositionsRadioGroup';
import ImageUpload from './FormParts/ImageUpload';

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

const validationSchema = Yup.object({
   userName: Yup.string().min(2, 'Must be 2 characters or longer').required('Name is required'),
   userEmail: Yup.string().email('Invalid email').matches(emailRegex,"Invalid email").required('Email is required'),
   userPhone: Yup.string().matches(/^\+38\d{10}$/, 'Invalid phone number: only +38 (XXX) XXX-XX-XX').required('Phone number is required'),
   userFile: Yup.mixed().required('Image is required'),
   userPosition: Yup.number().required('Position is required')
 });

export const SignUp = ({registerUser, registrationError, positions}) => {
   

   const formik = useFormik({
      initialValues: {
        userName: '',
        userEmail: '',
        userPhone: '',
        userFile: null,
        userPosition: 1,
      },
      validateOnMount: true,
      validateOnChange: true,
      validationSchema,
      onSubmit: (values) => {
        const formData = new FormData();
        formData.append('name', values.userName);
        formData.append('email', values.userEmail);
        formData.append('phone', values.userPhone);
        formData.append('photo', values.userFile);
        formData.append('position_id', values.userPosition);
        registerUser(formData)
      },
    });



   return (
      <section id='register' className='container'>
         <h3 className={styles.header}>Working with POST request</h3>
         <form className={styles.signUpForm} onSubmit={formik.handleSubmit}>
            <TextFields formik={formik} />
            <PositionsRadioGroup positions={positions} />
            <ImageUpload formik={formik} />
            <input
               type="submit"
               className='mainButton'
               value={'Sign up'}
               disabled={!formik.isValid}
            />
            <p style={{color: 'red', textAlign: 'center', width: '100%'}}>{registrationError}</p>
         </form>
      </section>
   );
};
