// import React, {useEffect} from 'react';
// import './global.css';
// import {Provider} from 'react-redux';
// import AppNavigation from './src/navigation';
// import store from './src/state/redux/store';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
// import SplashScreen from 'react-native-splash-screen';
// import Toast from 'react-native-toast-message';
// import {Image, Text, TouchableOpacity, View} from 'react-native';
// import images from './src/assets/images';

// const toastConfig = {
//   successfullyToast: ({text1, text2, props}) => (
//     <View
//       style={{
//         width: '100%',
//         marginHorizontal: 24,
//       }}>
//       <View className=" bg-[#47B553] border border-[#6BD376] mx-6 flex-row rounded-2xl p-4 items-center justify-between">
//         <View className=" flex-row gap-4 items-center">
//           <Image
//             source={images.checkmark}
//             className="h-6 w-6"
//             resizeMode="contain"
//           />
//           <View>
//             <Text className=" text-white  font-Nunito-Regular text-[16px]">
//               {text1}
//             </Text>
//             <Text className=" text-white font-Nunito-Regular text-[16px]">
//               {text2}
//             </Text>
//           </View>
//         </View>
//         <TouchableOpacity onPress={() => Toast.hide()}>
//           <Text className=" text-white font-Nunito-Bold text-[18px]">OK</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   ),
// };
// const App = () => {
//   useEffect(() => {
//     SplashScreen.hide();
//   }, []);
//   return (
//     <GestureHandlerRootView>
//       <BottomSheetModalProvider>
//         <Provider store={store}>
//           <AppNavigation />
//         </Provider>
//       </BottomSheetModalProvider>
//       <Toast config={toastConfig} />
//     </GestureHandlerRootView>
//   );
// };

// export default App;

//mp4
import React, {useEffect, useState, useRef} from 'react';
import './global.css';
import {Provider} from 'react-redux';
import AppNavigation from './src/navigation';
import store from './src/state/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import SplashScreen from 'react-native-splash-screen';
import {StyleSheet} from 'react-native';
import Video from 'react-native-video';
import splashVideo from './src/assets/video/Dogvideo3.mp4';

const App = () => {
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 600); 
    
    return () => clearTimeout(timer);
  }, []);

  // useEffect(() => {
  //   if (!showVideo) return;
    
  //   const videoTimer = setTimeout(() => {
  //     setShowVideo(false);
  //   }, 3000);

  //   return () => clearTimeout(videoTimer);
  // }, [showVideo]);
  

  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    //   {showVideo ? (
    //     <Video
    //       source={splashVideo}
    //       ref={videoRef}
    //       style={{
    //         paddingBottom:830
    //       }}
    //       muted
    //       repeat={false}
    //       resizeMode="cover"
    //       onLoad={() => {
    //         // setVideoReady(true);
    //         SplashScreen.hide();
    //       }}
    //       onEnd={() => setShowVideo(false)}
    //       onError={(error) => {
    //         console.log('Video error:', error);
    //         setShowVideo(false);
    //       }}
    //     />
    //   ) : (
    //     <BottomSheetModalProvider>
    //       <Provider store={store}>
    //         <AppNavigation />
    //       </Provider>
    //     </BottomSheetModalProvider>
    //   )}
    // </GestureHandlerRootView>
    <GestureHandlerRootView style={{flex: 1}}>
    {showVideo ? (
      <Video
        source={splashVideo}
        ref={videoRef}
        style={StyleSheet.absoluteFill}
        muted
        resizeMode="cover"
        repeat={false}
        onEnd={() => setShowVideo(false)}
        onError={(error) => {
          console.log('Video error:', error);
          setShowVideo(false); // fallback to app if video fails
        }}
      />
    ) : (
      <BottomSheetModalProvider>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      </BottomSheetModalProvider>
    )}
  </GestureHandlerRootView>
  );
};

export default App;







