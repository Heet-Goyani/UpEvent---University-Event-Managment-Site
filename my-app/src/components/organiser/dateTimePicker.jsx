import * as React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiFormControl: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'var(--primary-700)',
                    },
                    '& .MuiFormLabel-root.Mui-focused': {
                        color: 'var(--primary-700)',
                    },
                },
            },
        },
    },
});

export default function DateTimePickers({ dateValue, setDateValue, timeValue, setTimeValue, dateRequired, timeRequired }) {
    const handleDateChange = (value) => {
        setDateValue(value);
    };

    const handleTimeChange = (value) => {
        setTimeValue(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="details-row">
                <DatePicker
                    label="Date"
                    value={dateValue}
                    onChange={handleDateChange}
                    slotProps={{
                        textField: {
                            required: dateRequired,
                            sx: { '& > :not(style)': { mr: 1, minWidth: 0, maxWidth: '100%' } }
                        }
                    }}
                />
                <TimePicker
                    label="Time"
                    value={timeValue}
                    onChange={handleTimeChange}
                    slotProps={{
                        textField: {
                            required: timeRequired,
                            sx: { '& > :not(style)': { mr: 1, minWidth: 0, maxWidth: '100%' } }
                        }
                    }}
                />
            </div>
        </ThemeProvider>
    );
}
