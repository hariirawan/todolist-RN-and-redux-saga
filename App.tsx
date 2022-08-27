import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ToDoScreen from './src/Screens/ToDoScreen';
import ToDoDetailScreen from './src/Screens/ToDoDetailScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {RootStackParamList} from './src/types/typeNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TodoList" component={ToDoScreen} />
          <Stack.Screen name="TodoListDetail" component={ToDoDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
