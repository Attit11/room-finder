/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Image} from 'react-native';
import {ButtonX, Section} from '../../Components';
import ImagePicker from 'react-native-image-crop-picker';
import CreateRoomContext from '../../context/createRoomContext';

const UploadImagesComponent = ({setSteps}) => {
  const {createRoomFormData, setCreateRoomFormData} = useContext(
    CreateRoomContext,
  );
  return (
    <View>
      {createRoomFormData.images !== null && (
        <Section
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {createRoomFormData.images.map((image, i) => {
            console.log('PATHHHHHHHH', image);
            return (
              <Image
                key={i}
                style={{height: 100, width: 100, margin: 5}}
                source={{uri: image.path}}
              />
            );
          })}
        </Section>
      )}
      <Section>
        <ButtonX
          label="Pick Images"
          onPress={() => {
            ImagePicker.openPicker({
              multiple: true,
            }).then((images) => {
              setCreateRoomFormData((prev) => {
                return {...prev, images: images};
              });
            });
          }}
        />
        {createRoomFormData.images !== null && (
          <ButtonX
            label="Next Step"
            onPress={() => {
              setSteps(4);
            }}
          />
        )}
      </Section>
    </View>
  );
};

export default UploadImagesComponent;
