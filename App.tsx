/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
import Home from './src/components/screens/Home';

 const App = () => {
   return (
     <SafeAreaView>
       <Home/>
     </SafeAreaView>
   );
 };

 export default App;
