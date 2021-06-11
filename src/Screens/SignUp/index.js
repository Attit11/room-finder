/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {Text, Keyboard} from 'react-native';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {STATUS} from '../../Constants';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import {
  Section,
  Container,
  PasswordInputX,
  InputX,
  ButtonX,
} from '../../Components';

import useAppTheme from '../../Themes/Context';
import useAuth from '../../Services/Auth';
import {showInfoToast} from '../../Lib/Toast';
import BottomPanel from '../../Components/Panel';
import Fonts from '../../Themes/Fonts';
import Routes from '../../Navigation/Routes';

export default () => {
  const onChange = useStoreActions(
    (actions) => actions.signUp.onSignUpInputChange,
  );
  const {signUp} = useAuth();
  const {theme} = useAppTheme();

  const inputFirstName = useRef();
  const inputLastName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();

  const panelRef = useRef();

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    status,
  } = useStoreState((signUpState) => ({
    firstName: signUpState.signUp.firstName,
    lastName: signUpState.signUp.lastName,
    email: signUpState.signUp.email,
    password: signUpState.signUp.password,
    status: signUpState.signUp.status,
    confirmPassword: signUpState.signUp.confirmPassword,
  }));

  const signUpUser = async () => {
    Keyboard.dismiss();

    if (!firstName || !password || !lastName || !email || !confirmPassword) {
      return showInfoToast('Every Fields are mandatory!');
    }

    if (password !== confirmPassword) {
      return showInfoToast('Password do not match!');
    }

    signUp({
      firstName,
      lastName,
      email,
      password,
    });
  };

  const loading = status === STATUS.FETCHING;

  return (
    <Container>
      <LoadingActionContainer>
        <Section>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color: theme.colors.primary,
              marginTop: 60,
              fontFamily: Fonts.type.stylish,
              marginBottom: 20,
            }}>
            Sign Up
          </Text>
        </Section>
        {/* <Section>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontFamily: Fonts.type.italic,
              color: theme.colors.primaryText,
            }}>
            Login
          </Text>
        </Section> */}
        <Section>
          <InputX
            label="FIRST NAME"
            // mode="outlined"
            ref={inputFirstName}
            style={{backgroundColor: '#fafafa'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            // onSubmitEditing={onSubmit}
            onChangeText={(text) =>
              onChange({
                key: 'firstName',
                value: text,
              })
            }
            value={firstName}
          />
          <InputX
            label="LAST NAME"
            // mode="outlined"
            ref={inputLastName}
            style={{backgroundColor: '#fafafa'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            // onSubmitEditing={onSubmit}
            onChangeText={(text) =>
              onChange({
                key: 'lastName',
                value: text,
              })
            }
            value={lastName}
          />
          <InputX
            label="EMAIL"
            // mode="outlined"
            ref={inputEmail}
            style={{backgroundColor: '#fafafa'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            // onSubmitEditing={onSubmit}
            onChangeText={(text) =>
              onChange({
                key: 'email',
                value: text,
              })
            }
            value={email}
          />
          <PasswordInputX
            label="PASSWORD"
            // mode="outlined"
            style={{backgroundColor: '#fafafa'}}
            autoCapitalize="none"
            returnKeyType={'next'}
            // onSubmitEditing={onSubmit}
            onChangeText={(text) =>
              onChange({
                key: 'password',
                value: text,
              })
            }
            value={password}
          />
          <PasswordInputX
            ref={inputPassword}
            value={confirmPassword}
            // mode="outlined"
            style={{backgroundColor: '#fafafa'}}
            label="CONFIRM PASSWORD"
            returnKeyType={'go'}
            // onSubmitEditing={signUpUser}
            onChangeText={(text) =>
              onChange({
                key: 'confirmPassword',
                value: text,
              })
            }
          />
        </Section>
        <Section>
          <ButtonX
            loading={loading}
            dark={true}
            color={loading ? theme.colors.accent : theme.colors.primary}
            onPress={signUpUser}
            label="Sign Up"
          />

          <ButtonX
            mode={'text'}
            onPress={() => panelRef.current.show()}
            label=" NEED HELP "
          />
        </Section>
      </LoadingActionContainer>

      <BottomPanel ref={panelRef} routeName={Routes.LOGIN_SCREEN} />
    </Container>
  );
};
