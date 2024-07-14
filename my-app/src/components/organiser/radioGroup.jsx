import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: 'var(--primary-700)',
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: 'rgba(120, 72, 244, 0.1)',
                    },
                    '&.Mui-checked': {
                        color: 'var(--primary-700)',
                    },
                },
            },
        },
    },
});

export default function RowRadioButtonsGroup({ value, setValue }) {
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <ThemeProvider theme={theme}>
            <FormControl style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <FormLabel id="demo-row-radio-buttons-group-label" className='mb-0'>Available:</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                    className='w-100'
                >
                    <FormControlLabel className='m-0 ml-2' value="Online" control={<Radio />} label="Online" />
                    <FormControlLabel className='m-0 ml-2' value="Offline" control={<Radio />} label="Offline" />
                </RadioGroup>
            </FormControl>
        </ThemeProvider>
    );
}
