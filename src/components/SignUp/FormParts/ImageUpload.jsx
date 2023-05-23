import React from 'react'

import styles from '../SignUp.module.scss';
import { CustomInputLabel } from '../../mui/InputLabel';
import { CustomOutlinedInput } from '../../mui/OutlinedInput';

export default function ImageUpload({formik}) {
  return (
    <div className={styles.imageUpload}>
      <CustomInputLabel>
        <span>Upload</span>
        <input
          className={styles.imageUpload__fileInput_hidden}
          accept="image/jpg, image/jpeg"
          type="file"
          onChange={(e) => {
            formik.setFieldValue('userFile', e.currentTarget.files[0])
          }}
          required
        />
      </CustomInputLabel>
      <CustomOutlinedInput
        className={styles.imageUpload__desc}
        value={
          formik.values.userFile
            ? getFileName(formik.values.userFile)
            : 'Upload your photo'
        }
      />
    </div>
  )
}
