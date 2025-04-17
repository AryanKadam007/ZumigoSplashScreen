import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import {launchCamera} from 'react-native-image-picker';

const VetRegisterAgreement = ({navigation}) => {
  const [accepted, setAccepted] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'front', // Use 'back' for rear camera
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorMessage) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          setImageUri(response.assets[0].uri);
        }
      },
    );
  };
  return (
    <>
      <View className="flex-1 bg-white px-6 ">
        <View className="flex-1">
          <ScrollView
            className=" bg-white "
            showsVerticalScrollIndicator={false}>
            <Text className="mb-[15px]  mt-5 text-darkGunmetal text-[26px] font-PTSans-Bold">
              Agreement
            </Text>
            <Text
              className="text-[12px] opacity-60 leading-[18px] mb-[19px]"
              style={{fontFamily: 'Nunito-Regular'}}>
              Fusce sit amet massa commodo, tincidunt justo at, luctus erat.
              Mauris accumsan magna nec nulla bibendum posuere. Etiam porta
              turpis sit amet risus egestas finibus. Sed efficitur tortor id
              lorem vehicula mollis. Nullam eget efficitur tellus. Ut non
              volutpat nisi. Fusce vel bibendum odio, sit amet maximus purus.
              Nam enim lectus, ultrices at nulla vel, ultrices mollis tellus.
              Morbi eget dignissim metus. Nulla interdum sem sodales lacus
              consectetur pharetra. Suspendisse potenti.
            </Text>

            <Text
              className="text-[12px] opacity-60 leading-[18px] mb-[19px]"
              style={{fontFamily: 'Proxima-Nunito-Regular'}}>
              Nulla sit amet semper metus. Pellentesque venenatis auctor
              euismod. Proin ullamcorper est sem, eget ullamcorper risus
              eleifend quis. Pellentesque at facilisis nulla, sit amet placerat
              dolor. Pellentesque suscipit tempor ullamcorper. Nunc a quam
              posuere, consectetur lectus eu, euismod ipsum. Integer non
              molestie sem. Cras varius suscipit est in ultrices. Suspendisse
              potenti. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Phasellus tincidunt eros
              in quam iaculis, vel scelerisque eros tincidunt. Donec quis
              sodales libero. Quisque at nunc quam.
            </Text>

            <View className="border-y border-pastelGrey py-[14px] pl-[18px]">
              <Text className="text-[16px] leading-5 font-Nunito-Bold">
                Security and privacy
              </Text>
            </View>

            <View className="flex-row items-center mt-[30px] mb-[20px] gap-[13px]">
              <Switch
                trackColor={{false: '#E7ECF7', true: '#d75880'}}
                thumbColor={true ? '#fff' : '#fff'}
                value={accepted}
                onValueChange={() => setAccepted(!accepted)}
              />
              <Text className="text-[15px] leading-[22px] font-Nunito-Regular">
                I Accept the terms and conditions
              </Text>
            </View>
            <View className="flex flex-row items-center gap-[13px] mb-[30px] ">
              <TouchableOpacity onPress={openCamera}>
                <Image
                  source={require('../../../assets/images/camera-icon.png')}
                  className="w-[44px] h-[44px]"
                  style={{tintColor: '#d75880'}}
                />
              </TouchableOpacity>
              <Text className="text-[15px] leading-[22px] font-Nunito-Regular">
                Take a Selfie
              </Text>
              {imageUri && (
                <Image
                  source={{uri: imageUri}}
                  className="w-[100px] h-[100px] rounded-full mt-2"
                />
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      {accepted && (
        <View
          className="bg-white flex px-6 justify-center h-[100px] w-full"
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 50, height: 60}, // Adjust as needed
            shadowOpacity: 50, // Lower for subtle shadows
            shadowRadius: 10,
            elevation: 18, // Android shadow
          }}>
          <TouchableOpacity
            className="h-[60px] bg-primary items-center justify-center rounded-2xl"
            onPress={() => {
              navigation.navigate(screens.Dashboard);
            }}>
            <Text className="text-[20px] text-white font-Nunito-Bold text-center">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default VetRegisterAgreement;
