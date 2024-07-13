import { API } from "../../apis";
import { handleTime } from "../common/format";
import { isValidUrl } from "../common/validateField";
import { imageUpload } from "./createEvent";

export const updateEvent = async(id, organiserToken, event) => {
    try {
        const date = new Date(event.date).toISOString();
        const time = handleTime(event.time, 1);
        const imageUrl = await newImageUpload(event.coverImage);

        const response = await fetch(`${API.BASE_URL}${API.UPDATE_EVENT}/${id}`, {
            method: 'PATCH',
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
        });

        const data = await response.json();
        return data;
    } catch(error) {
        console.log('Error in updating Event: ', error);
        throw new Error(error);
    }
};

const newImageUpload = async (image) => {
    try {
        let imageUrl = image;
        if (!isValidUrl(image)) {
            console.log('Uploading Image on Cloudinary');
            imageUrl = await imageUpload(image);
        }

        return imageUrl;
    } catch (err) {
        console.log('Error in uploading image: ', err);
        throw new Error(err);
    }
};