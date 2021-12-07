import axios from 'axios';
import { ServerBase } from '../globals/globals';
import { getAuthToken } from '../api/async_storage';

export const send_post_request = async (url,body,auth=true) => {
  try {
    var config = {}
    if (auth) {
      const token = await getAuthToken();
      config = {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      };
    }
    
    const {data} = await axios.post(`${ServerBase}/${url}`,body,config);
    return data;
  } catch (err) {
    console.log('POST request failed:',err)
    return undefined;
  }
}
