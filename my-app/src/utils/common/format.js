export const handleDate = (date, format) => {
    if (date === undefined || date === null) return null;
    const d = new Date(date);
    if(format == 1){
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else {
        return d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
};

export const handleTime = (timeString) => {
    if (timeString === undefined || timeString === null) return null;

    const time = new Date(`2022-01-01T${timeString}`);
    const formattedTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return formattedTime;
};