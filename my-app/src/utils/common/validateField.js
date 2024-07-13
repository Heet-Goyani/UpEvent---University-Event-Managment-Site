export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

export const validateField = (label, value) => {
    const normalizedLabel = label.toLowerCase().trim();

    switch (normalizedLabel) {
        case 'eventname':
        case 'event name':
            if (value.length === 0) {
                return 'Event Name is required';
            }
            if(value.length > 25) {
                return 'Event Name should be less than 25 characters';
            }
            break;
        case 'description':
            if (!value) {
                return 'Description is required';
            }
            if (value.length < 300 || value.length > 600) {
                return 'Description length should be between 300 to 600 characters';
            }
            break;
        case 'venue':
            if (value.length === 0) {
                return 'Venue is required';
            }
            break;
        case 'date':
            if (!value) {
                return 'Date is required';
            }
            break;
        case 'time':
            if (!value) {
                return 'Time is required';
            }
            break;
        case 'coverimage':
            if (!value) {
                return 'Cover Image is required';
            }
            break;
        case 'reach us at':
            if (value?.length > 0 && !/\S+@\S+\.\S+/.test(value)) {
                return 'Invalid email address for Reach Us At';
            }
            break;
        case 'meetlink':
        case 'meet link':
        case 'facebook':
        case 'facebook link':
        case 'instagram':
        case 'instagram link':
        case 'linkedin':
        case 'linkedin link':
        case 'twitter':
        case 'twitter link':
            if (value?.length > 0 && !isValidUrl(value)) {
                return `Invalid ${label} URL`;
            }
            break;
        default:
            break;
    }

    return false;
};
