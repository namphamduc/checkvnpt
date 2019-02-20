import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
export default class RuleScreen extends Component {
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
          <Text style={[styles.titleToolbar]}>Điều khoản sử dụng</Text>
        </View>
        <View style={styles.logoContainer}>
          <View style={styles.logoContainer1}>
            <Image
              style={styles.logo}
              source={require("../images/logo_check.png")}
            />
          </View>
          <Text style={[styles.textItemHeader]}>
            {"VNPT Check - Chứng minh thư của sản phẩm"}
          </Text>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20
            }}
          >
            <Text style={styles.textItemContentBlueBold}>
              VNPT Check
              <Text style={styles.textItemContentBlue}>
                {" "}
                có thể giúp người tiêu dùng:{"\n"}
                <Text style={styles.textItemContent}>
                  {"   "}+ Kiểm tra và xác thực nguồn gốc hàng hoá, sản phẩm
                  {"\n"}
                  {"   "}+ Bảo vệ quyền lợi người tiêu dùng.{"\n"}
                  {"   "}+ Cầu nối trung gian giữa nhà sản xuất và người tiêu
                  dùng{"\n"}
                  {"   "}+ Tạo cộng đồng thông tin chia sẻ sản phẩm.{"\n"}
                </Text>
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20
            }}
          >
            <Text style={styles.textItemContentBlueBold}>
              VNPT Check
              <Text style={styles.textItemContentBlue}>
                {" "}
                hỗ trợ tối đa các doanh nghiệp sản xuất:{"\n"}
                <Text style={styles.textItemContent}>
                  {"   "}+ Tạo kênh quảng cáo, giới thiệu thông tin sản phẩm,
                  {"\n"}
                  {"       "}giá bán niêm yết tới tay KH.
                  {"\n"}
                  {"   "}+ Hỗ trợ chứng minh, quảng bá quyền sở hữu sản phẩm.
                  {"\n"}
                  {"   "}+ Bảo vệ quyền lợi nhà sản xuất chính hãng.{"\n"}
                  {"   "}+ Ngăn chặn làm giả, làm nhái sản phẩm của doanh
                  nghiệp.{"\n"}
                  {"   "}+ Tạo dựng niềm tin với khách hàng.{"\n"}
                  {"   "}+ Tạo cộng đồng và cầu nối liên kết giữa DN và KH.
                  {"\n"}
                </Text>
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 20,
              marginRight: 20
            }}
          >
            <Text style={styles.textItemContentBlueBold}>
              VNPT Check
              <Text style={styles.textItemContentBlue}>
                {" "}
                không có chức năng chứng thực chất lượng sản phẩm{"\n"}
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginTop: 20
            }}
          >
            <Text style={[styles.textItemHeader]}>
              {"VNPT Check - sản phẩm được phát triển bởi VNPT"}
            </Text>
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
    fontSize: 18
  },
  textItemHeader: {
    color: "#034896",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 10,
    alignSelf: "center",
    fontStyle: "italic"
  },
  textItemContent: {
    color: "#5e5e5e",
    fontWeight: "normal",
    fontSize: 12
  },
  textItemContentBlueBold: {
    color: "#01519a",
    fontWeight: "bold",
    fontSize: 12
  },
  textItemContentBlue: {
    color: "#01519a",
    fontWeight: "normal",
    fontSize: 12
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
  },
  viewLine: {
    height: 1,
    backgroundColor: "#c6c6c6"
  }
});