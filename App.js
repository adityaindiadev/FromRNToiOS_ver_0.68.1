/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import CookieManager from '@react-native-cookies/cookies';
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import { Button, Linking, NativeModules } from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import WebViewScreen from './src/WebViewScreen';
import LearnFlexScreen from './src/LearnFlexScreen';



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const webViewRef = React.useRef();

  const isReloaded = React.useRef(false);
  const [loadWebView, setloadWebView] = useState(false)

  const setCookies = () => {
    // Replace with your actual cookie-setting logic
    console.log("setCookies");
    const cookies = 'username=John Doe, pass=Aditya';
    const script = `document.cookie = '${cookies}';`;
    webViewRef.current.injectJavaScript(script);
  }

  const getCookies = () => {

    console.log("getCookies");
    const script = `
      const cookies = document.cookie;
      cookies;
    `;

    webViewRef.current.injectJavaScript(script, result => {
      console.log('Cookies:', result);
    });
  }

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };

   // document.cookie = "mycookie=AdityaRocksSS"
    //document.cookie = "nextCookie=Mango"
    
    console.log('cookie_set');
    console.log(document.cookie);
   

    
`;


  const MSISAuth = {
    name: 'MSISAuth',
    value: `AAEAAB1iYp3GvzRWrrxLfp+ecq9wqfLfl6FPnsNFeoulmdHuA9f87chKKAbzqci1xnzuTEaREjFmEu4DRGDTh035w80N6s5V0vVc+0hlPJpRHS0WwZJ13PVYm/QMtyxoc69fJt+0su8yFaRiyen1NJm4nrLiM+0xXjKRBKGqulo/92avLtHU2YqCtmfh/gQZ929WxlwOTaYUzLxGqIgJkJ84WrT5yhcmUrXNaSrLOVjwJsk++uxdbMmRj902H4kkW/exOpswLsuQUBlJ1lAlJjWQwoREZ7ck1HdaHxIrQoZHEI9Q5F8fBmFh53tKENGYUDtuR2I99GxHADLjfGHQPEe15WpMWedHQzUN+RAgzENQqg8z+gpcMwD0MKE+XmXf51XT/gABAABvYZGeZDWyjv+A79Vg4EZDUgp9hE+Omp/wGmZDX9vHcLMiBCV+SSTOnBpcdnoWJZqntLJ8qWMX7q2yXAnWGRJGxL320Q37aHFSt5mhc+2q7F6Wlh2Ue/ch878hGzbqBpU6J0FcdIsHmrtStziY55OagasXLcW+/MoqdyJQG3wtILLN6qO5BXDIfT+XVTAHIPQnGuQZeyBV5NueLlTh6unfSfbYvgmsadaw9aWXFcNJ//AGNI5gOuJLNeCnuyY26dQZGWpxLdazG/vCuaIC2Zx2+MF+r11SwW3rkh+tJKlLBbyIs0uGPUqQWpvLolA2MZtWhfG8c0HDgTjE/uDVeVXBkAMAAC1qqc3ZqW+Y0VloGtMm7v23cya1btCMzlh8X+b3ebTYCMScaktSQxjMosFaYL/FBszKERlDZyburFF8fgzbKK9mcbY45zJzI8asbsa690zx72Z+aRwH5hlqb4UmpGxdUq911r47ztclPGECCsYKwpWJ6w1s8r2pS3nqUXsnGRbgHQomD0I1lJk9u3NN/kdxvEifN21VJjQ4kgTz6yDct0dXmB5ae1Ng6tGBUffk85dxVqalWa4ue68oXJ72Gs8ohC7nYAgWQsnUnJmaPY33xj6/VYB03taIBtlDO4U3E9w5gi/RY4IScrFDExaEKnljqUxEC/2jL2GUAZcnd4nY3iQQqipCui/LIxqMDt66lFqWn+P20f+OfRDnVFIJKuNireATatlRn7TSTH6BWcCSf7frxBUr/4VOF9OHLJwxpBj4+bE7rA52WAtGM2YTFFrvxjTyYSpJxq9YEx5R6dYcyFe8fD+14ES1m/eRTObsWmSsScJFAXHB7rpdzu6Dl4l2S0g4TAi8VovENUzJcQG9vk+Jy23RjZZ+x6rEcIfGE4oqwHVOPKvI/f6oBJzS77kksoxT+WAdC0uhGZstpYyOOBjfIKjS6nq3bYvKXDt6GZaELU+ld9AS68Q+rg7A4L6rzX7qGYpf5rQnepD+GGrrh23BKIs+386jT2q4sv6vXrSgL/XSntmdUiUTfLGfKSq0Ktchc2NVKMdDm7+3myxMuQgXAd+Pi7rte87v67Jk6Daf+5PeFV5p2E+apy5y0x+96/0wetTtKCZ/6KA59EdmmmQGEDAVJcHgburGX7HU0BUMkHBgUVXxx6Rmntsjm3qGLIB3dy6U7GRPGaczqrDLDfa3zLBQEKabqO5qms9PVo+SLU2ra84pV0GU9Su0R7S3mL3A9a3a87DgvnOEx2qiAesAGjrgqpfmwRxTeMW5I1D8LhvSlLwpWBeQHMfvF6Z/ypLSHIAgRDs74X9D9i2ynu3T1dWo8mfKI2maCyWLPWCq3HrKgzC/SU7tClnc/y7M3QljY7ggLeIEqQ9jpFNB+fCQQ2t8uexZAUKnzLKn+YiZO38St572QtBmTO63MjmzFSbWHfKu4HG2Ln9t0+btDoNsZ+mGEYdc+rd2cswRxGyxYYR6JBKSJlcIAReBW0c/W8B3kFX34R7fDuaJJrFhLpB/cXqdrd+lSH9BlkiJZXfJJqxp9GdSlA8jfzrSEyTCXw==`,
    // domain: 'https://adsso.airtel.com',
    path: '/adfs',
    // origin: 'same-origin',
    // version: '0',
    // expiration: '2023-11-12T12:30:00.00-05:00'
  };

  const MSISSignOut = {
    name: 'MSISSignOut',
    value: `c2lnbm91dENsZWFudXA7dXJuJTNhaGl2ZSUzYWFpcnRlbCZQcm9kLUhpdmUmaHR0cHMlM2ElMmYlMmZoaXZlLmFpcnRlbC5jb20lMmZfdHJ1c3QlMmYmaHR0cHMlM2ElMmYlMmZoaXZlLmFpcnRlbC5jb20lMmZfdHJ1c3QlMmZc`,
    // domain: 'https://adsso.airtel.com',
    path: '/adfs',
    // origin: 'same-origin',
    // version: '0',
    // expiration: '2023-11-12T12:30:00.00-05:00'
  };

  const MSISAuthenticated = {
    name: 'MSISAuthenticated',
    value: `MTAvMTYvMjAyMyA2OjIyOjE1IEFN`,
    // domain: 'https://adsso.airtel.com',
    path: '/adfs',
    // origin: 'same-origin',
    // version: '0',
    // expiration: '2023-11-12T12:30:00.00-05:00'
  };

  const MSISLoopDetectionCookie = {
    name: 'MSISLoopDetectionCookie',
    value: `MjAyMy0xMC0xNjowNjoyMjoxNVpcMQ==`,
    // domain: 'https://adsso.airtel.com',
    path: '/adfs',
    // origin: 'same-origin',
    // version: '0',
    // expiration: '2023-11-12T12:30:00.00-05:00'
  };

  const MSISIPSelectionPersistent = {
    name: 'MSISIPSelectionPersistent',
    value: `QUQgQVVUSE9SSVRZ`,
    // domain: 'https://adsso.airtel.com',
    path: '/adfs',
    // origin: 'same-origin',
    // version: '0',
    // expiration: '2023-11-12T12:30:00.00-05:00'
  };







  return (
    <>

      <SafeAreaView  style={{ flex:1 }}>

        {/* <WebViewScreen /> */}

      <LearnFlexScreen/>


      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
