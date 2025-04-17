import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';

const AddSpecialisation = ({navigation}) => {
  const [selectedSpecialisation, setselectedSpecialisation] = useState([]);

  const Specialisation = [
    'Internal Medicine',
    'Dermatology',
    'Surgery',
    'Ophthalmology',
    'Dentistry',
    'Anesthesiology',
    'Radiology',
    'Emergency and Critical Care',
    'Nutrition',
    'Behavior',
  ];

  const toggleSpecialisationSelection = specialisation => {
    setselectedSpecialisation([specialisation]); // Only store the selected one
  };
  return (
    <>
      <View className="flex-1 bg-white px-6 ">
        {/* Progress bar  */}
        <View className="mt-[15px] mb-2">
          <RegistrationProgressBar screenNo={3} />
        </View>

        <Text className="text-gray-900 mb-[10px] font-[Nunito-Regular]">
          Add Specialisation
        </Text>

        {/* title  */}

        <Text className=" mt-[15px] mb-[35px] text-[26px] text-darkGunmetal font-[PTSans-Bold]">
          What’s your Expertize
        </Text>

        <ScrollView className=" bg-white" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap gap-2">
            {Specialisation.map((specialisation, index) => (
              <TouchableOpacity
                key={index}
                className={`rounded-2xl py-[14px] px-[15px] mb-2 border ${
                  selectedSpecialisation.includes(specialisation)
                    ? 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                    : 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                }`}
                onPress={() => toggleSpecialisationSelection(specialisation)}>
                <Text
                  className={` text-[16px] leading-6 font-[Nunito-Regular] ${
                    !selectedSpecialisation.includes(specialisation)
                      ? ' text-darkGunmetal'
                      : ' text-white'
                  }`}>
                  {specialisation}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        {/* <FooterBtn
            title="Continue"
            onClick={() => navigation.navigate(screens.AddServices)}
          /> */}
      </View>

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
            navigation.navigate(screens.AddServices);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AddSpecialisation;
