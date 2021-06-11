import api from 'apisauce';
import config from '../Config';

export const fileUpload = async (filelist, token) => {
  // const instance = api.create({
  //   baseURL: config.API_URL,
  //   headers: {
  //     authorization: token,
  //   },
  // });
  console.log('FILELIST', filelist);

  let formData = new FormData();

  const fle = await fetch(filelist[0].path);
  const image = await fle.blob();
  const F = new File([image], 'hello');
  console.log('FFFFFFFFFF', F);
  console.log('IMAGEEEEEEEEEEEEEEEEEEE', image);

  formData.append('files', {
    uri: filelist[0].path,
    mimeType: filelist[0].mime,
    name: 'image.jpg',
  });

  // for (const file of filelist) {
  //   const fle = await fetch(file.path);
  //   const image = await fle.blob();
  //   console.log('IMAGEEEEEEEEEEEEEEEEEEE', image);
  //   formData.append('files', image);
  // }
  console.log('FORMMMMMMMDATAAAAAAAAA', formData);

  // let response = await instance.post('/file/upload', formData);
  let response = await fetch(
    'https://workernetwork8848.herokuapp.com/s/api/v1/file/upload',
    {
      method: 'POST',
      body: formData,
      headers: {
        // 'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return response;
};
