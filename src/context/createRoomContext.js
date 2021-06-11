import React, {useState, createContext} from 'react';

const CreateRoomContext = createContext();

const CreateRoomProvider = ({children}) => {
  const [createRoomFormData, setCreateRoomFormData] = useState({
    title: null,
    description: null,
    rate: null,
    location: null,
    images: null,
  });

  const {steps, setSteps} = useState(1);

  return (
    <CreateRoomContext.Provider
      value={{createRoomFormData, setCreateRoomFormData, steps, setSteps}}>
      {children}
    </CreateRoomContext.Provider>
  );
};

export default CreateRoomContext;

export {CreateRoomProvider};
