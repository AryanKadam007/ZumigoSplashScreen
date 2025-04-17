import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import screens from '../../constants/screens';
import images from '../../assets/images';
import CTACarousel from '../../components/PetParentDashboard/Carousel/CTACarousel';
import TopSpecialistsCard from '../../components/PetParentDashboard/TopSpecialistsCard';
import ImageCarousel from '../../components/PetParentDashboard/Carousel/ImageCarousel';
import ParallaxCarousel from '../../components/PetParentDashboard/Carousel/ParallaxCarousel';
import WaveSvg from '../../assets/svgs/WaveSvg';
import YourAppointmentCard from '../../components/PetParentDashboard/YourAppointmentCard';

const doctors = [
  {
    id: '1',
    name: 'Dr. Manisha',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 134,
    image: images.VetImage2,
  },
  {
    id: '2',
    name: 'Dr. Esha Singh',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 114,
    image: images.VetImage2,
  },
  {
    id: '3',
    name: 'Dr. Preeti Jain',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 134,
    image: images.VetImage2,
  },
  {
    id: '4',
    name: 'Dr. Sunil Krishna',
    degree: 'Master Of Veterinary Science',
    rating: '4.9/5',
    reviews: 142,
    image: images.VetImage2,
  },
];

const advTwoData = [
  {
    image: images.AD2,
  },
  {
    image: images.AD2,
  },
  {
    image: images.AD2,
  },
  {
    image: images.AD2,
  },
];

const advOneData = [
  {
    image: images.AD1,
  },
  {
    image: images.AD1,
  },
  {
    image: images.AD1,
  },
  {
    image: images.AD1,
  },
];

const categories = [
  {id: '1', name: 'Vaccinations', icon: images.VaccinationsSpe},
  {id: '2', name: 'Lab Diagnostic', icon: images.GroomingSpe},
  {id: '3', name: 'Grooming', icon: images.GroomingSpe},
  {id: '4', name: 'Pharmacy', icon: images.PharmacySpe},
];

const Dashboard = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  return (
    <View className="flex-1 bg-[#f2f6f7]">
      <ScrollView
        className="flex-1  "
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}>
        {/* header section  */}
        <View className="ml-[14px] mr-[12px] mt-[7px] mb-[3px] flex-row items-center justify-between">
          {/* drawer open  user name */}
          <View className=" flex-row gap-[18px] items-center">
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={images.drawerIcon}
                className=" w-10 h-[37px]"
                // style={{tintColor: '#d75880'}}
              />
            </TouchableOpacity>
            <Text className=" text-[25px] font-Nunito-Regular text-[#333333] ">
              Hello,
              <Text className="font-Nunito-Regular text-[#333333]">Tapan</Text>
              <Text className="w-[20px]">!</Text>
            </Text>
          </View>

          {/* location , support and notification  */}

          <View className=" flex-row gap-[25px]">
            <Image
              source={images.contactusIcon}
              className=" w-[27px] h-[31px]"
              resizeMode="contain"
              // style={{tintColor: '#d75880'}}
            />
            <Image
              source={images.notificationIcon}
              className=" w-[31px] h-[31px]"
              resizeMode="contain"
              // style={{tintColor: '#d75880'}}
            />
            {/* <TouchableOpacity
              onPress={() => navigation.navigate(screens.Notification)}>
              <Image
                source={images.notification}
                className=" w-[30px] h-[31px]"
                resizeMode="contain"
                style={{tintColor: '#d75880'}}
              />
            </TouchableOpacity> */}
          </View>
        </View>

        {/* intro section  */}
        <View className="flex flex-row items-center">
          <View className=" pt-10 ml-4 mr-[6px] mb-[25px] w-[160px] ">
            <Text className=" font-Nunito-Bold text-primary text-[20px] leading-6">
              STRESS-FREE, IN-HOME
            </Text>
            <Text className=" font-Nunito-Bold text-primary text-[20px] leading-6 mb-[5px]">
              VETERINARY CARE
            </Text>
            <Text className=" w-[139px] text-[16px] leading-[19.5px] text-[#333333] font-Nunito-Regular mt-[17px]">
              Minimize your pet’s fear and anxiety with doorstep veterinary and
              pet care services, all from the comfort of your home.
            </Text>
          </View>
          <View className=" bg-[#f2f6f7] ">
            <Image
              source={images.dogIcon}
              className=" rounded-full bg-[#f2f6f7]"
              style={{width: 185, height: 250}}
              // tintColor="#f2f6f7"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* vet booking  */}

        <View className="px-[10px] flex-row gap-[10px] mb-[26px]">
          <TouchableOpacity
            className=" bg-primary h-[50px] flex-1 rounded-[50px] items-center flex-row gap-2"
            onPress={() => navigation.navigate(screens.ServiceSelection)}>
            <Image
              source={images.homeVisit}
              className=" w-[28px] h-[23px] ml-[20px]"
              resizeMode="contain"
            />
            <Text className=" text-[15px] font-Nunito-Bold text-white">
              Home Visit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className=" bg-primary h-[50px] flex-1 rounded-[50px] items-center flex-row  w-[190px]"
            onPress={() => navigation.navigate(screens.AddYourPet)}>
            <Image
              source={images.consultOnline}
              className=" w-[42px] h-[30px] ml-[4px]"
              resizeMode="contain"
            />
            <Text className=" text-[15px] font-Nunito-Bold text-white pr-[20px]">
              Teleconsultation
            </Text>
          </TouchableOpacity>
        </View>

        {/* services  */}

        {/* <View className="ml-[22px] mr-[17px] ">
          <View className=" flex-row gap-5">
            <TouchableOpacity
              // className=" flex-1 aspect-[181/173]"
              onPress={() =>
                navigation.navigate(screens.SelectPet, {
                  header: 'Grooming service',
                })
              }>
              <Image
                source={images.groomingIcon}
                // className=" flex-1 aspect-[181/173]"
                style={{
                  width: 120,
                  height: 149,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity className=" flex-1 aspect-[181/173]">
              <Image
                source={images.petFood}
                className=" flex-1 aspect-[181/173]"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View className=" flex-row gap-5 mt-3">
            <Text className=" text-center font-Proxima-Nova-Bold text-[20px] leading-6">
              Grooming
            </Text>
            <Text className="  text-center font-Proxima-Nova-Bold text-[20px] leading-6">
              Food
            </Text>
          </View>
        </View> */}
        <ScrollView horizontal>
          <View className="flex flex-row items-center px-1 gap-[5px]">
            <View className="flex flex-col items-center gap-[5px]">
              <Image
                source={images.groomingIcon}
                style={{
                  width: 115,
                  height: 120,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
              />
              <Text className="text-[16px] font-Nunito-Regular ">Grooming</Text>
            </View>
            <View className="flex flex-col items-center gap-[5px]">
              <Image
                source={images.foodIcon}
                style={{
                  width: 115,
                  height: 120,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
              />
              <Text className="text-[16px] font-Nunito-Regular ">
                Fresh Food
              </Text>
            </View>
            <View className="flex flex-col items-center gap-[5px]">
              <Image
                source={images.radiologyIcon}
                style={{
                  width: 115,
                  height: 120,
                  resizeMode: 'cover',
                  borderRadius: 20,
                }}
              />
              <Text className="text-[16px] font-Nunito-Regular ">
                Radiology
              </Text>
            </View>
          </View>
        </ScrollView>

        <View className=" mx-6">
          <YourAppointmentCard />
        </View>

        {/* cta carousel  */}

        <View className=" mt-4 mb-[18px]">
          <CTACarousel data={[1, 2, 3]} />
        </View>

        {/* white  background  */}
        <View className=" rounded-t-[25px] bg-white flex-1">
          {/* Top Specialist  */}

          <View className=" px-4 mb-[12px]">
            <Text className=" mt-[9px] font-Proxima-Nova-Bold text-[24px] leading-[48px]">
              Top Specialists
            </Text>
            {/* Category Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-3">
              {categories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  className={`px-4 py-2 mr-2 rounded-2xl border flex-row items-center gap-[6.5px] ${
                    selectedCategory == category.id
                      ? 'bg-primary border-primary'
                      : 'bg-pastelGrey border-pastelgreyBorder'
                  }`}
                  onPress={() => setSelectedCategory(category.id)}>
                  <View
                    className={` h-[28px] w-[28px] rounded-full justify-center items-center  ${
                      selectedCategory == category.id
                        ? 'bg-[#ffffff1A]'
                        : 'bg-pastelPrimary'
                    }`}>
                    <Image
                      source={category.icon}
                      className=" w-[14px] h-[14px]"
                      resizeMode="contain"
                      style={{
                        tintColor:
                          selectedCategory == category.id
                            ? '#ffffff'
                            : '#d75880',
                      }}
                    />
                  </View>
                  <Text
                    className={`font-Nunito-Regular ${
                      selectedCategory == category.id
                        ? 'text-white'
                        : 'text-gray-500'
                    }`}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View className=" mt-[9px]">
              {doctors.map(doctor => (
                <TopSpecialistsCard key={doctor.id} doctor={doctor} />
              ))}
            </View>
          </View>

          {/* offer card  */}
          {/* <View className=" mt-[15px] mb-[30px]">
            <View className=" mb-[-1px]">
              <WaveSvg />
            </View>
            <ParallaxCarousel />
            <View
              style={{transform: [{rotate: '180deg'}]}}
              className=" mt-[-1px]">
              <WaveSvg />
            </View>
          </View> */}

          {/* how it work  */}
          <Text className=" px-4 font-Proxima-Nova-Bold text-[20px] leading-6 text-[#4E4E4E] mb-[18px]">
            How it Works?
          </Text>
          <View className=" mb-6">
            <ImageCarousel data={advOneData} aspectRatio={39 / 15} />
          </View>

          <View className=" mb-6 pb-36">
            <ImageCarousel data={advTwoData} aspectRatio={403 / 213} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
