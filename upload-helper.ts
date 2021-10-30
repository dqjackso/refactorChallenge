const { promisify } = require('util');
const sleep = promisify(setTimeout);
export const convertData = (data: object) => {
    sleep(1000);
    return { ...data, Body: 'https://new.cdn.url/' }
}