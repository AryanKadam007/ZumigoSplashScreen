import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import screens from '../../constants/screens';
import PetParentsDrawer from './Drawer/PetParentsDrawer';
import SelectVeterinarian from '../../screens/PetParents/Veterinarian/SelectVeterinarian';
import VeterinarianInfo from '../../screens/PetParents/Veterinarian/VeterinarianInfo';
import SelectDateTime from '../../screens/PetParents/Veterinarian/SelectDateTime';
import BookAppointment from '../../screens/PetParents/Veterinarian/BookAppointment';
import Pets from '../../screens/PetParents/Pets/Pets';
import PetProfile from '../../screens/PetParents/Pets/PetProfile';
import Address from '../../screens/PetParents/Address/Address';
import MedicalRecords from '../../screens/PetParents/MedicalRecords/MedicalRecords';
import MedicalRecordDetails from '../../screens/PetParents/MedicalRecords/MedicalRecordDetails';
import AddAddress from '../../screens/PetParents/Address/AddAddress';
import Appointments from '../../screens/PetParents/Appointments/Appointments';
import EditAddress from '../../screens/PetParents/Address/EditAddress';
import {Image} from 'react-native';
import images from '../../assets/images';
import EditPetDetails from '../../screens/PetParents/Pets/EditPetDetails';
import BookingScheduled from '../../screens/PetParents/Appointments/BookingScheduled';
import BookingCompleted from '../../screens/PetParents/Appointments/BookingCompleted';
import AppointmentCancellation from '../../screens/PetParents/Appointments/AppointmentCancellation';
import Settings from '../../screens/PetParents/Menu/Settings';
import ContactUs from '../../screens/PetParents/Menu/ContactUs';
import TermsConditions from '../../screens/PetParents/Menu/TermsConditions';
import PrivacyPolicy from '../../screens/PetParents/Menu/PrivacyPolicy';
import Vaccinations from '../../screens/PetParents/Vaccinations/Vaccinations';
import Profile from '../../screens/PetParents/ParentProfile/Profile';
import AddYourPet from '../../screens/PetParents/TeleConsultation/AddYourPet';
import SelectSymptoms from '../../screens/PetParents/TeleConsultation/SelectSymptoms';
import ParentDetails from '../../screens/PetParents/TeleConsultation/ParentDetails';
import SelectPet from '../../screens/PetParents/GroomingAndRadiology/SelectPet';
import ChooseService from '../../screens/PetParents/GroomingAndRadiology/ChooseService';
import ServiceSelection from '../../screens/PetParents/HomeVisit/ServiceSelection';
import AddYourAddress from '../../screens/PetParents/HomeVisit/AddYourAddress';
import FillAddressDetails from '../../screens/PetParents/HomeVisit/FillAddressDetails';
import Notification from '../../screens/PetParents/Menu/Notification';
import VaccinationsTimeLine from '../../screens/PetParents/Vaccinations/VaccinationsTimeLine';
import VaccinationDetails from '../../screens/PetParents/Vaccinations/VaccinationDetails';
import AddVaccinationDetails from '../../screens/PetParents/Vaccinations/AddVaccinationDetails';
import VaccinationHistory from '../../screens/PetParents/Vaccinations/VaccinationHistory';
import EditProfile from '../../screens/PetParents/ParentProfile/EditProfile';
import BookingCancelled from '../../screens/PetParents/Appointments/BookingCancelled';
import AddMedicalRecords from '../../screens/PetParents/MedicalRecords/AddMedicalRecords';
import ChangeAddress from '../../screens/PetParents/Address/ChangeAddress';
import ChooseProvider from '../../screens/PetParents/GroomingAndRadiology/ChooseProvider';
import GroomingDateTime from '../../screens/PetParents/GroomingAndRadiology/GroomingDateTime';
import AppointmentReschedule from '../../screens/PetParents/Appointments/AppointmentReschedule';
import GroomingServices from '../../screens/PetParents/GroomingAndRadiology/GroomingServices';
import PaymentMethods from '../../screens/PetParents/Menu/PaymentMethods';

const Stack = createStackNavigator();

const PetParentsNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleStyle: {
          fontFamily: 'Proxima-Nova-Semibold',
          fontSize: 18,
        },
        headerBackImage: () => (
          <Image
            source={images.BackBtn}
            className="w-[7.51px] h-[14.51px] ml-[14px]"
            style={{tintColor: '#1C222F'}}
          />
        ),
      }}>
      <Stack.Screen
        name={screens.Dashboard}
        component={PetParentsDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screens.SelectVeterinarian}
        component={SelectVeterinarian}
        options={{title: 'Select Veterinarian'}}
      />
      <Stack.Screen
        name={screens.VeterinarianInfo}
        component={VeterinarianInfo}
        options={{title: 'Veterinarian'}}
      />
      <Stack.Screen
        name={screens.SelectDateTime}
        component={SelectDateTime}
        options={{title: 'Select date and time'}}
      />
      <Stack.Screen
        name={screens.BookAppointment}
        component={BookAppointment}
        options={{title: 'Book an Appointment'}}
      />
      <Stack.Screen
        name={screens.Settings}
        component={Settings}
        options={{title: 'Settings'}}
      />
      <Stack.Screen
        name={screens.ContactUs}
        component={ContactUs}
        options={{title: 'Contact Us'}}
      />
      <Stack.Screen
        name={screens.TermsConditions}
        component={TermsConditions}
        options={{title: 'Terms & Conditions'}}
      />
      <Stack.Screen
        name={screens.PrivacyPolicy}
        component={PrivacyPolicy}
        options={{title: 'Privacy policy'}}
      />
      <Stack.Screen name={screens.Pets} component={Pets} />
      <Stack.Screen
        name={screens.PetProfile}
        component={PetProfile}
        options={{title: 'Pets'}}
      />
      <Stack.Screen
        name={screens.EditPetDetails}
        component={EditPetDetails}
        options={{title: 'Edit Pet Details'}}
      />
      <Stack.Screen
        name={screens.Address}
        component={Address}
        options={{title: 'Address'}}
      />
      <Stack.Screen
        name={screens.MedicalRecords}
        component={MedicalRecords}
        options={{title: 'Medical Records'}}
      />
      <Stack.Screen
        name={screens.MedicalRecordDetails}
        component={MedicalRecordDetails}
        options={{title: 'Medical Records'}}
      />
      <Stack.Screen
        name={screens.AddAddress}
        component={AddAddress}
        options={{title: 'Address'}}
      />
      <Stack.Screen
        name={screens.Appointments}
        component={Appointments}
        options={{title: 'Appointments'}}
      />
      <Stack.Screen
        name={screens.EditAddress}
        component={EditAddress}
        options={{title: 'Edit Address'}}
      />
      <Stack.Screen
        name={screens.BookingScheduled}
        component={BookingScheduled}
        options={{title: 'Booking details'}}
      />
      <Stack.Screen
        name={screens.BookingCompleted}
        component={BookingCompleted}
        options={{title: 'Booking details'}}
      />
      <Stack.Screen
        name={screens.AppointmentCancellation}
        component={AppointmentCancellation}
        options={{title: 'Appointment Cancellation'}}
      />
      <Stack.Screen
        name={screens.Vaccinations}
        component={Vaccinations}
        options={{title: 'Vaccinations'}}
      />
      <Stack.Screen
        name={screens.Profile}
        component={Profile}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name={screens.AddYourPet}
        component={AddYourPet}
        options={{title: 'Tele consultation'}}
      />

      <Stack.Screen
        name={screens.SelectSymptoms}
        component={SelectSymptoms}
        options={{title: 'Tele consultation'}}
      />

      <Stack.Screen
        name={screens.ParentDetails}
        component={ParentDetails}
        options={{title: 'Tele consultation'}}
      />
      <Stack.Screen
        name={screens.SelectPet}
        component={SelectPet}
        options={{title: 'Grooming service'}}
      />
      <Stack.Screen
        name={screens.ChooseService}
        component={ChooseService}
        options={{title: 'Grooming service'}}
      />
      <Stack.Screen
        name={screens.ServiceSelection}
        component={ServiceSelection}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.AddYourAddress}
        component={AddYourAddress}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.FillAddressDetails}
        component={FillAddressDetails}
        options={{title: 'Home Visit'}}
      />
      <Stack.Screen
        name={screens.Notification}
        component={Notification}
        options={{title: 'Notification'}}
      />
      <Stack.Screen
        name={screens.VaccinationsTimeLine}
        component={VaccinationsTimeLine}
        options={{title: 'Vaccinations'}}
      />
      <Stack.Screen
        name={screens.VaccinationDetails}
        component={VaccinationDetails}
        options={{title: 'Vaccinations'}}
      />
      <Stack.Screen
        name={screens.AddVaccinationDetails}
        component={AddVaccinationDetails}
        options={{title: 'Vaccinations'}}
      />
      <Stack.Screen
        name={screens.VaccinationHistory}
        component={VaccinationHistory}
        options={{title: 'Vaccinations'}}
      />
      <Stack.Screen
        name={screens.EditProfile}
        component={EditProfile}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name={screens.BookingCancelled}
        component={BookingCancelled}
        options={{title: 'Booking Cancelled'}}
      />
      <Stack.Screen
        name={screens.AddMedicalRecords}
        component={AddMedicalRecords}
        options={{title: 'Medical Records'}}
      />
      <Stack.Screen
        name={screens.ChangeAddress}
        component={ChangeAddress}
        options={{title: 'Address'}}
      />
      <Stack.Screen
        name={screens.ChooseProvider}
        component={ChooseProvider}
        options={{title: 'Grooming service'}}
      />
      <Stack.Screen
        name={screens.GroomingDateTime}
        component={GroomingDateTime}
        options={{title: 'Grooming service'}}
      />

      <Stack.Screen
        name={screens.AppointmentReschedule}
        component={AppointmentReschedule}
        options={{title: 'Reschedule appointment'}}
      />
      <Stack.Screen
        name={screens.GroomingServices}
        component={GroomingServices}
        options={{title: 'Grooming Services'}}
      />
      <Stack.Screen
        name={screens.PaymentMethods}
        component={PaymentMethods}
        options={{title: 'Payments Methods '}}
      />
    </Stack.Navigator>
  );
};

export default PetParentsNavigation;
