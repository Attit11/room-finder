import api from 'apisauce';
import config from '../Config';

export const fileUpload = async (filelist, token) => {
  let formData = new FormData();
  formData.append('files', {
    uri: filelist[0].path,
    type: filelist[0].mime,
    name: 'asdf.jpg',
  });

  let response = await fetch(
    'https://workernetwork8848.herokuapp.com/s/api/v1/file/upload',
    {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data', // this is important
      },
    },
  );
  const resp = await response.json();
  return resp;
};
