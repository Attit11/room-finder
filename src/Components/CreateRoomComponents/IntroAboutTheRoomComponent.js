/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Text} from 'react-native';
import CreateRoomContext from '../../context/createRoomContext';
import {Section, Container, InputX, ButtonX} from '../../Components';
import Fonts from '../../Themes/Fonts';
import LoadingActionContainer from '../LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import {showInfoToast} from '../../Lib/Toast';

const IntroAboutTheRoomComponent = ({setSteps}) => {
  const {theme} = useAppTheme();

  const {createRoomFormData, setCreateRoomFormData} = useContext(
    CreateRoomContext,
  );
  return (
    <Container>
      <LoadingActionContainer>
        <Section>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontFamily: Fonts.type.bold,
              color: theme.colors.primaryText,
            }}>
            CREATE ROOM
          </Text>
        </Section>
        <Section>
          <InputX
            label="TITLE"
            mode="outlined"
            style={{backgroundColor: '#fafafa'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            onChangeText={(text) =>
              setCreateRoomFormData((prev) => {
                return {...prev, title: text};
              })
            }
            value={createRoomFormData.title}
          />
          <InputX
            label="DESCRIPTION"
            mode="outlined"
            style={{backgroundColor: '#fafafa'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            onChangeText={(text) =>
              setCreateRoomFormData((prev) => {
                return {...prev, description: text};
              })
            }
            value={createRoomFormData.description}
          />
          <InputX
            keyboardType="numeric"
            label="RATE"
            mode="outlined"
            style={{backgroundColor: '#fafafa'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            onChangeText={(text) =>
              setCreateRoomFormData((prev) => {
                return {...prev, rate: text};
              })
            }
            value={createRoomFormData.rate}
          />
        </Section>
        <Section>
          <ButtonX
            dark={true}
            onPress={() => {
              if (
                !createRoomFormData.title ||
                !createRoomFormData.description ||
                !createRoomFormData.rate
              ) {
                return showInfoToast('Every Fields are mandatory!');
              }
              setSteps(2);
            }}
            label="Next Step"
          />
        </Section>
      </LoadingActionContainer>
    </Container>
  );
};

export default IntroAboutTheRoomComponent;
