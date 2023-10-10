/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type { Node } from 'react';
import { Button, Linking } from 'react-native';
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



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const webViewRef = React.useRef();

  const isReloaded = React.useRef(false);

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

    document.cookie = "mycookie=AdityaRocksSS"
    document.cookie = "nextCookie=Mango"
    
    console.log('cookie_set');
    console.log(document.cookie);
   

    
`;

  function relodeWebView() {

    if (isReloaded.current) {

      console.log("Already Reloaded !");

      return;

    }

    console.log("relodeWebView Executed !");

    webViewRef.current.reload();


    isReloaded.current = true

  }

  const onMessage = async payload => {

    console.log("onMessage executed !");
    let dataPayload;
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data);
    } catch (e) { }
    if (dataPayload) {
      if (dataPayload.type === 'Console') {

        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);

        console.log("dataPayload.data", dataPayload.data);

        if (dataPayload.data.log === 'helloFromWebView') {

          relodeWebView()

        }

      }

      else {
      }
    }
  };



  return (
    // <SafeAreaView style={backgroundStyle}>
    <>



      <WebView
        ref={webViewRef}
        source={{ uri: 'https://video2gif.000webhostapp.com' }}
        style={{
          marginTop: 20,
          // height: 320,
          // width: 200
        }}
        // onLoadEnd={getCookies}
        // onLoad={setCookies}
        javaScriptEnabled={true}
        injectedJavaScript={debugging}
        onMessage={onMessage}

      />
      <Button
        title='Move To iOS Screen !'
        onPress={() => {
          // Linking.openURL("fromrntoios://hi")
          // getCookies()
          const script = `document.cookie = "newKey=Apple";
          console.log('helloFromWebView');
          `;
          webViewRef.current.injectJavaScript(script);
          // webViewRef.current.reload();

        }}
      />
    </>
    // </SafeAreaView>
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
