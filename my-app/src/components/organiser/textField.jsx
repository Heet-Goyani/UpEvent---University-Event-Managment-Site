import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// validation
import { validateField } from '../../utils/common/validateField';

export default function BasicTextFields({ label, required, multiline, value, setValue, disabled }) {
    const [error, setError] = React.useState(false);

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& label.Mui-focused': {
                            color: 'var(--primary-700)',
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-focused fieldset': {
                                borderColor: 'var(--primary-700)',
                            },
                            '& textarea': {
                                '&:focus': {
                                    outline: 'none',
                                    border: 'none',
                                    boxShadow: 'none',
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    const handleChange = (e) => {
        const { value } = e.target;
        setValue(value);
        setError(Boolean(validateField(label, value)));
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                style={{ marginRight: '10px' }}
                sx={{ '& > :not(style)': { mt: 1, minWidth: 0, width: '100%' } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    id={label}
                    label={label}
                    value={value}
                    onChange={handleChange}
                    error={error}
                    variant="outlined"
                    required={required}
                    multiline={multiline}
                    rows={5}
                    disabled={disabled}
                    fullWidth
                />
            </Box>
        </ThemeProvider>
    );
}
