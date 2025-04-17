import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import {TextInput} from 'react-native-gesture-handler';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import {Keyboard} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const VetBankDetails = ({navigation}) => {
  const [accountHolder, setAccountHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  return (
    <>
      <View className="flex-1 bg-white px-6 ">
        <View className="flex-1">
          {/* Progress bar  */}
          <View className="mt-[15px] mb-2">
            <RegistrationProgressBar screenNo={7} />
          </View>
          <Text className="text-gray-900 mb-[10px] font-Nunito-Regular">
            Add bank details
          </Text>
          <View className="mt-5" />
          <TextInput
            className="border border-[#e8e9eb] h-[60px] text-[16px] bg-[#f3f6f7] rounded-2xl mb-[15px] p-[19px] text-[#000000] font-Nunito-Regular "
            placeholder="Name of account holder"
            placeholderTextColor="#00000080"
            value={accountHolder}
            onChangeText={text => {
              setAccountHolder(text);
              saveData('accountHolder', text);
            }}
          />

          <TextInput
            className="border border-[#e8e9eb] h-[60px] text-[16px] bg-[#f3f6f7] rounded-2xl mb-[15px] p-[19px] text-[#000000] font-Nunito-Regular"
            placeholder="Bank name"
            placeholderTextColor="#00000080"
            value={bankName}
            onChangeText={text => {
              setBankName(text);
              saveData('bankName', text);
            }}
          />
          <TextInput
            className="border border-[#e8e9eb] h-[60px] text-[16px] bg-[#f3f6f7] rounded-2xl mb-[15px] p-[19px] text-[#000000] font-Nunito-Regular"
            placeholder="Account no"
            placeholderTextColor="#00000080"
            keyboardType="numeric"
            value={accountNo}
            onChangeText={text => {
              setAccountNo(text);
              saveData('accountNo', text);
            }}
          />
          <TextInput
            className="border border-[#e8e9eb] h-[60px] text-[16px] bg-[#f3f6f7] rounded-2xl mb-[15px] p-[19px] text-[#000000] font-Nunito-Regular"
            placeholder="IFSC code"
            placeholderTextColor="#00000080"
            value={ifscCode}
            onChangeText={text => {
              setIfscCode(text);
              saveData('ifscCode', text);
            }}
          />
          {/* <FooterBtn
        title="Continue"
        onClick={() => navigation.navigate(screens.VetAssistantDetails)}
      /> */}
        </View>
      </View>
      {!isKeyboardVisible && (
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
              navigation.navigate(screens.VetAssistantDetails);
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

export default VetBankDetails;
