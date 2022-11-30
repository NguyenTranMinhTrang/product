import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Product, AddProduct, Detail } from "./src/screen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    "Roboto-Black": require('./src/assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold": require('./src/assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular": require('./src/assets/fonts/Roboto-Regular.ttf'),
    "Roboto-Light": require('./src/assets/fonts/Roboto-Light.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Product'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
