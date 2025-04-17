import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Boxes from '../../../components/vetRegistrationComponents/Boxes';
import OnGoingAppointment from '../../../components/vetRegistrationComponents/onGoingAppointment';
import CircleDesign from '../../../components/vetRegistrationComponents/CircleDesign';
import AppointmentComponent from '../../../components/vetRegistrationComponents/AppointmentComponent';
import CalendarComponent from '../../../components/vetRegistrationComponents/CalendarComponent';
import AddvertisementCards from '../../../components/vetRegistrationComponents/AddvertisementCards';
import screens from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import BottomNavigation from '../../../components/shared/BottomNavigation';
import {primary} from '../../../assets/theme/colors';
const VetDashboard = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView>
        <View className=" flex-col">
          <Text className=" text-[16px] text-[#000000] font-PTSans-Bold mt-[10px]">
            Summary
          </Text>
          <ScrollView horizontal>
            <View className="flex flex-row gap-[4px] mt-[14px]">
              <Boxes title="Pets served" number="90" color="#fde8d3" />
              <Boxes title="Total Appointments" number="132" color="#f0e2f9" />
              <Boxes title="Completed" number="122" color="#ffedf9" />
            </View>
          </ScrollView>
          <Text className=" text-[16px] text-[#000000] font-PTSans-Bold mt-[30px] mb-[14px]">
            On Going Appointment
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(screens.HomeVisitScreen)}>
            <OnGoingAppointment
              title="Booked Servides - Vet Visit"
              date="April 24, 2024"
              time="08:00 AM - 09:00 AM"
            />
          </TouchableOpacity>
          <View className=" h-[40px]  mt-[33px] flex flex-row justify-between items-center">
            <Text className="font-PTSans-Bold text-[16px] text-[#000000]">
              Earnings
            </Text>
            <View className="flex flex-row items-center gap-[8px] w-[110px] h-[39px]  border border-pastelgreyBorder rounded-[20px] bg-[#f3f6f7]">
              <Text className=" ml-[12px] mt-[8px] mb-[7px] text-center font-Nunito-Regular">
                This month
              </Text>
              <Image
                source={require('../../../assets/images/downArrow.png')}
                style={{tintColor: primary}}
                className="w-[10px] h-[5px]"
              />
            </View>
          </View>
          <View className="flex  h-[159.12px] bg-pastelGrey border border-pastelgreyBorder  mt-[14.2px] rounded-[20px] ">
            <CircleDesign />
          </View>
          <View className="flex-row items-center justify-between  h-[79px]  bg-pastelGrey border border-pastelgreyBorder mt-[29.9px] rounded-[20px]">
            <View className="flex flex-row items-center justify-between ml-[20px] mt-[20.8px] mb-[13.1px] ">
              <View className="flex flex-col gap-[3px]">
                <Text className="text-[12px] font-Nunito-Regular text-[#787A82]">
                  Average Earning by Vet
                </Text>
                <View className=" h-[21px] flex flex-row items-center justify-center mb-[20.2px] ">
                  <Text className="text-[16px] font-Nunito-Bold text-[#000000]">
                    80,574.00/
                  </Text>
                  <Text className="text-[12px] text-[#787A82] font-Nunito-Regular mt-[3px]">
                    Per month
                  </Text>
                </View>
              </View>
            </View>
            <Image
              source={require('../../../assets/images/EarningImage.png')}
              className="w-[68.63px] h-[60.1px] mr-[36.4px]  "
            />
          </View>
          <View className=" h-[40px]  mt-[33px] flex flex-row justify-between items-center">
            <Text className="font-PTSans-Bold text-[16px] text-[#000000]">
              Appointments
            </Text>
            <View className="flex flex-row items-center gap-[8px] w-[110px] h-[39px]  border border-pastelgreyBorder rounded-[20px] bg-[#f3f6f7] mb-[10.2px]">
              <Text className=" ml-[12px] mt-[8px] mb-[7px] text-center font-Nunito-Regular">
                This month
              </Text>
              <Image
                source={require('../../../assets/images/ArrowDown.png')}
                className="w-[10px] h-[5px]"
              />
            </View>
          </View>

          <AppointmentComponent />
          <Text className="font-PTSans-Bold text-[16px] text-[#000000]  mt-[19.7px] mb-[14px]">
            Appointments
          </Text>
          <View>
            <CalendarComponent />
          </View>
        </View>
        <AddvertisementCards />
      </ScrollView>
      <BottomNavigation />
    </View>
  );
};

export default VetDashboard;

const styles = StyleSheet.create({});
