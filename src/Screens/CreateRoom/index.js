import React, {useState, useEffect} from 'react';

import IntroAboutTheRoomComponent from '../../Components/CreateRoomComponents/IntroAboutTheRoomComponent';
import LocationInputComponent from '../../Components/CreateRoomComponents/LocationInputComponent';
import ShowAllInformationComponent from '../../Components/CreateRoomComponents/ShowAllInformationComponent';
import UploadImagesComponent from '../../Components/CreateRoomComponents/UploadImagesComponent';
import {CreateRoomProvider} from '../../context/createRoomContext';
import {getLoginCredentials} from '../../Services/Keychain';

const CreateRoom = () => {
  const [steps, setSteps] = useState(1);
  const [token, setToken] = useState(null);

  useEffect(() => {
    getLoginCredentials()
      .then((data) => {
        setToken(data.password);
      })
      .catch(() => {
        return;
      });

    return () => {
      setSteps(1);
    };
  }, []);

  return (
    <CreateRoomProvider>
      {steps === 1 && <IntroAboutTheRoomComponent setSteps={setSteps} />}
      {steps === 2 && <LocationInputComponent setSteps={setSteps} />}
      {steps === 3 && <UploadImagesComponent setSteps={setSteps} />}
      {steps === 4 && (
        <ShowAllInformationComponent setSteps={setSteps} token={token} />
      )}
    </CreateRoomProvider>
  );
};

export default CreateRoom;
