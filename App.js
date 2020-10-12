import "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Platform, Button, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    }
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
    .then(response => response.json())
    .then(response => {
        this.setState({
          isLoading: false,
          dataSource: response.movies
        })
    });
  }

  render() {

    if(this.state.isLoading) {
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }

    let movies = this.state.dataSource.map((val, key) => {
      return <View key={key} style={styles.item}>
        <Text>{val.title}</Text>
      </View>
    })

    return (
      <View style={styles.container}>
          <Text style={styles.text}>Home Screen</Text>
          {movies}
      </View>
    );
  }
}

function DetailsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Details Screen</Text>
        </View>
    );
}

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = focused
                                ? "ios-information-circle"
                                : "ios-information-circle-outline";
                        } else if (route.name === "Settings") {
                            iconName = focused ? "ios-list-box" : "ios-list";
                        }

                        // You can return any component that you like here!
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                })}
                activeColor="#0275dB"
                inactiveColor="gray"
                barStyle={{ backgroundColor: '#694fad' }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={DetailsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#23272A",
        paddingTop: Platform.OS === "android" ? 37.5 : 0,
        paddingBottom: Platform.OS === "android" ? 37.5 : 0,
        paddingLeft: 10,
        paddingRight: 10,
    },

    text: {
        color: "white",
    },

    item: {
      color: '#ffff',
      flex: 1,
      alignSelf: 'stretch',
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: 'grey'
    }
});
