import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Image, Button } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', {name: 'Jane'})
      }
    />
  );
};
const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <MyStack></MyStack>
      <View style={styles.header}>
        <Image
            style={styles.logo}
            source={require('./assets/logo.png')}
        />

        <Image
            style={styles.client}
            source={require('./assets/client.jpg')}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.idea}>
            <Image
              source={require('./assets/lamp.png')}
            />
            <Button
              title="Add Ideas"
              onPress={() => Alert.alert('Left button pressed')}
            />
          </View>
          <View style={styles.idea}>
            <Image
              source={require('./assets/think.png')}
            />
            <Button
              title="List Ideas"
              onPress={() => Alert.alert('Left button pressed')}
            />
          </View>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  idea: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    marginTop: '40%',
  },
  header: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#818df8',
    flexDirection: 'row',
  },
  logo: {
    marginLeft: 5
  },
  client: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 50,
    marginRight: 5
  },
  container: {
    backgroundColor: '#fff',
    borderColor: 'red',
    borderWidth: '3',
    height: '100%',
    paddingTop: 15
  },
});
