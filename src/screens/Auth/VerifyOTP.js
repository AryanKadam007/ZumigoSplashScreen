import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Toast from 'react-native-toast-message';
import FooterBtn from '../../components/shared/FooterBtn';
import {user_type} from '../../constants/constants';
import {login} from '../../state/redux/slice/authSlice';
import {useDispatch} from 'react-redux';

const VerifyOTP = ({navigation, route}) => {
  const {isPartner, fetchedOtp} = route?.params;
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTime, setResendTime] = useState(90); // Countdown in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  useEffect(() => {
    startCountdown();

    if (fetchedOtp) {
      const otpArray = fetchedOtp.toString().substring(0, 4).split(''); // Convert OTP to array of digits
      setOtp(otpArray); // Auto-fill OTP input fields

      Toast.show({
        type: 'info',
        text1: 'Your OTP',
        text2: `Use OTP: ${fetchedOtp}`,
        position: 'top',
        visibilityTime: 6000,
      });

      // Automatically move focus to the last field
      setTimeout(() => {
        const lastIndex = otpArray.length - 1;
        if (inputRefs.current[lastIndex]) {
          inputRefs.current[lastIndex].focus();
        }
      }, 500);
    }
  }, [fetchedOtp]);
  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return; // Allow only numbers

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next field
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle OTP Resend
  const handleResend = () => {
    setResendTime(90);
    setIsResendDisabled(true);
    startCountdown();
  };

  // Start Countdown
  const startCountdown = () => {
    let timer = setInterval(() => {
      setResendTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  React.useEffect(() => {
    startCountdown();
  }, []);
  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('').trim(); // Convert array to string
    const apiOtp = fetchedOtp
      ? fetchedOtp.toString().substring(0, 4).trim()
      : ''; // Get first 4 digits from API OTP

    console.log('Entered OTP:', enteredOtp);
    console.log('API OTP:', apiOtp);

    if (!fetchedOtp) {
      Toast.show({
        type: 'error',
        text1: 'Error',

        text2: 'No OTP received. Please try again.',
      });
      return;
    }

    if (enteredOtp === apiOtp) {
      // Toast.show({
      //   type: 'success',
      //   text1: 'OTP Verified',
      //   text2: 'You will be redirected shortly.',
      // });

      if (isPartner) {
        dispatch(login(user_type.VET));
        navigation.navigate('PartnerDashboard'); // Navigate to partner dashboard
      } else {
        dispatch(login(user_type.PET_PARENT));
        navigation.navigate('PetParentDashboard'); // Navigate to pet parent dashboard
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter the correct OTP.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white">
      <View className="flex-1 ">
        <Text className="mt-[21px] mb-2 text-[26px] font-semibold px-6">
          Verification OTP
        </Text>
        <Text className="text-[#848A9A] mb-[30px] px-6">
          Enter the OTP sent to +91 9392475600
        </Text>

        {/* OTP Input */}
        {/* <View className="mb-5 flex items-start px-6">
          <View className="flex-row items-center gap-[10px]">
            <TextInput
              placeholder="Enter OTP XXX XXX"
              placeholderTextColor="#848A9A"
              className="pt-[12px] pb-[11px] pl-[12px] pr-[20px] font-Nunito-Regular border border-[#BBBCB7] text-[16px] text-gray-700 rounded-2xl w-[200px]"
              keyboardType="numeric"
              value={otp.join('')}
              onChangeText={handleOtpChange} // Fix function
              maxLength={4}
            />
            <Image
              source={require('../../assets/images/footPrint.png')}
              style={{
                height: 28.64,
                width: 32.64,
                tintColor: otp.length === 4 ? '#d75880' : '#BBBCB7',
              }}
            />
          </View>
        </View> */}
        <View className="flex-row items-center mb-5 px-6">
          <View className="flex-row">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                className="h-[44px] w-[44px] border border-[#BBBCB7] mr-[10px] rounded-2xl text-[17px] bg-white text-black font-Nunito-Regular"
                style={{textAlign: 'center'}}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
              />
            ))}
          </View>

          <Image
            source={require('../../assets/images/footPrint.png')}
            style={{
              height: 28.64,
              width: 32.64,
              tintColor: otp.join('').length === 4 ? '#d75880' : '#BBBCB7',
            }}
          />
        </View>

        {/* Resend Timer */}
        <Text className="text-[#BBBCB7] font-Nunito-Regular px-6">
          Resend OTP in{' '}
          <Text className="text-black font-Nunito-Regular">
            {`0${Math.floor(resendTime / 60)}:${(resendTime % 60)
              .toString()
              .padStart(2, '0')}`}
          </Text>
        </Text>

        {/* OTP Image Positioned Right with Dynamic Height */}
        <View className="flex-1 items-end top-[-80px]">
          <Image
            source={require('../../assets/images/DummyImages/otpImage.png')}
            style={{
              width: isKeyboardVisible ? 109 : 226,
              height: isKeyboardVisible ? 380 : 598, // Reduce height when keyboard is open
              position: 'relative',
              marginBottom: 30,
            }}
            resizeMode="contain"
          />
        </View>

        {/* Verify Button */}
        <View className="bottom-0 left-0 right-0 items-center mb-[10px]">
          <TouchableOpacity
            style={{
              width: 250,
              height: 60,
              backgroundColor: otp.length === 4 ? '#d75880' : '#BBBCB7',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="rounded-full"
            onPress={handleVerifyOtp}>
            <Text className="text-center text-[24px] font-bold text-white">
              Verify OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyOTP;
// import React, {useState, useRef} from 'react';
// import {View, Text, TextInput} from 'react-native';
// import FooterBtn from '../../components/shared/FooterBtn';
// import {user_type} from '../../constants/constants';
// import {login} from '../../state/redux/slice/authSlice';
// import {useDispatch} from 'react-redux';

// const VerifyOTP = ({navigation, route}) => {
//   const {isPartner} = route?.params;
//   const dispatch = useDispatch();

//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [resendTime, setResendTime] = useState(90); // Countdown in seconds
//   const [isResendDisabled, setIsResendDisabled] = useState(true);
//   const inputRefs = useRef([]);

//   // Handle OTP input change
//   const handleOtpChange = (value, index) => {
//     if (isNaN(value)) return; // Allow only numbers

//     let newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus next field
//     if (value && index < 3) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   // Handle OTP Resend
//   const handleResend = () => {
//     setResendTime(90);
//     setIsResendDisabled(true);
//     startCountdown();
//   };

//   // Start Countdown
//   const startCountdown = () => {
//     let timer = setInterval(() => {
//       setResendTime(prevTime => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           setIsResendDisabled(false);
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);
//   };

//   React.useEffect(() => {
//     startCountdown();
//   }, []);

//   return (
//     <View className="flex-1 bg-white px-6">
//       <Text
//         className="mt-[21px] mb-2 text-[26px]"
//         style={{fontFamily: 'Proxima-Nova-Semibold'}}>
//         Verification OTP
//       </Text>
//       <Text
//         className=" text-[#666666] mb-[30px]"
//         style={{fontFamily: 'Proxima-Nova-Regular'}}>
//         Enter the OTP we’ve sent to +91 9392475600
//       </Text>

//       {/* OTP Input Boxes */}
//       <View className="flex-row mb-5">
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={ref => (inputRefs.current[index] = ref)}
//             className="h-[58px] w-12 border border-pastelgreyBorder mr-[10px] rounded-2xl text-center text-[20px] bg-pastelGrey text-darkGunmetal"
//             style={{fontFamily: 'Proxima-Nova-Semibold'}}
//             keyboardType="numeric"
//             maxLength={1}
//             value={digit}
//             onChangeText={value => handleOtpChange(value, index)}
//           />
//         ))}
//       </View>

//       {/* Resend Timer */}
//       <Text
//         className=" text-[#666666]"
//         style={{fontFamily: 'Proxima-Nova-Regular'}}>
//         Resend OTP in{' '}
//         <Text
//           className="text-black"
//           style={{fontFamily: 'Proxima-Nova-Medium'}}>{`0${Math.floor(
//           resendTime / 60,
//         )}:${(resendTime % 60).toString().padStart(2, '0')}`}</Text>
//       </Text>

//       {/* Resend OTP */}
//       {/* <TouchableOpacity onPress={handleResend} disabled={isResendDisabled}>
//         <Text
//         >
//           Resend OTP
//         </Text>
//       </TouchableOpacity> */}

//       {/* Verify Button */}
//       <FooterBtn
//         title="Verify"
//         onClick={() => {
//           if (isPartner) {
//             dispatch(login(user_type.VET));
//           } else {
//             dispatch(login(user_type.PET_PARENT));
//           }
//         }}
//       />
//     </View>
//   );
// };

// export default VerifyOTP;
