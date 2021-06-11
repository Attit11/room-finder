import {authenticatedInstance, unauthenticatedInstance} from './instance';

export const fileUpload = (filelist, authenticated) => {
  let instance = null;
  if (authenticated) {
    instance = authenticatedInstance;
  } else {
    instance = unauthenticatedInstance;
  }
  let formData = new FormData();
  filelist.forEach((file) => {
    formData.append('files', file);
  });
  return instance.post('/file/upload', formData);
};
