import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import toast, { Toaster } from 'react-hot-toast';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function InputFileUpload({ value, setValue }) {
    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const minAspectRatio = 1 / 1;
            const maxAspectRatio = 16 / 9;

            if (aspectRatio < minAspectRatio || aspectRatio > maxAspectRatio) {
                toast.error(`Please upload an image with an aspect ratio between 1:1 and 16:9.`);
                e.target.value = null;
                setValue(null);
            } else {
                setValue(file);
            }
        };
    };

    return (
        <>
            <div><Toaster /></div>
            <Button
                style={{ margin: '20px', backgroundColor: 'var(--primary-700)', color: 'white', padding: '10px', textTransform: 'none' }}
                component="label"
                role={'button'}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                <span>
                    {value ? value.name || value : 'UPLOAD COVER IMAGE'}
                </span>
                <VisuallyHiddenInput
                    type="file"
                    accept=".jpeg,.jpg,.png,.webp"
                    onChange={handleFileInput}
                    multiple={false}
                />
            </Button>
        </>
    );
}
