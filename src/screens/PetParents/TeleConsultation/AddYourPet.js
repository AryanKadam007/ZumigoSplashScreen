import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import BottomSheet from '../../../components/shared/BottomSheet';
import {FlatList} from 'react-native-gesture-handler';
import screens from '../../../constants/screens';
import DualOptionSelector from '../../../components/shared/DualOptionSelector';
import CustomTextInput from '../../../components/shared/CustomTextInput';
import WheelPicker from '@quidone/react-native-wheel-picker';
import Modal from 'react-native-modal';
import SearchByInput from '../../../components/shared/SearchByInput';

const breeds = [
  'Akita',
  'Alaskan Malamute',
  'American Bulldog',
  'Australian Shepherd',
  'Beagle',
  'Belgian Malinois',
  'Bernese Mountain Dog',
  'Bichon Frise',
  'Border Collie',
  'Boxer',
];

const AddYourPet = ({navigation, route}) => {
  const isHomeVisit = route?.params?.isHomeVisit;
  const tilte = route?.params?.title || null;
  const goBack = route?.params?.goBack;

  useEffect(() => {
    if (tilte) {
      navigation.setOptions({title: route?.params?.title});
    }
  }, []);

  const [petType, setPetType] = useState('Dog');
  const [petName, setPetName] = useState('');
  const [gender, setGender] = useState(null);
  const [weight, setWeight] = useState('');
  const [microchip, setMicrochip] = useState('');
  const [image, setImage] = useState(null);
  const [isKCIRegister, setIsKCIRegister] = useState(null);
  const [month, setMonth] = useState(0);
  const [age, setAge] = useState(0);
  console.log('Hello 1234', month, age);

  const [search, setSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const breedRef = useRef(null);

  const closeBreedBottomSheet = () => breedRef.current?.close();
  const openBreedBottomSheet = () => breedRef.current?.present();

  const selectImage = async () => {};

  const data = [...Array(20).keys()].map(index => ({
    value: index,
    label: String(index),
  }));

  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white "
        showsVerticalScrollIndicator={false}>
        <Text className=" mt-5 text-[26px] font-PTSans-Bold text-darkGunmetal">
          Add your pet!
        </Text>
        {/* Dog / Cat Toggle */}
        <View
          className="my-5 flex-row bg-pastelGrey rounded-2xl overflow-hidden "
          style={{boxShadow: 'inset 0 0 12px #FF53621A'}}>
          <TouchableOpacity
            className={`flex-1 p-[15px] items-center  rounded-2xl ${
              petType === 'Dog' ? ' bg-primary' : ''
            }`}
            onPress={() => setPetType('Dog')}>
            <Text
              className={` text-[16px]  leading-[22px] ${
                petType === 'Dog'
                  ? ' text-white  font-Nunito-Bold'
                  : ' text-[#969492] font-Nunito-Regular'
              }`}>
              Dog
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-[15px] items-center  rounded-2xl ${
              petType != 'Dog' ? ' bg-primary' : ''
            }`}
            onPress={() => setPetType('Cat')}>
            <Text
              className={` text-[16px]   leading-[22px] ${
                petType != 'Dog'
                  ? ' text-white font-Nunito-Bold'
                  : ' text-[#969492] font-Nunito-Regular'
              }`}>
              Cat
            </Text>
          </TouchableOpacity>
        </View>
        {/* Image Upload */}
        <View className=" flex-row gap-[10px] mb-[15px]">
          <Image
            source={images.dog}
            className="h-[100px] w-[100px] rounded-2xl"
          />
          <TouchableOpacity
            className="h-[100px] w-[100px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl items-center justify-center gap-[6px]"
            onPress={selectImage}>
            <Image
              source={images.imagePlaceholder}
              className=" h-5 w-5"
              resizeMode="contain"
            />
            <Text className=" font-Nunito-Regular text-[12px] opacity-50">
              Add image
            </Text>
          </TouchableOpacity>
        </View>
        {/* Input Fields */}
        <CustomTextInput
          placeholder="Enter pet name"
          value={petName}
          onChangeText={setPetName}
        />
        {/* Breed Dropdown */}
        {/* <TouchableOpacity
          className=" bg-white border border-[#BBBCB7] p-[19px] rounded-[20px] flex-row justify-between items-center mb-[15px]"
          onPress={openBreedBottomSheet}>
          <Text
            className={` font-Nunito-Regular text-[#BBBCB7] text-[16px] ${
              selectedBreed ? 'text-[#000000]' : 'text-[#BBBCB7]'
            }`}>
            {selectedBreed ? selectedBreed : 'Breed*'}
          </Text>
          <Image
            source={images.secondaryBack}
            resizeMode="contain"
            className=" h-[14px] w-[14px] rotate-90"
            tintColor="grey"
          />
        </TouchableOpacity> */}
        <TouchableOpacity
          className={`p-[19px] rounded-[20px] flex-row justify-between items-center mb-[15px] border border-[#BBBCB7] 
           
          }`}
          onPress={openBreedBottomSheet}>
          <Text
            className={`font-Nunito-Regular text-[16px] ${
              selectedBreed ? 'text-[#000000]' : 'text-[#BBBCB7]'
            }`}>
            {selectedBreed ? selectedBreed : 'Breed*'}
          </Text>
          <Image
            source={images.secondaryBack}
            resizeMode="contain"
            className="h-[14px] w-[14px] rotate-90"
            tintColor="grey"
          />
        </TouchableOpacity>
        {/* Gender Selection */}
        <View className=" mb-[15px]">
          <DualOptionSelector
            title1="Male"
            title2="Female"
            slected={gender}
            setSelected={setGender}
          />
        </View>
        {/* Age Dropdown */}
        <TouchableOpacity
          className=" bg-white border border-[#BBBCB7] p-[19px] rounded-[20px] flex-row justify-between items-center mb-[15px]"
          onPress={() => setModalVisible(true)}>
          <Text className="font-Nunito-Regular text-[#BBBCB7] ">Age</Text>
          <Image
            source={images.secondaryBack}
            resizeMode="contain"
            className=" h-[14px] w-[14px] rotate-90"
            tintColor="grey"
          />
        </TouchableOpacity>
        {/* Weight Input */}
        <View className="border border-[#BBBCB7] bg-white rounded-[20px] mb-[15px] py-[8px] px-[19px] items-center flex-row">
          <TextInput
            className=" flex-1  font-Nunito-Regular"
            placeholder="Weight"
            keyboardType="numeric"
            value={weight}
            placeholderTextColor="#BBBCB7"
            onChangeText={setWeight}
          />
          <Text className="font-Nunito-Regular text-black opacity-50">Kgs</Text>
        </View>
        <Text className=" text-[24px] font-Nunito-Bold mb-[10px]">
          Is your pet Microchipped?
        </Text>
        {/* Microchip Input */}
        {/* <CustomTextInput
          placeholder="Microchip number"
          value={microchip}
          onChangeText={setMicrochip}
        /> */}
        <TouchableOpacity className=" bg-white border border-[#BBBCB7] p-[10px] rounded-[20px] flex-row justify-between items-center mb-[15px]">
          <TextInput
            placeholder="Microchip number"
            placeholderTextColor="#BBBCB7"
            className="font-Nunito-Regular text-[#000000] text-[16px]"></TextInput>
          <Image
            source={images.Microchipping}
            resizeMode="contain"
            className=" h-[35px] w-[35px]"
            tintColor="grey"
          />
        </TouchableOpacity>
        <TouchableOpacity className=" bg-white border border-[#BBBCB7] p-[19px] rounded-[20px] flex-row justify-between items-center mb-[15px]">
          <Text className="font-Nunito-Regular text-[#BBBCB7] text-[16px]">
            Date of microchipping
          </Text>
          <Image
            source={images.timedate}
            resizeMode="contain"
            className=" h-[18px] w-[18px]"
            tintColor="grey"
          />
        </TouchableOpacity>
        <Text className=" text-[24px] font-Nunito-Bold mb-[10px]">
          Do you have KCI registration
        </Text>
        <View className="pb-[100px]">
          <View className=" mt-[15px]">
            <DualOptionSelector
              title1="Yes"
              title2="No"
              slected={isKCIRegister}
              setSelected={setIsKCIRegister}
            />
          </View>
        </View>
      </ScrollView>
      <FooterBtn
        title="Save"
        onClick={() => {
          if (goBack) {
            navigation.goBack();
            return;
          }
          navigation.navigate(
            screens.SelectSymptoms,
            isHomeVisit && {
              isHomeVisit: true,
            },
          );
        }}
      />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <View className="bg-white p-5 rounded-t-2xl">
          <View style={{backgroundColor: 'white'}}>
            <View className=" px-6">
              <Text className=" mt-6 font-Nunito-Bold text-[18px]">Age</Text>

              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                  }}>
                  <WheelPicker
                    data={data}
                    value={44}
                    style={{zIndex: 1}}
                    onValueChanged={({item: {value}}) => setAge(value)}
                    overlayItemStyle={{backgroundColor: '#00000000'}}
                  />
                  <Text className=" z-[1]">Years</Text>
                  <WheelPicker
                    data={data}
                    value={44}
                    style={{zIndex: 1}}
                    onValueChanged={({item: {value}}) => setMonth(value)}
                    overlayItemStyle={{backgroundColor: '#00000000'}}
                  />
                  <Text className=" z-[1]">Month</Text>
                  <View
                    className=" bg-pastelGrey rounded-2xl border border-pastelgreyBorder"
                    style={{
                      height: 35,
                      width: '100%',
                      position: 'absolute',
                    }}></View>
                </View>
              </View>
            </View>
          </View>

          <View className=" w-full bottom-0">
            <View className=" my-4">
              <TouchableOpacity
                className="rounded-2xl bg-[#d75880] w-full items-center"
                onPress={() => setModalVisible(false)}>
                <Text className=" text-white font-Nunito-Bold text-[20px] py-5">
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Save Button */}
      <BottomSheet ref={breedRef} snapPoints={['75%']}>
        <View className=" px-6">
          <Text className=" mt-6 font-Nunito-Bold text-[18px]">Pet breed</Text>

          <View className=" mb-[5px] mt-5">
            {/* search bar  */}
            <SearchByInput />
          </View>
          <FlatList
            data={breeds}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
              <TouchableOpacity
                className=" p-4 flex-row border-b-pastelgreyBorder border-b py-[15.5px] justify-between"
                onPress={() => {
                  setSelectedBreed(item);
                  closeBreedBottomSheet();
                }}>
                <Text
                  className={`${
                    selectedBreed === item ? '  text-primary' : ''
                  }`}>
                  {item}
                </Text>
                {selectedBreed === item && (
                  <Image
                    source={images.footPrint}
                    className=" w-5 h-[17px]"
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default AddYourPet;
