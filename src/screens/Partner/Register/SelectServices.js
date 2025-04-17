import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import React, {useState} from 'react';
import FooterBtn from '../../../components/shared/FooterBtn';
import images from '../../../assets/images';
import screens from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
const services = [
  {id: '1', name: 'Veterinary', icon: images.pawIcon},
  {id: '2', name: 'Pharmacy', icon: images.PharmacyService},
  {id: '3', name: 'Grooming', icon: images.GroomingService},
  {id: '4', name: 'Radiology', icon: images.radiologyIcon},
];

const {width} = Dimensions.get('window');
const NUM_COLUMNS = 3;
const ITEM_SIZE = (width - 74) / NUM_COLUMNS; // Ensures square shape

const SelectServices = () => {
  const navigation = useNavigation();
  const [selectedServices, setSelectedServices] = useState(null);

  const toggleService = id => {
    setSelectedServices(id);
    // setSelectedServices(
    //   prevSelected =>
    //     prevSelected.includes(id)
    //       ? prevSelected.filter(item => item !== id) // Deselect
    //       : [...prevSelected, id], // Select
    // );
  };

  return (
    <>
      <View className="flex-1 bg-white px-6">
        <View className="flex-1">
          <Text
            className=" mt-5 mb-2 text-[26px]"
            style={{fontFamily: 'PTSans-Bold'}}>
            Select your services
          </Text>
          <Text
            className="mb-[18px] text-[#666666]"
            style={{fontFamily: 'Proxima-Nova-Regular'}}>
            Lorum Ipsum
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {services.map(item => {
              // const isSelected = selectedServices.includes(item.id);
              const isSelected = selectedServices == item.id;
              return (
                <View key={item.id}>
                  <TouchableOpacity
                    className={`border justify-center items-center rounded-2xl ${
                      !isSelected
                        ? 'bg-[#f3f6f7] border border-[#e8e9eb] shadow-md-light'
                        : 'border border-[#e8d5db] bg-[#d75880] shadow-md-light'
                    }`}
                    style={[
                      {width: ITEM_SIZE, height: ITEM_SIZE}, // Square aspect ratio
                    ]}
                    onPress={() => toggleService(item.id)}>
                    <Image
                      source={item.icon}
                      className={` h-[70px] w-[72px]`}
                      style={{
                        tintColor: isSelected ? '#f3f6f7' : '#d75880', // White when selected, Grey when not selected
                      }}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <Text
                    style={{fontFamily: 'Nunito-Regular', fontWeight: 700}}
                    className="text-[15px] text-center mt-[10px] mb-5 text-[#1C222F] ">
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <FooterBtn
        title="Continue"
        onClick={() => {
          if (selectedServices === '3') {
            navigation.navigate(screens.GroomerDetails);
          } else {
            navigation.navigate(screens.Vetdetails);
          }
        }}
      />
    </>
  );
};

export default SelectServices;
