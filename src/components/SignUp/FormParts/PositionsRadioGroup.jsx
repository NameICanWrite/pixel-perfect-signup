import React from 'react'
import {
   FormControl,
   FormControlLabel,
   FormLabel,
   RadioGroup,
} from '@mui/material';
import styles from '../SignUp.module.scss';
import { CustomRadioButton } from '../../mui/RadioButton';

export default function PositionsRadioGroup({positions}) {
  return (
    <div className={styles.positionsRadioGroup}>
      <FormControl>
        <FormLabel focused={false} className={styles.positionsRadioGroup__title}>
          Select your position
        </FormLabel>
        <RadioGroup defaultValue={1} name="radio-buttons-group">
          {positions.map((position) =>
            <FormControlLabel
              className={styles.positionsRadioGroup__position}
              name='userPosition'
              value={position.id}
              key={position.id}
              control={<CustomRadioButton />}
              label={position.name}
            />
          )}
        </RadioGroup>
      </FormControl>
    </div>
  )
}
