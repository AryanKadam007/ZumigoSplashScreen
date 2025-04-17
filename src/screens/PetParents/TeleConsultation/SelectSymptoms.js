import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import images from '../../../assets/images';
import BottomSheet from '../../../components/shared/BottomSheet';
import FooterBtn from '../../../components/shared/FooterBtn';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import screens from '../../../constants/screens';
import {Dimensions} from 'react-native';

const symptomsList = [
  'Change in Appetite',
  'Increase in Water intake',
  'Decrease in water intake',
  'Change in Activity Level',
  'Weight Change',
  'GI Symptoms, such as Diarrhea and Vomiting',
  'Skin Symptoms, such as licking, itching or rashes',
  'Eye & Ear Symptoms, such as watery eyes or inflamed and painful ears rashes',
  'Eye & Ear Symptoms, such as watery eyes or inflamed and painful ears rashes w',
  'Eye & Ear Symptoms, such as watery eyes or inflamed and painful ears rashes ww',
  'Eye & Ear Symptoms, such as watery eyes or inflamed and painful ears rashes www',
  'Eye & Ear Symptoms, such as watery eyes or inflamed and painful ears rashes wwwss',
  'Eye & Ear Symptoms, such as watery eyes or inflamed and painful ears rashes wwwww',
];
const SelectSymptoms = ({navigation, route}) => {
  const windowHeight = Dimensions.get('window').height;

  const isHomeVisit = route?.params?.isHomeVisit;
  const isEdit = route?.params?.isEdit;

  useEffect(() => {
    if (isHomeVisit) {
      navigation.setOptions({title: 'Home Visit'});
    }
  }, []);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);

  // Function to add an attachment (Placeholder Box for now)
  const addAttachment = () => {
    setAttachments([...attachments, {id: Date.now()}]);
  };

  // Function to remove an attachment
  const removeAttachment = id => {
    setAttachments(attachments.filter(item => item.id !== id));
  };
  const bottomSheetRef = useRef(null);
  const descBottomSheetRef = useRef(null);

  const toggleSymptom = symptom => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom],
    );
  };

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  const removeSymptom = index => {
    setSelectedSymptoms(selectedSymptoms.filter((_, i) => i !== index));
  };
  return (
    <View className="flex-1 bg-white px-6">
      <Text className="  mb-3 text-[26px] font-PTSans-Bold">
        Select the Symptoms
      </Text>
      <ScrollView>
        <View className="flex-1 mb-[50px]">
          {/* Symptoms List */}
          <View className="flex-1 py-5 px-[14px] bg-pastelGrey border-pastelgreyBorder border rounded-2xl">
            <View className=" flex-row justify-between items-center">
              <View className=" flex-row gap-[15px] ">
                <Image
                  source={images.Symptoms}
                  className=" w-[22px] h-[22px]"
                />
                <Text className=" text-[16px] font-Nunito-Bold  text-darkGunmetal ">
                  Symptoms
                </Text>
              </View>
              {selectedSymptoms.length == 0 && (
                <TouchableOpacity
                  onPress={() => {
                    bottomSheetRef.current?.present();
                  }}>
                  <Image
                    source={images.secondaryAdd}
                    className=" w-[22px] h-[22px]"
                  />
                </TouchableOpacity>
              )}
            </View>
            {selectedSymptoms.length > 0 && <View className=" mt-6" />}
            <View className=" flex-row flex-wrap gap-[10px] ">
              {selectedSymptoms.map((item, index) => (
                <View
                  key={index.toString()}
                  className=" py-[10px] px-[14px] bg-pastelPrimary border border-primary rounded-2xl">
                  <Text className=" text-[#333333] text-[14px] font-Nunito-Regular leading-[15px]">
                    {item}
                  </Text>

                  <TouchableOpacity
                    onPress={() => removeSymptom(index)}
                    className=" absolute right-[-2px] top-[-3px]">
                    <Image
                      source={images.primaryClose}
                      className=" h-[14px] w-[14px]"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Upload Image Button */}
          <View className=" items-start mt-[15px]">
            <TouchableOpacity
              className=" bg-pastelGrey border border-pastelgreyBorder py-[14px] px-[20px] gap-[10px] flex-row rounded-xl "
              onPress={addAttachment}>
              <Image
                source={images.secondaryAdd}
                className=" h-[18px] w-[18px]"
                tintColor="grey"
              />
              <Text className=" font-Nunito-Bold text-[#838999]">
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>

          {attachments.length > 0 && (
            <View className="flex-row gap-3 flex-wrap bg-pastelGrey border border-pastelgreyBorder rounded-2xl  p-[15px] mt-[15px]">
              {attachments.map(item => (
                <View>
                  <Image
                    key={item.id}
                    source={images.dog4}
                    className="relative w-[80px] h-[80px] rounded-lg"
                    resizeMode="contain"
                  />
                  {/* Remove button (Top-right corner) */}
                  <TouchableOpacity
                    onPress={() => removeAttachment(item.id)}
                    className="absolute -top-1 -right-1 bg-red-500 rounded-full">
                    <Image
                      source={images.primaryClose}
                      className=" h-[16px] w-[16px]"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          <View className=" left-[50px] items-center">
            <Image
              source={images.sleepingcatIcon}
              style={{
                width: attachments.length > 0 ? 170 : 279,
                height: attachments.length > 0 ? 170 : 279,
                left: attachments.length > 0 ? 50 : 0,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </ScrollView>
      {/* Continue Button */}
      <FooterBtn
        title="Continue"
        onClick={() => {
          if (isEdit) {
            navigation.goBack();
            return;
          }

          if (isHomeVisit) {
            navigation.navigate(screens.AddYourAddress);
          } else {
            navigation.navigate(screens.ParentDetails);
          }
        }}
      />

      <BottomSheet ref={bottomSheetRef}>
        <View className=" px-6">
          <Text className="mt-10 font-Nunito-Bold text-[24px]">Symptoms</Text>
          <Text className=" mt-2 mb-[30px] font-Nunito-Regular text-gray-800 text-[18px]">
            Choose the symptoms of Max
          </Text>
          <ScrollView
            style={{
              height: windowHeight * 0.65,
            }}
            showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap gap-[10px] mb-[100px]">
              {symptomsList.map(item => (
                <TouchableOpacity
                  key={item}
                  className={`p-[14px] rounded-[20px] border flex-row items-center justify-between w-full ${
                    selectedSymptoms.includes(item)
                      ? 'bg-primary border-primary'
                      : 'bg-white border-[#BBBCB7]'
                  }`}
                  onPress={() => toggleSymptom(item)}>
                  <Text
                    className={`font-Nunito-Regular text-[16px] leading-6 flex-shrink ${
                      selectedSymptoms.includes(item)
                        ? 'text-white'
                        : 'text-[#333333]'
                    }`}>
                    {item}
                  </Text>
                  {selectedSymptoms.includes(item) && (
                    <Image
                      className="w-[19px] h-4 ml-2"
                      style={{tintColor: 'white'}}
                      resizeMode="contain"
                      source={images.footPrint}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        <FooterBtn
          title="Add"
          onClick={() => {
            bottomSheetRef.current?.close();
            setTimeout(() => {
              descBottomSheetRef?.current?.present();
            }, 500);
          }}
        />
      </BottomSheet>

      <BottomSheet ref={descBottomSheetRef}>
        <View className=" px-6 flex-1">
          <Text className="mt-10 font-Proxima-Nova-Bold text-[18px]">
            Description
          </Text>
          <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl p-4 mt-[30px] mb-[80px] h-[100px]">
            <TextInput placeholder="Note" multiline={true} />
          </View>
        </View>

        <View className=" px-6  z-10">
          <View className=" my-4">
            <TouchableOpacity
              className="rounded-2xl bg-primary w-full items-center z-50"
              onPress={() => {
                descBottomSheetRef?.current?.close();
                bottomSheetRef.current?.close();
              }}>
              <Text className=" text-white font-Nunito-Bold text-[20px] py-5">
                {'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default SelectSymptoms;
