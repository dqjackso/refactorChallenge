import { convertData } from './upload-helper';
import Publisher from './data-publisher';
import Messenger from './messaging-wrapper';

const base64FormatCheck = (base64: string) => {
    return typeof base64 === 'string'
}

export const handleData = async (DeviceID: string, sessionsData: any) => {
    for (const val in await sessionsData) {
        const sessions = await sessionsData[val];
        const events = await sessions.Events;
        for (const item in await events) {
            const eventsObj = await events[item];
            const detailsObj = await eventsObj.Details;
            let imageBase64 = await detailsObj.imageMedia;
            if (imageBase64 !== null && await base64FormatCheck(imageBase64) === true) {
                const imageData = {
                    Key: `${DeviceID}/${sessions.StartTime}_${sessions.EndTime}.png`,
                    Body: imageBase64,
                    ContentEncoding: 'base64',
                    ContentType: 'image/png'
                };
                imageBase64 = await Promise.resolve(convertData(imageData));
                detailsObj.imageMedia = imageBase64.Body;
            }

            let videoBase64 = await detailsObj.videoMedia;
            if (videoBase64 !== null && await base64FormatCheck(videoBase64) === true) {
                const videoData = {
                    Key: `${DeviceID}/${sessions.StartTime}_${sessions.EndTime}}.mp4`,
                    Body: videoBase64,
                    ContentEncoding: 'base64',
                    ContentType: 'video/mp4'
                };
                videoBase64 = await Promise.resolve(convertData(videoData));
                detailsObj.videoMedia = videoBase64.Body;
            }
        }
    }
    try {
        const decodedDataEvent = await new Publisher(Messenger.client);
        await Promise.resolve(decodedDataEvent.publish({ DeviceID, sessionsData }));
    } catch {
        console.log('That was an error. Me no happy.')
    }
};