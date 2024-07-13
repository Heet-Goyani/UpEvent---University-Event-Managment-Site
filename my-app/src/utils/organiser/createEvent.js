import { API } from '../../apis';
import { handleTime } from '../common/format';

export const createEvent = async (event, organiserToken) => {
    try {
        const date = new Date(event.date).toISOString();
        const time = handleTime(event.time, 1);
        const imageUrl = await imageUpload(event.coverImage);

        const response = await fetch(`${API.BASE_URL}${API.CREATE_EVENT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${organiserToken}`
            },
            body: JSON.stringify({
                name: event.eventName,
                description: event.description,
                genre: event.genre,
                date: date,
                time: time,
                available: event.available,
                venue: event.venue,
                coverImage: imageUrl,
                reachUsAt: event.reachUsAt.length > 0 ? event.reachUsAt : null,
                meetLink: event.meetLink.length > 0 ? event.meetLink : null,
                facebook: event.facebook.length > 0 ? event.facebook : null,
                instagram: event.instagram.length > 0 ? event.instagram : null,
                twitter: event.twitter.length > 0 ? event.twitter : null,
                linkedin: event.linkedin.length > 0 ? event.linkedin : null,
            })
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const imageUpload = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: data,
        });

        const file = await response.json();
        return file.url;
    } catch (error) {
        console.error(error);
        return null;
    }
};
