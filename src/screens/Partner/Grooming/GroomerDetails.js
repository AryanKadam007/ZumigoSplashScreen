import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import FooterBtn from '../../../components/shared/FooterBtn';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import images from '../../../assets/images';
import screens from '../../../constants/screens';

const GroomerDetails = ({navigation}) => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="mt-[15px] mb-2">
          <RegistrationProgressBar screenNo={1} n={6} />
        </View>
        <Text className="text-[14px] text-[#7f7f7f] font-Nunito-Regular mb-[21px]">
          Fill the Groomer details{' '}
        </Text>

        <View className="flex flex-row items-center gap-[10px]">
          <CustomTextInput
            containerStyle="flex-1"
            placeholder="First Name"
            value={firstname}
            onChangeText={setFirstName}
          />
          <CustomTextInput
            containerStyle="flex-1"
            placeholder="Last Name"
            value={lastname}
            onChangeText={setLastName}
          />
        </View>
        <CustomTextInput
          placeholder="Mobile No"
          value={mobileNo}
          onChangeText={setMobileNo}
        />
        <CustomTextInput
          placeholder="Email*"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity className="flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-2xl py-[16px]">
          <Text className="text-[16px] ml-[15px] text-[#000000] font-Nunito-Regular">
            Upload Photo
          </Text>
          <Image
            source={images.upload}
            className="h-[18px] w-[15.81px] mr-[21.1px]"
          />
        </TouchableOpacity>
      </ScrollView>
      <FooterBtn
        title={'Continue'}
        onClick={() => navigation.navigate(screens.GroomerCompanyDetails)}
      />
    </View>
  );
};

export default GroomerDetails;
