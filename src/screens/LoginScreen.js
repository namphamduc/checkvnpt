import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  CheckBox,
  KeyboardAvoidingView
} from "react-native";
import CheckboxFormX from "react-native-checkbox-form";

const mockData = [
  {
    label: "Ghi nhớ tài khoản",
    RNchecked: true
  }
];

export default class Login extends Component {
  _onSelect = item => {
    console.log(item);
  };
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.logoContainer}>
              <View style={styles.view1} />
              <View style={styles.logoContainer1}>
                <Image
                  style={styles.logo}
                  resizeMode='cover'
                  source={require("../images/logo_check.png")}
                />
              </View>
              <View style={styles.view1} />

              <View
                style={{
                  height: 30,
                  width: 100,
                  marginTop: 30,
                  marginLeft: 50,
                  marginRight: 50,
                  flexDirection: "row"
                }}
              >
                <Image
                  style={{
                    width: 15,
                    height: 15,
                    position: "absolute",
                    bottom: 5
                  }}
                  source={require("../images/ic_user.png")}
                />
                <TextInput
                  style={{
                    height: 40,
                    color: "white",
                    paddingHorizontal: 10,
                  }}
                  placeholder="Tài khoản"
                  placeholderTextColor="white"
                  keyboardType="email-address"
                  returnKeyType="next"
                  autoCorrect={false}
                  onSubmitEditing={() => this.refs.txtPassword.focus()}
                />
              </View>
              <View style={styles.view2} />
              <View
                style={{
                  height: 30,
                  width: 200,
                  marginTop: 10,
                  marginLeft: 50,
                  marginRight: 50,
                  flexDirection: "row"
                }}
              >
                <Image
                  style={{
                    width: 15,
                    height: 20,
                    position: "absolute",
                    bottom: 5
                  }}
                  source={require("../images/ic_locked.png")}
                />
                <TextInput
                  style={{
                    height: 40,
                    color: "#FFF",
                    paddingHorizontal: 10,
                  }}
                  placeholder="Mật khẩu"
                  placeholderTextColor="white"
                  returnKeyType="go"
                  secureTextEntry
                  autoCorrect={false}
                  ref={"txtPassword"}
                />
              </View>
              <View style={styles.view2} />
              <View
                style={{
                  width: 150,
                  height: 30,
                  textAlign: "center",
                  // flex: 1,
                  alignSelf: "center",
                  // justifyContent: "center",
                  marginVertical: 10
                }}
              >
                <CheckboxFormX
                  style={{ width: 350 - 30 }}
                  textStyle={styles.checkboxText}
                  dataSource={mockData}
                  itemShowKey="label"
                  itemCheckedKey="RNchecked"
                  iconSize={16}
                  iconColor="#FFF"
                  formHorizontal={true}
                  labelHorizontal={true}
                  onChecked={item => this._onSelect(item)}
                />
              </View>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0368d0",
    flexDirection: "column"
  },
  logoContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    marginTop: 100
  },
  logoContainer1: {
    width: "100%",
    // height: 100,
    alignSelf: 'stretch',
    backgroundColor: "#FFF"
    // alignItems: 'center',
    // justifyContent: 'center',
    // flex: 1
  },
  logo: {
    width: 200,
    height: 56,
    marginTop: 10,
    marginBottom: 10
  },
  view1: {
    width: "100%",
    height: 7,
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  view2: {
    height: 0.5,
    marginLeft: 50,
    marginRight: 50,
    backgroundColor: "#FFFFFF"
  },
  avaView: {
    width: 30,
    height: 30
  },
  title: {
    color: "#f7c744",
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
    opacity: 0.9
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    padding: 20
    // backgroundColor: 'red'
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#FFF",
    marginBottom: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    width: 300,
    marginTop: 30,
    backgroundColor: "#FFF",
    paddingVertical: 15,
    alignSelf: "center",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#0f365f",
    fontWeight: "normal",
    fontSize: 18
  },
  checkboxText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "normal",
    fontSize: 14
  }
});
