import React from 'react'
import { TextField } from '@material-ui/core'

const TextInput = ({ input, id, name, label, helperText, meta: {touched, error}, ...rest}) => {
    return (
        <TextField
            {...input}
            id={id}
            variant="outlined"
            margin="normal"
            fullWidth
            label={label}
            name={name}
            autoFocus
            error={touched && !!error}
            helperText={touched && !!error && helperText}
          />
    )
}

export default TextInput;
