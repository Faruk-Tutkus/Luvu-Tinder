import React, { useRef, useEffect } from 'react';

import LottieLuvu from './lottieLuvu';
import LottieComment from './lottieComment';
import LottieProfile from './lottieProfile';

const LottieTabIcon = ({ routeName, isFocused }) => {

  const getAnimation = () => {
    switch (routeName) {
      case 'luvu':
        return <LottieLuvu autoPlay={isFocused} loop={isFocused}/>;
      case 'profile':
        return <LottieProfile autoPlay={isFocused} loop={isFocused}/>;
      case 'comment':
        return <LottieComment autoPlay={isFocused} loop={isFocused}/>;
      default:
        return null;
    }
  };

  return getAnimation();
};

export default LottieTabIcon;
