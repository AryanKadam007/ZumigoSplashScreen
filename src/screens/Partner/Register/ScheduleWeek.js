import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ScrollView,
  FlatList,
  Image,
  Button,
  Modal,
  Platform,
} from 'react-native';
import React, {useRef, useMemo, useState, useCallback} from 'react';
import RegistrationProgressBar from '../../../components/shared/RegistrationProgressBar';
import {darkGrey, primary} from '../../../assets/theme/colors';
import FooterBtn from '../../../components/shared/FooterBtn';
import {Picker} from '@react-native-picker/picker';
import TimePicker from '../../../components/vetRegistrationComponents/TimePicker';
import WheelPicker from '@quidone/react-native-wheel-picker';
// import Modal from 'react-native-modal';
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import screens from '../../../constants/screens';

const ScheduleWeek = () => {
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [selectedMinuteIndex, setSelectedMinuteIndex] = useState(0);
  const [selectedHourIndex, setSelectedHourIndex] = useState(0);
  const [selectedAmPmIndex, setSelectedAmPmIndex] = useState(0);
  const hourdata = [...Array(12).keys()].map(index => ({
    value: index + 1,
    label: String(index + 1),
  }));
  // const mindata = [...Array(60).keys()].map(index => ({
  //   value: index,
  //   label: index < 10 ? `0${index}` : String(index),
  // }));
  const mindata = [0, 15, 30, 45].map(index => ({
    value: index,
    label: index < 10 ? `0${index}` : String(index),
  }));
  const amPmData = [
    {value: 'AM', label: 'AM'},
    {value: 'PM', label: 'PM'},
  ];
  const handleTimeSelect = () => {
    const selectedHour = hourdata[selectedHourIndex]?.label;
    const selectedMinute = mindata[selectedMinuteIndex]?.label;
    const selectedAmPm = amPmData[selectedAmPmIndex]?.label;

    // ✅ Set the selected time and close the modal
    setSelectedTime(`${selectedHour}:${selectedMinute} ${selectedAmPm}`);
    setTimeModalVisible(false);
  };
  const bottomSheetRef = useRef(null);
  const timebottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['70%'], []);
  const openModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  const timeBottomSheetRef = useRef(null);
  const timeSnapPoint = useMemo(() => ['60%'], []);
  const timeOpenModal = useCallback(() => {
    timeBottomSheetRef.current?.present();
    setModalVisible(true);
  }, []);
  const timeCloseModal = useCallback(() => {
    timeBottomSheetRef.current?.dismiss();
    setModalVisible(false);
  }, []);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDaySelection = day => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day)); // Unselect
    } else {
      setSelectedDays([...selectedDays, day]); // Select
    }
  };
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const navigation = useNavigation();
  const visitBottomSheetRef = useRef(null);
  const visitSnapPoint = useMemo(() => ['80%'], []);
  const visitOpenModal = useCallback(() => {
    visitBottomSheetRef.current?.present();
  }, []);
  const visitCloseModal = useCallback(() => {
    navigation.navigate(screens.VetDashboard);
    visitBottomSheetRef.current?.dismiss();
  }, []);

  const hoursData = [
    {
      title: 'Hours',
      hourSlot: [
        {startTime: '9:00 AM', endTime: '12:00 PM', type: 'Home Visit'},
        {startTime: '1:00 PM', endTime: '4:00 PM', type: 'Tele Consult'},
        {startTime: '5:00 PM', endTime: '8:00 PM', type: 'Home Visit'},
      ],
    },
  ];
  const scheduleData = [
    {
      day: 'Monday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM', type: 'Home Visit'},
        {startTime: '1:00 PM', endTime: '4:00 PM', type: 'Tele Consult'},
        {startTime: '5:00 PM', endTime: '8:00 PM', type: 'Home Visit'},
      ],
    },
    {
      day: 'Tuesday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM', type: 'Home Visit'},
        {startTime: '1:00 PM', endTime: '4:00 PM', type: 'Tele Consult'},
        {startTime: '5:00 PM', endTime: '8:00 PM', type: 'Home Visit'},
      ],
    },
    {
      day: 'Wednesday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM', type: 'Home Visit'},
        {startTime: '1:00 PM', endTime: '4:00 PM', type: 'Tele Consult'},
        {startTime: '5:00 PM', endTime: '8:00 PM', type: 'Home Visit'},
      ],
    },
    {
      day: 'Thusday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM', type: 'Home Visit'},
        {startTime: '1:00 PM', endTime: '4:00 PM', type: 'Tele Consult'},
        {startTime: '5:00 PM', endTime: '8:00 PM', type: 'Home Visit'},
      ],
    },
    {
      day: 'Friday',
      slots: [
        {startTime: '9:00 AM', endTime: '12:00 PM', type: 'Home Visit'},
        {startTime: '1:00 PM', endTime: '4:00 PM', type: 'Tele Consult'},
        {startTime: '5:00 PM', endTime: '8:00 PM', type: 'Home Visit'},
      ],
    },
  ];
  const pickerData = Array.from({length: 24}, (_, i) => ({
    index: i,
    value: `${i}:00`,
  }));
  const [selectedTime, setSelectedTime] = useState({value: '0:00', index: 0});
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <BottomSheetModalProvider>
        <View className="flex-1 bg-white px-6">
          <View className="flex-1">
            <ScrollView>
              <View className="mt-[15px] mb-2 ">
                <RegistrationProgressBar screenNo={5} />
              </View>

              <View>
                <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f]">
                  schedule your work week
                </Text>
              </View>
              <View className="w-[269px]">
                <Text className="text-[26px] font-PTSans-Bold text-[#1C222F] mt-[10px]">
                  Schedule your work for a week?
                </Text>
              </View>
              <Text className="text-[14px] font-Nunito-Regular text-[#7f7f7f] w-[253px] mt-[9px]">
                Please set your start and end dates when your are available to
                work
              </Text>
              <ScrollView horizontal>
                <View className="flex-1 flex-row items-center gap-[10px] mt-4">
                  {weekDays.map((day, index) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => toggleDaySelection(day)}>
                        <View
                          className={`w-[44px] h-[54px] border border-pastelgreyBorder rounded-[10px] flex items-center justify-center ${
                            isSelected ? 'bg-primary' : 'bg-pastelGrey'
                          }`}>
                          <Text
                            className={
                              isSelected
                                ? 'text-white font-Nunito-Bold'
                                : 'text-[#7f7f7f]'
                            }>
                            {day}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>

              <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-[20px] mt-[20px] mb-[15px]">
                <View className="flex flex-row justify-between items-center mt-[20px] ml-[16px] mb-[20px]">
                  <Text className="text-[15px] font-Nunito-Bold">
                    Use same hours for all days
                  </Text>
                  <Switch
                    trackColor={{false: '#767577', true: primary}}
                    thumbColor={isEnabled ? '#f7f7f7' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    className="mr-[12px]"
                  />
                </View>
              </View>
              {isEnabled ? (
                <FlatList
                  data={hoursData}
                  keyExtractor={item => item.title}
                  renderItem={({item}) => (
                    <View className="mb-5">
                      <Text className="text-[16px] font-bold text-black mb-2">
                        {item.title}
                      </Text>

                      {/* Grey Background Box */}
                      <View className="bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-3">
                        {item.hourSlot.map((slot, index) => (
                          <View
                            key={index}
                            className="flex-row justify-between items-center py-2">
                            <View className="flex-row gap-2">
                              <TouchableOpacity
                                onPress={() => setTimeModalVisible(true)}>
                                <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px]">
                                  {slot.startTime}
                                </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => setTimeModalVisible(true)}>
                                <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px]">
                                  {slot.endTime}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={visitOpenModal}>
                              <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px]">
                                {slot.type}
                              </Text>
                            </TouchableOpacity>
                            {index === item.hourSlot.length - 1 ? (
                              <TouchableOpacity>
                                <Image
                                  source={require('../../../assets/images/secondaryAdd.png')}
                                  className="w-[14px] h-[14px]"
                                  style={{tintColor: primary}}
                                />
                              </TouchableOpacity>
                            ) : (
                              <View className="w-[14px] h-[14px]" />
                            )}
                            <TouchableOpacity>
                              <Image
                                source={require('../../../assets/images/deleteImage.png')}
                                className="w-[10px] h-[14px]"
                                style={{tintColor: darkGrey}}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                />
              ) : (
                <FlatList
                  data={scheduleData}
                  keyExtractor={item => item.day}
                  renderItem={({item}) => (
                    <View className="mb-5">
                      <Text className="text-[16px] font-bold text-black mb-2">
                        {item.day}
                      </Text>

                      {/* Grey Background Box */}
                      <View className="bg-pastelGrey border border-pastelgreyBorder rounded-[15px] p-3">
                        {item.slots.map((slot, index) => (
                          <View
                            key={index}
                            className="flex-row justify-between items-center py-2">
                            <View className="flex-row gap-2">
                              <TouchableOpacity
                                onPress={() => setTimeModalVisible(true)}>
                                <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px]">
                                  {slot.startTime}
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => setTimeModalVisible(true)}>
                                <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px]">
                                  {slot.endTime}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={visitOpenModal}>
                              <Text className="text-[14px] text-black bg-white px-3 py-2 rounded-[8px]">
                                {slot.type}
                              </Text>
                            </TouchableOpacity>
                            {index === item.slots.length - 1 ? (
                              <TouchableOpacity>
                                <Image
                                  source={require('../../../assets/images/secondaryAdd.png')}
                                  className="w-[14px] h-[14px]"
                                  style={{tintColor: primary}}
                                />
                              </TouchableOpacity>
                            ) : (
                              <View className="w-[14px] h-[14px]" />
                            )}
                            <TouchableOpacity>
                              <Image
                                source={require('../../../assets/images/deleteImage.png')}
                                className="w-[10px] h-[14px]"
                                style={{tintColor: darkGrey}}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                />
              )}

              <TouchableOpacity
                className="mt-[66px] mb-[200px] "
                onPress={openModal}>
                <Text className="text-[14px] text-center font-Nunito-Regular text-[#000000] underline">
                  Skip for now
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="flex bg-[white] px-6">
            <View className="items-center flex flex-col ">
              <Text className="w-[158px] h-[67px] bg-[#f5f3f0] text-center rounded-[10px] mt-[60px] ml-[117px] mr-[118px]"></Text>
              <Text className="text-[20px] w-[336px] font-Nunito-Regular text-[#000000] mt-[20px] ml-[29px]">
                Your profile will not be activated for business without defining
                your Zumigo schedule. Please complete your schedule setup.
              </Text>
            </View>
          </View>
          <View className=" mt-[150px] px-6">
            <FooterBtn title="ok" onClick={closeModal} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
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
            navigation.navigate(screens.ServicesAndPricings);
          }}>
          <Text className="text-[20px] text-white font-Nunito-Bold text-center">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={visitBottomSheetRef}
        snapPoints={visitSnapPoint}
        backdropComponent={({style}) => (
          <View style={[style, {backgroundColor: 'rgba(0,0,0,0.5)'}]} />
        )}>
        <BottomSheetView>
          <View className="p-5">
            {/* Header */}
            <Text className="text-lg font-bold text-black mb-4">Select</Text>

            {/* Tele Consult Option */}
            <TouchableOpacity className="flex-row justify-between items-center py-3 border-b border-gray-300">
              <Text className="text-[16px] text-red-500">Tele Consult</Text>
              <Image
                source={require('../../../assets/images/footPrint.png')} // Replace with correct path
                className="w-5 h-5"
              />
            </TouchableOpacity>

            {/* Home Visit Option */}
            <TouchableOpacity className="py-3">
              <Text className="text-[16px] text-black">Home Visit</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <Modal
        visible={isTimeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setTimeModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              // padding: 20,
            }}>
            <View className="flex flex-row items-center justify-between bg-pastelGrey rounded-2xl ">
              <Text className="font-Nunito-Bold text-[18px] pt-[10px] pb-[10px] pl-[10px]">
                Select Time
              </Text>
              <TouchableOpacity onPress={handleTimeSelect}>
                <Text className="text-[19px] text-primary font-PTSans-Bold pt-[10px] pb-[10px] pr-[10px]">
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>

            {/* ✅ Time Pickers */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 50,
                marginTop: 0,
              }}>
              {/* Hours */}
              <WheelPicker
                data={hourdata}
                selectedIndex={selectedHourIndex}
                onChange={index => setSelectedHourIndex(index)}
                overlayItemStyle={{backgroundColor: '#00000000'}}
              />

              {/* Minutes */}
              <WheelPicker
                data={mindata}
                selectedIndex={selectedMinuteIndex}
                onChange={index => setSelectedMinuteIndex(index)}
                overlayItemStyle={{backgroundColor: '#00000000'}}
              />

              {/* AM/PM */}
              <WheelPicker
                data={amPmData}
                selectedIndex={selectedAmPmIndex}
                onChange={index => setSelectedAmPmIndex(index)}
                overlayItemStyle={{backgroundColor: '#00000000'}}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ScheduleWeek;

const styles = StyleSheet.create({
  // container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {backgroundColor: 'blue', padding: 12, borderRadius: 8},
  buttonText: {color: 'white', fontSize: 16},
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,

    margin: 20,
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  pickerContainer: {flexDirection: 'row', alignItems: 'center'},
  separator: {fontSize: 18, marginHorizontal: 10},
  picker: {width: 80, height: 150},
  confirmButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  confirmButtonText: {color: 'white', fontSize: 16},
});
