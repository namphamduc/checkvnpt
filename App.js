/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react";
import {View, Text, StyleSheet, Image, AppState} from "react-native";
import {Ionicons} from "react-native-vector-icons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
    createBottomTabNavigator,
    createAppContainer,
    createStackNavigator
} from "react-navigation";
import HistoryScreen from "./src/screens/HistoryScreen";
import MenuScreen from "./src/screens/MenuScreen";
import RuleScreen from "./src/screens/RuleScreen";
import TutorialScreen from "./src/screens/TutorialScreen";
import Login2Container from "./src/containers/Login2Container";
import {Provider} from "react-redux";
import NavigationService from "./src/service/NavigationService";
import {store} from "./src/redux/configureStore";
import LoginScreen2 from "./src/screens/LoginScreen2";
import {ScanRoute} from "./src/route";
import WebViewBase from "./src/components/WebViewBase";
import HistoryContainer from "./src/containers/HistoryContainer";
import {database} from "./src/database/Database";
import ScanQRContainer from "./src/containers/ScanQRContainer";
import MenuContainer from "./src/containers/MenuContainer";
import ScanContainer from "./src/containers/ScanContainer";

const ScanStack = createStackNavigator(
    {
        [ScanRoute.SCAN]: {screen: ScanContainer},
        [ScanRoute.SCAN_QR]: {screen: ScanQRContainer},
        [ScanRoute.WEB_VIEW]: {screen: WebViewBase}
    },
    {
        headerMode: "none",
        mode: "card",
        defaultNavigationOptions: {
            gesturesEnabled: false
        }
    }
);

const HistoryStack = createStackNavigator(
    {
        History: { screen: HistoryContainer },
    },
    {
        headerMode: "none",
        mode: "card",
        defaultNavigationOptions: {
            gesturesEnabled: false
        }
    }
);
const MenuStack = createStackNavigator(
    {
        Menu: {screen: MenuContainer},
        Rule: {screen: RuleScreen},
        Tutorial: {screen: TutorialScreen},
        Login: {screen: Login2Container}
    },
    {
        headerMode: "none",
        mode: "card",
        defaultNavigationOptions: {
            gesturesEnabled: false
        }
    }
);
MenuStack.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <MaterialIcons
            style={{backgroundColor: "transparent"}}
            name={"list"}
            color={tintColor}
            size={24}
        />
    ),
    tabBarVisible: ({isVisible}) => {
        if (navigation.state.index > 0) {
            isVisible = false;
        } else {
            isVisible: true;
        }
    }
};

ScanStack.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <Image
            source={require("./src/images/ic_qrcode.png")}
            style={{width: 20, height: 20}}
        />
    )
};

HistoryStack.navigationOptions = {
    tabBarIcon: ({tintColor}) => (
        <MaterialIcons
            style={{backgroundColor: "transparent"}}
            name={"history"}
            color={tintColor}
            size={24}
        />
    )
};

// MenuStack.navigationOptions = ({navigation}) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
//   return {
//     tabBarVisible,
//   };
// }
// ScanStack.navigationOptions = ({navigation}) => {

//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
//   return {
//     tabBarVisible,
//   };
// }

const BottomTabMaterial = createBottomTabNavigator(
    {
        Scan: {
            screen: ScanStack
        },
        History: {
            screen: HistoryStack
        },
        Menu: {
            screen: MenuStack
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: "#00a219",
            inactiveTintColor: "white",
            activeTintColor: "white",
            showLabel: false,
            showIcon: true,
            style: {
                backgroundColor: "#0a51c5"
            }
        }
    }
);
export const AppContainer = createAppContainer(BottomTabMaterial);
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
            databaseIsReady: false
        };
        this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    // componentDidMount() {
    //     // App is starting up
    //     this.appIsNowRunningInForeground();
    //     this.setState({
    //         appState: "active"
    //     });
    //     // Listen for app state changes
    //     AppState.addEventListener("change", this.handleAppStateChange);
    //     // database.addHistoryItem("1", "xxx", 1, "man", "10:1:1", 'A').then(value => {
    //     //     console.log("addHistoryItem suc " + JSON.stringify(value))
    //     // }).catch(error => {
    //     //     console.log("addHistoryItem error " + JSON.stringify(error))
    //     // })
    //     //
    //     // database.getAllHistory('A').then(value => {
    //     //     console.log("getAllHistory suc " + JSON.stringify(value))
    //     // }).catch(error => {
    //     //     console.log("getAllHistory error " + JSON.stringify(error))
    // }
    //
    // componentWillUnmount() {
    //     // Remove app state change listener
    //     AppState.removeEventListener("change", this.handleAppStateChange);
    // }

    handleAppStateChange(nextAppState) {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            // App has moved from the background (or inactive) into the foreground
            this.appIsNowRunningInForeground();
        } else if (
            this.state.appState === "active" &&
            nextAppState.match(/inactive|background/)
        ) {
            // App has moved from the foreground into the background (or become inactive)
            this.appHasGoneToTheBackground();
        }
        this.setState({appState: nextAppState});
    }

    appIsNowRunningInForeground = () => {
        console.log("App is now running in the foreground!");
        return database.open().then(() =>
            this.setState({
                databaseIsReady: true
            })
        );
    }
    appHasGoneToTheBackground = () => {
        console.log("App has gone to the background.");
        database.close();
    }

    render() {
        return (
            <Provider store={store}>
                <AppContainer
                    ref={(navigatorRef) => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            </Provider>
        )
    }

}