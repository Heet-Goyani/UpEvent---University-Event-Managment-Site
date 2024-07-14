import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const genreList = ["Technical", "Cultural", "Sports", "Educational", "Social", "Business", "Health and Wellness", "Charity", "Others"];

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

const Dropdown = ({ value, setValue }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                style={{ marginRight: '10px' }}
                sx={{ '& > :not(style)': { mt: 1, minWidth: 0, width: '100%' } }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    select
                    label="Select Option"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    variant="outlined"
                    fullWidth
                >
                {
                    genreList.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))
                }
                </TextField>
            </Box>
        </ThemeProvider>
    );
};

export default Dropdown;
