import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import FooterBtn from '../../../components/shared/FooterBtn';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import screens from '../../../constants/screens';
import images from '../../../assets/images';

const ParentDetails = ({navigation, route}) => {
  const isHomeVisit = route?.params?.isHomeVisit;

  useEffect(() => {
    if (isHomeVisit) {
      navigation.setOptions({title: 'Home Visit'});
    }
  }, []);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '+91 9916347786',
    email: '',
  });

  const handleChange = (name, value) => {
    setForm({...form, [name]: value});
  };
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView>
        <Text className="  mb-[15px] text-[26px] font-Nunito-Bold">
          Parent details
        </Text>

        <CustomTextInput
          value={form.firstName}
          placeholder="First name*"
          onChangeText={text => handleChange('firstName', text)}
        />

        <CustomTextInput
          placeholder="Last name*"
          value={form.lastName}
          onChangeText={text => handleChange('lastName', text)}
        />

        <CustomTextInput
          value={form.phone}
          placeholder="Mobile No.*"
          onChangeText={text => handleChange('phone', text)}
        />

        <CustomTextInput
          placeholder="Email*"
          keyboardType="email-address"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
        />
      </ScrollView>
      <View className="absolute bottom-20 left-0 right-0 items-center pb-4">
        <Image
          source={images.parentaddressIcon}
          className="w-[357px] h-[208px]"
        />
      </View>
      <FooterBtn
        title="Continue"
        onClick={() =>
          navigation.navigate(screens.SelectVeterinarian, {
            isTeleConsult: !Boolean(isHomeVisit),
          })
        }
      />
    </View>
  );
};

export default ParentDetails;
