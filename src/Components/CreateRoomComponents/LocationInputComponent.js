import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import CreateRoomContext from '../../context/createRoomContext';
import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {Section, ButtonX} from '../../Components';

Geocoder.init('AIzaSyCzzVieGnzaYCuKeL-Xib-okkf6cyljXvY');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: 'flex',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
  },
});

const LocationInputComponent = ({setSteps}) => {
  const {setCreateRoomFormData, createRoomFormData} = useContext(
    CreateRoomContext,
  );

  const [region, setRegion] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        minLength={3}
        fetchDetails={true}
        placeholder="Search your location"
        onPress={(data, details = null) => {
          console.log('FROM THE DATA', details.geometry.location);
          setCreateRoomFormData((prev) => {
            return {
              ...prev,
              location: [
                details.geometry.location.lng,
                details.geometry.location.lat,
              ],
            };
          });
        }}
        query={{
          key: 'AIzaSyCzzVieGnzaYCuKeL-Xib-okkf6cyljXvY',
          language: 'en',
        }}
        styles={{
          container: {
            flex: 1,
            zIndex: 9999,
            width: 400,
            marginTop: 10,
          },
          textInputContainer: {
            flexDirection: 'row',
          },
          textInput: {
            backgroundColor: '#FFFFFF',
            height: 55,
          },
        }}
      />

      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(reg) => setRegion(reg)}>
          <Marker
            draggable
            coordinate={{latitude: 51.5078788, longitude: -0.0877321}}
            onDragEnd={(e) => {
              console.log(e.nativeEvent.coordinate);
              setCreateRoomFormData((prev) => {
                return {
                  ...prev,
                  location: [
                    e.nativeEvent.coordinate.longitude,
                    e.nativeEvent.coordinate.latitude,
                  ],
                };
              });
            }}
          />
        </MapView>
      </View>
      <Section>
        <ButtonX
          disabled={createRoomFormData.location === null}
          onPress={() => {
            setSteps(3);
          }}
          label="Next Step"
        />
      </Section>
    </View>
  );
};

export default LocationInputComponent;
