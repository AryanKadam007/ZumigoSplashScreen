import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import React, {useRef, useState} from 'react';
import images from '../../../assets/images';
import FooterBtn from '../../../components/shared/FooterBtn';
import AddressDetailCard from '../../../components/appointment/AddressDetailCard';
import PaymentSummaryCard from '../../../components/appointment/PaymentSummaryCard';
import PetDetailCard from '../../../components/appointment/PetDetailCard';
import CancellationRefundCard from '../../../components/appointment/CancellationRefundCard';
import TermAndConditions from '../../../components/BottomSheets/TermAndConditions';
import PaymentSuccessful from '../../../components/BottomSheets/PaymentSuccessful';
import VetBookingServices from '../../../components/BottomSheets/VetBookingServices';
import PetSymptoms from '../../../components/BottomSheets/PetSymptoms';

const BookAppointment = ({navigation}) => {
  const bottomSheetRef = useRef(null);
  const termBottomSheetRef = useRef(null);
  const serviceBottomSheetRef = useRef(null);
  const paymentBottomSheetRef = useRef(null);
  const [accepted, setAccepted] = useState(false);

  return (
    <View className="flex-1 bg-white px-6">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}>
        {/* title  */}
        <View className="mt-[27px] mb-[14px]">
          <Text className=" text-[16px] font-semibold text-black font-Nunito-Bold">
            Vet Details
          </Text>
        </View>

        {/* veterian card  */}

        <View className="pt-[15px] pl-[10px] pb-3 pr-3 bg-pastelGrey border border-pastelgreyBorder rounded-2xl">
          <View className="flex flex-row gap-[14px]">
            <Image
              source={images.VetImage}
              className="h-[59px] w-[59px] rounded-[10px]"
            />
            <View>
              <Text className="text-[16px] font-semibold mb-[7px]  leading-none font-Nunito-Bold">
                Dr. Jeevan Kumar
              </Text>
              <Text className="text-[14px] font-normal mb-[6px] opacity-50 font-Nunito-Regular">
                Master of veterinary science
              </Text>

              <Text className="text-[14px] font-medium  text-black font-Nunito-Regular">
                4.9/5{' '}
                <Text className="text-[14px] font-normal text-gray-800 font-Nunito-Regular">
                  (134 Review)
                </Text>
              </Text>
            </View>
          </View>

          {/* line  */}
          <View className="mt-[11px] mb-[10px] border-t-[0.75px] border-pastelgreyBorder"></View>

          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row gap-[6.8px] items-center">
              {/* image  */}
              <Image source={images.timedate} className="w-[18.18px] h-4 " />
              <Text className=" font-medium text-darkGunmetal leading-[17px] font-Nunito-Regular">
                Wednesday, 24, April, 2024 | 8:00 AM
              </Text>
            </View>
            <TouchableOpacity
              className="px-[13px] py-[6px] border border-primary rounded-md"
              onPress={() => navigation.goBack()}>
              <Text className="text-primary text-[12px] font-medium font-Nunito-Regular">
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* pet detail  */}

        <Text className=" text-[16px] font-semibold text-black mt-5 mb-3 font-Nunito-Bold">
          Pet Details
        </Text>
        {/* Pet details  */}
        <PetDetailCard onClick={() => bottomSheetRef.current?.present()} />

        {/* Service details  */}
        <TouchableOpacity
          className="py-5 px-[17px]  bg-pastelGrey border border-pastelgreyBorder rounded-2xl my-[15px]"
          onPress={() => {
            serviceBottomSheetRef.current?.present();
          }}>
          <View className="flex-row justify-between items-center">
            <View className="flex flex-row gap-[12.7px] items-center">
              <Image
                source={images.services}
                className="h-[18px] w-[16.29px]"
              />
              <View>
                <Text className=" font-Nunito-Regular">Service details </Text>
              </View>
            </View>
            {/* right arrow  */}
            <Image
              source={images.secondaryBack}
              resizeMode="contain"
              style={{height: 14, width: 24}}
            />
          </View>
        </TouchableOpacity>

        {/* Payment summary  */}
        <Text className="text-[16px] font-semibold mb-[14px] font-Nunito-Bold">
          Payment summary
        </Text>

        <View className="mb-5">
          <PaymentSummaryCard />
        </View>

        {/* Address  */}
        <Text className="text-[16px] font-semibold mb-[12px] font-Nunito-Bold">
          Address
        </Text>
        <AddressDetailCard change={true} />

        {/* Cancellation & reschedule policy  */}

        <Text className="mt-5 mb-[14px] text-[16px] font-semibold font-Nunito-Bold">
          Cancellation & reschedule policy
        </Text>
        <View className="mb-[31px]">
          <CancellationRefundCard />
        </View>

        <View className="mb-[31px]">
          <View className=" bg-pastelGrey border border-pastelgreyBorder rounded-2xl p-4 flex-row items-start gap-3 ">
            <Image
              source={images.information}
              className="w-5 h-5"
              style={{tintColor: '#d75880'}}
            />
            <Text className=" opacity-50 text-black font-Nunito-Regular mr-4">
              Disclaimer: If your pet is having an emergency, such as excessive
              vomiting or diarrhea, traumatic injury, difficulty breathing,
              trouble urinating or defecating, please contact your local
              veterinary emergency hospital.
            </Text>
          </View>
        </View>

        {/* term and condition  */}
        <View className="flex flex-row items-center gap-3 mb-[150px]">
          <Switch
            trackColor={{false: '#E7ECF7', true: '#d75880'}}
            thumbColor={true ? '#fff' : '#fff'}
            value={accepted}
            onValueChange={() => setAccepted(!accepted)}
          />

          <View className=" flex-row">
            <Text className=" text-darkGunmetal text-[16px] font-Nunito-Regular">
              I accept the{' '}
            </Text>
            <TouchableOpacity
              onPress={() => termBottomSheetRef.current?.present()}>
              <Text className="underline text-primary text-[16px] font-Nunito-Regular">
                terms and conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* pay btn  */}
      <FooterBtn
        title="Proceed to Pay"
        disabled={!accepted}
        onClick={() => {
          paymentBottomSheetRef.current?.present();
        }}
      />
      {/* BottomSheet  */}
      <PetSymptoms innerRef={bottomSheetRef} />
      <TermAndConditions innerRef={termBottomSheetRef} />
      <VetBookingServices innerRef={serviceBottomSheetRef} />
      <PaymentSuccessful
        innerRef={paymentBottomSheetRef}
        details={{
          service: 'Home visit',
          serviceDetail: 'Vet visit, Vaccination',
          date: 'April 24, 2024',
          time: '09:00 AM - 10:00 AM',
        }}
        provider={{
          image: images.VetImage,
          name: 'Dr. Jeevan Kumar',
          work: ' Master of Veterinary Science',
        }}
      />
    </View>
  );
};

export default BookAppointment;
