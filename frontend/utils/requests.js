import axios from 'axios';
import { Alert } from 'react-native';

import { ServerBase } from '../globals/globals';
import { getAuthToken } from '../api/async_storage';

export const send_post_request = async (url,body,auth=true,additional_headers={}) => {
  try {
    var config = {}
    if (auth) {
      const token = await getAuthToken();
      config = {
        headers: {
          ...additional_headers,
          "Authorization": `Bearer ${token}`
        }
      };
    }
    const res = await axios.post(`${ServerBase}/${url}`,body,config);
    if (res.status >= 300) throw new Error("Bad status code:",res.status);
    return res.data;
  } catch (err) {
    console.log('POST request failed:',err)
    return undefined;
  }
}

export const send_get_request = async (url,auth=true,additional_headers={}) => {
  try {
    var config = {}
    if (auth) {
      const token = await getAuthToken();
      config = {
        headers: {
          ...additional_headers,
          "Authorization": `Bearer ${token}`
        }
      };
    }    
    const res = await axios.get(`${ServerBase}/${url}`,config);
    if (res.status >= 300) throw new Error("Bad status code:",res.status);
    return res.data;
  } catch (err) {
    console.log('POST request failed:',err)
    return undefined;
  }
}

export const upload_image = async (image,type,kitchenId,dishId=undefined) => {
  const data = new FormData();
  data.append('type',type);
  data.append('kitchenId',kitchenId);
  if (dishId) data.append('dishId',dishId);
  data.append('img',{
    name: 'cover',
    type: 'image/jpg',
    uri: image
  });
  return send_post_request('upload',data,true,{"Content-Type": "multipart/form-data"});
}
