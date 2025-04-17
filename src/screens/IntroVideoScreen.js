import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';

const IntroVideoScreen = ({ onVideoEnd }) => {

  // Handle video end event
  const handleVideoEnd = () => {
    console.log('Video ended, navigating...');
    onVideoEnd(); // Call the parent function to transition to the next screen
  };

  return (
    <View style={styles.container}>
      <Video
        source={require('../assets/video/0319.mp4')}
        style={styles.video}
        resizeMode="cover"
        fullscreen={true}
        repeat={false}
        onEnd={handleVideoEnd}  // Transition once video ends
        paused={false} // Ensure the video doesn't pause unexpectedly
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default IntroVideoScreen;
