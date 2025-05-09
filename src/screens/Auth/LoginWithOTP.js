import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {NetworkInfo} from 'react-native-network-info';
import axios from 'react-native-axios';
import images from '../../assets/images';
import {useDispatch} from 'react-redux';
import {login} from '../../state/redux/slice/authSlice';
import screens from '../../constants/screens';
import Toast from 'react-native-toast-message';
import base64 from 'react-native-base64';
import {API_BASE_URL, AUTH_DEVICE, AUTH_SENDOTP, USER_TYPES} from '@env';
import Svg, {Path} from 'react-native-svg';
import CustomSvg from '../../components/shared/CustomSvg';
const DEVICE_UUID_KEY = 'device_uuid';
const AUTH_TOKEN_KEY = 'auth_token';

const LoginScreen = ({navigation}) => {
  const [isPartner, setIsPartner] = useState(false);
  const [mobile, setMobile] = useState('');
  const [deviceUUID, setDeviceUUID] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [userTypeUuid, setUserTypeUuid] = useState('');
  const [deviceIp, setDeviceIp] = useState('');
  const {height} = Dimensions.get('window');
  // const STORAGE_KEY = 'device_uuid';

  const dispatch = useDispatch();
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    const initializeUUID = async () => {
      try {
        let storedUUID = await AsyncStorage.getItem('device_uuid');
        let storedToken = await AsyncStorage.getItem('auth_token');

        if (storedUUID) {
          setDeviceUUID(storedUUID);
          console.log('Existing UUID:', storedUUID);

          if (!storedToken) {
            fetchToken(storedUUID);
          } else {
            setAuthToken(storedToken);
            console.log('Stored Token:', storedToken);
          }
        } else {
          const newUUID = uuid.v4();
          await AsyncStorage.setItem('device_uuid', newUUID);
          setDeviceUUID(newUUID);
          console.log('Generated UUID:', newUUID);
          fetchToken(newUUID);
        }
      } catch (error) {
        console.error('Error handling UUID and token:', error);
      }
    };

    const getDeviceIp = async () => {
      try {
        const ip = await NetworkInfo.getIPAddress();
        if (ip) {
          setDeviceIp(ip);
          console.log('Device IP Address:', ip);
        }
      } catch (error) {
        console.error('Error fetching IP Address:', error);
      }
    };

    const fetchUserTypes = async () => {
      if (!authToken) return;
      try {
        const response = await axios.get(`${API_BASE_URL}${USER_TYPES}`, {
          headers: {Authorization: `Bearer ${authToken}`},
        });

        const data = response.data;
        const selectedType = data.find(
          type => type.Title === (isPartner ? 'Partner' : 'Pet Parent'),
        );
        if (selectedType) {
          setUserTypeUuid(selectedType.UUID);
          console.log('Fetched user types:', data);

          if (selectedType) {
            setUserTypeUuid(selectedType.UUID);
            console.log('Fetched UserTypeUuid:', selectedType.UUID);
          } else {
            console.warn('No matching user type found.');
          }
        }
      } catch (error) {
        console.error('Error fetching user types:', error);
      }
    };

    initializeUUID();
    getDeviceIp();
    fetchUserTypes();
  }, [authToken, isPartner]);

  const fetchToken = async userUuid => {
    try {
      const modifiedUUID = `${userUuid}+++000`;
      const encodedUUID = base64.encode(modifiedUUID);

      const response = await axios.post(`${API_BASE_URL}${AUTH_DEVICE}`, {
        DeviceKey: encodedUUID,
      });

      if (response.data?.Token) {
        await AsyncStorage.setItem('auth_token', response.data.Token.Token);
        setAuthToken(response.data.Token.Token);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };
  const sendOtp = async () => {
    if (!mobile || mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      Alert.alert('Please enter a valid mobile number.');
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}${AUTH_SENDOTP}`, {
        params: {
          MobileNumber: mobile,
          DeviceIp: deviceIp,
          UserTypeUuid: userTypeUuid,
        },
        headers: {Authorization: `Bearer ${authToken}`},
      });
      console.log('Full Response:', response.data);
      const otp = response.data?.[0]?.OTP;
      console.log('Fetched OTP:', otp);
      if (otp) {
        Toast.show({
          type: 'success',
          text1: 'OTP Received',
          text2: ` Your OTP is: ${otp} `,
        });
        navigation.navigate(screens.VerifyOTP, {
          isPartner,
          fetchedOtp: otp.toString().slice(0, 4),
          mobile,
        });
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <View className="flex-1 bg-[#FFEDF9] ">
      <ScrollView>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}> */}
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        <View>
          {/* Skip Button */}
          <View
            className={` flex-1 bg-[#FFEDF9] px-6 `}
            style={{
              height: isKeyboardVisible ? height * 0.2 : height * 0.37,
            }}>
            <View className="mt-[46px] mb-[40px]  p-4 rounded-t-[30px]  flex-row  items-end">
              {/* Left-Side Image or SVG */}
              <View className="absolute left-[45%] top-[-80px]">
                <Image
                  source={require('../../assets/images/DummyImages/halfImage1.png')}
                  className="h-[143.87px] w-[143.87px]"
                  resizeMode="contain"
                  style={{transform: [{rotate: '230deg'}]}} // Rotate the image
                />
              </View>

              {/* Skip Button (Aligned Right) */}
              <View className="flex-1 flex-row justify-end items-center pr-4 top-[-30px] left-[25px]">
                {!isPartner ? (
                  <TouchableOpacity
                    className="flex-row items-center"
                    onPress={() => dispatch(login(user_type.PET_PARENT))}>
                    <Text className="text-[20px] text-[#000000] leading-5 font-Nunito-Regular">
                      Skip
                    </Text>
                    <Image
                      source={images.skip}
                      className="h-3 w-[8px] ml-2"
                      resizeMode="contain"
                      style={{tintColor: '#000000'}}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text className="text-[16px] text-white leading-5 font-Nunito-Regular">
                    {' '}
                  </Text>
                )}
              </View>
            </View>
            <Image
              source={require('../../assets/images/DummyImages/shape1.png')}
              className="w-[119.23px] h-[119.23px] left-[-85px] mb-[130px]  mt-[0px]"
              style={{transform: [{rotate: '170deg'}]}} // Rotate the image
            />
            <Image
              source={require('../../assets/images/DummyImages/halfImage1.png')}
              className="w-[62.59px] h-[62.59px] left-[5px] bottom-[90px]"
              style={{transform: [{rotate: '400deg'}]}} // Rotate the image
            />
            <Image
              source={require('../../assets/images/DummyImages/shape1.png')}
              className="w-[106.03px] h-[106.03px] bottom-[90px] left-[220px] "
              style={{transform: [{rotate: '356deg'}]}} // Rotate the image
            />
          </View>
          <ScrollView>
            <View>
              <View>
                <CustomSvg />
              </View>

              <View className={` bg-white px-6`}>
                <View className="flex items-center justify-center mb-[10px]">
                  <Image
                    source={require('../../assets/images/DummyImages/ZumigoLogo.png')}
                    className=" h-[69px] w-[186px]  "
                  />
                  <Text className="text-[13px] font-Nunito-Bold text-primary">
                    Simpler. Quicker. Smarter
                  </Text>
                </View>
                <Text className=" font-Nunito-Regular text-[#333333] text-[18px] text-center mb-[32px]">
                  Experience pet healthcare like never before.
                </Text>

                <View className=" flex-row  bg-[#ffffff] px-[19.5px] rounded-[20px] items-center border border-[#BBBCB7] ">
                  <Text
                    className=" text-[#848A9A]  text-[16px] "
                    style={{fontFamily: 'Proxima-Nova-Regular'}}>
                    +91
                  </Text>

                  <TextInput
                    className=" text-darkGunmetal  text-[16px] py-[19px] "
                    style={{fontFamily: 'Proxima-Nova-Regular'}}
                    placeholder="Enter Mobile number"
                    keyboardType="numeric"
                    placeholderTextColor="#848A9A"
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                    maxLength={10}
                  />
                </View>
                <View className="flex flex-col ">
                  <Image
                    source={require('../../assets/images/DummyImages/halfImage3.png')}
                    className="w-[70.48px] h-[70.48px] left-[-40px] top-4"
                    style={{tintColor: '#dee0e3'}}
                  />
                </View>
                <View className="flex flex-col items-center ">
                  <View className=" my-5 mt-[10px] flex items-center mb-[50px] ">
                    <TouchableOpacity
                      className="rounded-full bg-primary w-[250px] items-center "
                      onPress={sendOtp}>
                      <Text className=" text-white font-semibold text-[24px] py-5 font-Nunito-Bold">
                        Get OTP
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="absolute w-full flex flex-row items-center justify-center bottom-0 mt-[10px] mb-[10px] ">
                    <View className="flex-row gap-2 justify-center items-center">
                      <Text
                        className=" text-[#848A9A] text-center"
                        style={{fontFamily: 'Proxima-Nova-Regular'}}>
                        {!isPartner ? 'Are you a Partner?' : 'Not a Partner?'}
                      </Text>
                      <TouchableOpacity
                        onPress={() => setIsPartner(!isPartner)}>
                        <Text
                          style={{fontFamily: 'Proxima-Nova-Regular'}}
                          className=" text-[#848A9A] text-center">
                          Click here
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <Image
                  source={require('../../assets/images/DummyImages/halfImage3.png')}
                  className="w-[60.48px] h-[70.48px] left-[300px] bottom-[30px] ]"
                  style={{tintColor: '#dee0e3'}}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        {/* </TouchableWithoutFeedback> */}
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
});
