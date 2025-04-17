import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextInputs from '../../../components/vetRegistrationComponents/TextInputs';
import {useNavigation} from '@react-navigation/native';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import FooterBtn from '../../../components/shared/FooterBtn';
import screens from '../../../constants/screens';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {Keyboard} from 'react-native';
import {primary} from '../../../assets/theme/colors';
import DocumentPicker from 'react-native-document-picker';
// import {XCircleIcon} from 'react-native-heroicons/solid';
const Vetdetails = () => {
  const [Firstname, setFirstName] = useState('');
  const [Lastname, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [vetLicense, setVetLicense] = useState('');
  const [gstin, setGstIn] = useState('');
  const [selectedFiles, setSelectedFiles] = useState({
    photo: null,
    aadhaar: null,
    panId: null,
    vetLicense: null,
    companyLogo: null,
  });
  const navigation = useNavigation();
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

  const selectFile = async fileType => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      setSelectedFiles(prevFiles => ({
        ...prevFiles,
        [fileType]: res[0],
      }));

      console.log('Selected file:', res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  const removeFile = fileType => {
    setSelectedFiles(prevFiles => ({
      ...prevFiles,
      [fileType]: null,
    }));
  };
  const renderFileUpload = (fileType, label) => (
    <View className="mt-4 flex flex-col bg-pastelGrey rounded-2xl">
      {/* Always display the label and the upload button */}
      <TouchableOpacity onPress={() => selectFile(fileType)}>
        <View className="h-[60px] flex flex-row items-center justify-between bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
          <Text className="text-[16px] ml-[15px] text-[#00000080] font-Nunito-Regular">
            {label}
          </Text>
          <Image
            source={require('../../../assets/images/upload.png')}
            className="h-[18px] w-[15.81px] mr-[21.1px]"
            style={{tintColor: primary}}
          />
        </View>
      </TouchableOpacity>
      <View>
        {selectedFiles[fileType] && (
          <View className="mt-4 flex flex-row items-center gap-3 ">
            {selectedFiles[fileType].type.includes('image') ? (
              <Image
                source={{uri: selectedFiles[fileType].uri}}
                className="w-[100px] h-[100px] rounded-lg"
                resizeMode="cover"
              />
            ) : (
              <View className="bg-gray-200 p-2 rounded-md">
                <Text className="text-black">
                  {selectedFiles[fileType].name}
                </Text>
              </View>
            )}

            {/* Cross button to delete the selected file */}
            <TouchableOpacity
              className="bg-red-500 rounded-full p-1"
              onPress={() => removeFile(fileType)}>
              {/* <XCircleIcon size={24} color="white" /> */}
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* If a file is selected, display the image preview and cross button */}
    </View>
  );

  return (
    <>
      <View className="flex-1 bg-white px-6">
        <View className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              <View className="mt-[15px] mb-2">
                <RegistrationProgressBar screenNo={1} />
              </View>
              <Text className="text-[14px] text-[#7f7f7f] font-Nunito-Regular mb-[21px]">
                Fill the Vet details
              </Text>

              <View className="flex flex-row items-center gap-[10px]">
                <View className="flex-1 h-[60px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                  <TextInput
                    placeholder="First Name"
                    placeholderTextColor="#00000080"
                    onChangeText={text => setFirstName(text)}
                    className="flex-1 p-3 px-4 text-[16px] font-Nunito-Regular  text-[#000000] min-h-[40px] "
                    style={{lineHeight: 22}}></TextInput>
                </View>
                <View className="w-[165px] h-[60px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                  <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#00000080"
                    onChangeText={text => setLastName(text)}
                    className="flex-1 text-[#000000] text-[16px] font-Nunito-Regular p-3 px-4 "
                    style={{lineHeight: 22}}></TextInput>
                </View>
              </View>

              <View className=" h-[60px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                <TextInput
                  placeholder="Phone no"
                  placeholderTextColor="#00000080"
                  onChangeText={text => setPhoneNo(text)}
                  className=" text-[#000000]  pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] text-[16px] font-Nunito-Regular "
                  style={{lineHeight: 22}}></TextInput>
              </View>
              <View className="h-[60px] mt-[15px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                <TextInput
                  placeholder="Email*"
                  placeholderTextColor="#00000080"
                  onChangeText={text => setEmail(text)}
                  className=" text-[#000000]  pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px]  text-[16px] font-Nunito-Regular"
                  style={{lineHeight: 22}}></TextInput>
              </View>
              <TextInput
                placeholder="Address"
                placeholderTextColor="#00000080"
                multiline
                textAlignVertical="top"
                onChangeText={text => setAddress(text)}
                className="bg-pastelGrey text-[16px] font-Nunito-Regular  border border-pastelgreyBorder text-[#000000] mt-[15px] h-[90px] rounded-2xl pl-[19.3px]"
                style={{lineHeight: 22}}
              />

              <View className="flex flex-row items-center gap-[10px] mt-[15px]">
                <View className="flex-1 h-[60px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                  <TextInput
                    placeholder="City"
                    placeholderTextColor="#00000080"
                    onChangeText={text => setCity(text)}
                    className="flex-1 p-3 px-4  text-[#000000] min-h-[40px] text-[16px] font-Nunito-Regular"
                    style={{lineHeight: 22}}></TextInput>
                </View>
                <View className="w-[165px] h-[60px] bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
                  <TextInput
                    placeholder="Pincode"
                    placeholderTextColor="#00000080"
                    onChangeText={text => setPincode(text)}
                    className="flex-1 text-[#000000]  p-3 px-4 text-[16px] font-Nunito-Regular"
                    style={{lineHeight: 22}}></TextInput>
                </View>
              </View>

              {renderFileUpload('photo', 'Upload Photo')}
              {renderFileUpload('aadhaar', 'Upload Aadhaar')}
              {renderFileUpload('panId', 'Upload PAN ID')}
              {renderFileUpload('vetLicense', 'Upload Vet License')}
              <Text className="text-[16px] text-[#000000] font-PTSans-Bold mt-[29.9px] mb-[14.1px]">
                Vet License
              </Text>
              <TextInput
                placeholder="Enter vet license no*"
                placeholderTextColor="#00000080"
                textAlignVertical="top"
                onChangeText={text => setVetLicense(text)}
                className="bg-pastelGrey border font-Nunito-Regular border-pastelgreyBorder text-[#000000] text-[16px] h-[60px] pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] rounded-2xl"
                style={{lineHeight: 22}}></TextInput>

              {renderFileUpload('companyLogo', 'Upload Company Logo')}
              <Text className="text-[16px] text-[#000000] font-PTSans-Bold mt-[29.9px] mb-[14.1px]">
                GSTIN
              </Text>
              <TextInput
                placeholder="GSTIN(Optional)"
                placeholderTextColor="#00000080"
                multiline
                textAlignVertical="top"
                onChangeText={text => setGstIn(text)}
                className="bg-pastelGrey border font-Nunito-Regular border-pastelgreyBorder text-[#000000] text-[16px] h-[60px] pt-[19px] pb-[21px] pl-[19.3px] pr-[68.8px] rounded-2xl mb-[100px]"
                style={{lineHeight: 22}}></TextInput>
            </ScrollView>
          </KeyboardAvoidingView>
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
              navigation.navigate(screens.VetServiceLocation);
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

export default Vetdetails;
