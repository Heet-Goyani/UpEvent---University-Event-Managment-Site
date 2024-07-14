export const handleDate = (date, format) => {
    if (date === undefined || date === null) return null;
    const d = new Date(date);
    if(format == 1){
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else {
        return d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
};

export const handleTime = (timeString, format) => {
    if (timeString === undefined || timeString === null) return null;

    if(format == 1) {
        const date =  new Date(timeString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    } else {
        const time = new Date(`2022-01-01T${timeString}`);
        const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
        return formattedTime;
    }
};

export const mergeDateAndTime = (dateString, timeString) => {
    const date = new Date(dateString);

    const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = timeString.replace(/:/g, '');

    return `${formattedDate}T${formattedTime}`;
};
