const { promisify } = require('util');
const sleep = promisify(setTimeout);
const _ = require('underscore')
import { result } from './final';

export default class Publisher {
    client: object;

    constructor(client: object) {
        this.client = client;
    }

    publish(data: object) {
        sleep(500)
        console.log(`Final payload correct? ${_.isEqual(data, result)}`);
    }
}