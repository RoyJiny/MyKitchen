import axios from 'axios';

export const remote_log = (text,server) => {
    axios.post(`${server}/log`,{
        app: 'MyKitchen',
        text: text
    })
    .then(() => {})
    .catch((err) => {});
}