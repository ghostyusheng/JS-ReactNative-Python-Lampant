import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Alert, StyleSheet, Text, View, Image, Button, TextInput, SafeAreaView } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
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
              onPress={() => navigation.navigate('AddIdea', {name: 'Jane'})}
            />
          </View>
          <View style={styles.idea}>
            <Image
              source={require('./assets/think.png')}
            />
            <Button
              title="List Ideas"
              onPress={() => navigation.navigate('ListIdea', {name: 'Jane'})}
            />
          </View>
        </View>
      <StatusBar style="auto" />
    </View>
  );
};
const AddIdea= ({navigation, route}) => {
  const [text1, onChangeTitle] = React.useState('');
  const [text2, onChangeContent] = React.useState('');

  const submitForm = async () => {
    console.log(text1, text2)
    try {
      const response = await fetch(`http://127.0.0.1:5005/add?title=${text1}&content=${text2}`, {
        method: 'GET',
      });
      const json = await response.json();
      Alert.alert('SUCCESS')
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={text1}
          placeholder="Idea Title"
        />
        <TextInput
          style={styles.input2}
          onChangeText={onChangeContent}
          value={text2}
          placeholder="Idea Content"
        />
        <Button
          title="submit"
          onPress={submitForm}
        />
      </SafeAreaView>
    </View>
  )
};

const avt = {
  0 : require('./assets/avt0.jpg'),
  1 : require('./assets/avt1.jpg'),
  2 : require('./assets/avt2.jpg'),
  3 : require('./assets/avt3.jpg'),
  4 : require('./assets/avt4.jpg'),
  5 : require('./assets/avt5.jpg'),
}

const renderItem = ({item}) => {
  const colors = ["rgb(239 68 68)", "rgb(34 197 95)", 
    "rgb(59 130 246)", "rgb(169 85 247)", "rgb(4 182 213)", 
    "rgb(234 179 11)", "rgb(107 114 128)"]
  const color = colors[Math.round(Math.random()*10)%colors.length]
  const avtNum= Math.round(Math.random()*10)%6
  return (
  <View style={styles.card} backgroundColor={color}>
    <View style={styles.cardHeader}>
      <Image
          style={styles.client}
          source={avt[avtNum]}
      />
    </View>
    <View>
      <Text style={styles.cardTitle}>{item[1]}</Text>
    </View>
    <View>
      <Text style={styles.cardContent}>{item[2]}</Text>
    </View>
  </View>
  )
}

const ListIdea = ({navigation, route}) => {
  const [data, setData] = React.useState([]);
  const getList = async () => {
    try {
      const response = await fetch(
        'http://127.0.0.1:5005/list',
      );
      const json = await response.json();
      print(json)
      setData(json)
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getList();
  }, []);
  if (data && data.data) {
    console.log('==>', data.data)
  }
  return (
    <View style={styles.container}>
      {
       data && data.data ? <FlatList
        data={data.data}
        renderItem={renderItem}
        keyExtractor={item => item[0]}
       /> : <></>
      }
    </View>
  )
}

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen options={{title: 'Add New Idea'}} name="AddIdea" component={AddIdea} />
        <Stack.Screen options={{title: 'List Idea'}} name="ListIdea" component={ListIdea} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <MyStack></MyStack>
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
    height: 70,
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
    borderRadius: 50,
    marginRight: 5
  },
  container: {
    backgroundColor: 'rgb(239 242 255)',
    borderColor: 'red',
    height: '100%',
    paddingTop: 10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input2: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    height: 190,
    padding: 10
  },
  cardHeader: {
    width: '100%',
    alignItems: 'flex-end'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 500,
    marginBottom: 5
  },
  cardContent: {
    fontSize: 15,
  }
});
