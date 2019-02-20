import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  SafeAreaView,
  StatusBar,
  Linking,
  Keyboard,
  TouchableOpacity,
  CheckBox,
  KeyboardAvoidingView
} from "react-native";
export default class TutorialScreen extends Component {
  _onGoBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        {/* toolbar */}
        <View style={[styles.toolbar, { backgroundColor: "#0368d0" }]}>
        <TouchableWithoutFeedback onPress={this._onGoBack}>
          <Image
            style={{
              marginLeft: 10,
              width: 20,
              height: 20
            }}
            source={require("../images/ic_left_back.png")}
          />
          </TouchableWithoutFeedback>
          <Text style={[styles.titleToolbar]}>Hướng dẫn sử dụng</Text>
        </View>
        <View style={styles.logoContainer}>
          <View style={styles.logoContainer1}>
            <Image
              style={styles.logo}
              source={require("../images/logo_check.png")}
            />
          </View>
          <View style={styles.viewLine} />
          {/* buoc 1 */}
          <View style={styles.itemView}>
            <Image
              style={{
                marginLeft: 10,
                width: 60,
                height: 60
              }}
              source={require("../images/ic_one.png")}
            />
            <View style={[styles.itemContent]}>
              <Text style={[styles.textItemHeader]}>
                {"Bước 1: Tải ứng dụng".toUpperCase()}
              </Text>
              <Text style={[styles.textItemContent]}>
                Vào trang{" "}
                <Text
                  style={[styles.textItemContentBlue]}
                  onPress={() => Linking.openURL("http://vnptcheck.vn")}
                >
                  http://vnptcheck.vn
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.viewLine} />
          {/* buoc 2 */}
          <View style={styles.itemView}>
            <Image
              style={{
                marginLeft: 10,
                width: 60,
                height: 60
              }}
              source={require("../images/ic_two.png")}
            />
            <View style={[styles.itemContent]}>
              <Text style={[styles.textItemHeader]}>
                {"Bước 2: Tạo tài khoản".toUpperCase()}
              </Text>
              <Text style={[styles.textItemContentBlue]}>
                Đăng nhập
                <Text style={[styles.textItemContent]}>
                  {" "}
                  --> Chọn
                  <Text style={[styles.textItemContentBlue]}>
                    {" "}
                    Đăng ký tại đây{"\n"}
                    <Text style={[styles.textItemContent]}>
                      --> Nhập đầy đủ thông tin để đăng ký {"\n"}(bỏ qua bước
                      này nếu đã có tài khoản{"\n"}hệ thống)
                    </Text>
                    <Text />
                  </Text>
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.viewLine} />
          {/* buoc 3 */}
          <View style={styles.itemView}>
            <Image
              style={{
                marginLeft: 10,
                width: 60,
                height: 60
              }}
              source={require("../images/ic_three.png")}
            />
            <View style={[styles.itemContent]}>
              <Text style={[styles.textItemHeader]}>
                {"Bước 3: Quét QR code".toUpperCase()}
              </Text>
              <Text style={[styles.textItemContent]}>
                Bấm vào nút
                <Text style={[styles.textItemContentBlue]}>
                  {" "}
                  Quét QRcode.{"\n"}
                  <Text style={[styles.textItemContent]}>
                    Đưa tem QRcode cần quét vào đúng{"\n"}
                    <Text style={[styles.textItemContent]}>cửa sổ quét.</Text>
                  </Text>
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.viewLine} />
          {/* buoc 4 */}
          <View style={styles.itemView}>
            <Image
              style={{
                marginLeft: 10,
                width: 60,
                height: 60
              }}
              source={require("../images/ic_four.png")}
            />
            <View style={[styles.itemContent]}>
              <Text style={[styles.textItemHeader]}>
                {"Bước 4: Xác nhận mua".toUpperCase()}
                <Text style={[styles.textItemContent]}>
                  {"(Nếu có)".toUpperCase()}
                </Text>
              </Text>
              <Text style={[styles.textItemContent]}>
                Bấm vào nút
                <Text style={[styles.textItemContentBlue]}>
                  {" "}
                  Mua
                  <Text style={[styles.textItemContent]}>
                    {" "}
                    để xác nhận quyền{"\n"}sở hữu sản phẩm.
                  </Text>
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column"
  },
  logoContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1
  },
  logoContainer1: {
    width: "100%",
    height: "23%",
    alignSelf: "baseline",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
    // flex: 1
  },
  logo: {
    width: "80%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center"
  },
  toolbar: {
    height: 70,
    flexDirection: "row",
    alignItems: "center"
  },
  itemView: {
    height: "20%",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 50
  },
  itemContent: {
    marginRight: 20,
    marginLeft: 10,
    flexDirection: "column"
  },
  titleToolbar: {
    marginLeft: 16,
    color: "white",
    fontWeight: "normal",
    fontSize: 16
  },
  textItemHeader: {
    color: "#034896",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10
  },
  textItemContent: {
    color: "#5e5e5e",
    fontWeight: "normal",
    fontSize: 13
  },
  textItemContentBlue: {
    color: "#01519a",
    fontWeight: "normal",
    fontSize: 13
  },
  avaView: {
    width: 30,
    height: 30
  },
  title: {
    color: "#f7c744",
    fontSize: 14,
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
    fontSize: 14
  },
  checkboxText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "normal",
    fontSize: 14
  },
  viewLine: {
    height: 1,
    backgroundColor: "#c6c6c6"
  }
});
