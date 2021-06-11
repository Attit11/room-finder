import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {Container} from '../../Components';
import CreateRoomContext from '../../context/createRoomContext';
import {Section, ButtonX} from '../../Components';
import {useMutation} from '@apollo/client';
import {CREATE_ROOM_MUTATION} from '../../Apollo/Room/mutations/createRoom';
import {showSuccessToast, showErrorToast} from '../../Lib/Toast';
import {fileUpload} from '../../Api';

const ShowAllInformationComponent = ({setSteps}) => {
  const {createRoomFormData, setCreateRoomFormData} = useContext(
    CreateRoomContext,
  );

  const [createRoomMutation] = useMutation(CREATE_ROOM_MUTATION);

  const createRoom = () => {
    fileUpload(createRoomFormData.images, true)
      .then((data) => {
        createRoomMutation({
          variables: {
            input: {
              input: {
                title: createRoomFormData.title,
                rate: createRoomFormData.rate,
                documents: [data.data.data.url],
                description: createRoomFormData.description,
                location: createRoomFormData.location,
              },
            },
          },
        })
          .then(() => {
            showSuccessToast('Room Created Successfully!');
          })
          .catch((err) => {
            console.log(err);
            showErrorToast('Room Creation Failed');
          });
      })
      .catch((err) => {
        console.log(err);
        showErrorToast('Room Creation Failed');
      });
  };

  return (
    <LoadingActionContainer fixed>
      <Container
        style={{
          padding: 10,
        }}>
        {console.log('CREATE ROOM FORM DATA', createRoomFormData)}
        <Text style={{fontSize: 20, textAlign: 'center', padding: 20}}>
          Details of your room
        </Text>
        <View style={{padding: 20, margin: 10, backgroundColor: 'white'}}>
          <Text style={{fontSize: 18}}>Title: {createRoomFormData.title}</Text>
        </View>
        <View style={{padding: 20, margin: 10, backgroundColor: 'white'}}>
          <Text style={{fontSize: 18}}>Rate: {createRoomFormData.rate}</Text>
        </View>
        <View style={{padding: 20, margin: 10, backgroundColor: 'white'}}>
          <Text style={{fontSize: 18}}>
            Description: {createRoomFormData.description}
          </Text>
        </View>
        <Section
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {createRoomFormData.images.map((image, i) => {
            return (
              <Image
                key={i}
                style={{height: 100, width: 100, margin: 5}}
                source={{uri: image.path}}
              />
            );
          })}
        </Section>
        <Section>
          <ButtonX onPress={createRoom} label="Create Room" />
        </Section>
      </Container>
    </LoadingActionContainer>
  );
};

export default ShowAllInformationComponent;
