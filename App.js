import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Transaction from './src/screens/Transaction';
import DetailTransaction from './src/screens/DetailTransaction';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Transaksi"
          component={Transaction}
          options={{
            headerStyle: {
              backgroundColor: '#F56A37',
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailTransaction}
          options={{
            title: 'Detail Transaksi',
            headerStyle: {
              backgroundColor: '#F56A37',
            },
            headerTintColor: 'white',
            headerPressColorAndroid: '#ffe0b2',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
