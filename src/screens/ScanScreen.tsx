import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    SafeAreaView,
    StatusBar,
    TouchableOpacity, TouchableOpacityComponent
} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import {getInfoUser} from "../utils/AsyncStorage";
import NavigationService from "../service/NavigationService";
import {ScanRoute} from "../route";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

interface Props {
    navigation: any
    loading: any
    data: any
    resultType: any,
    code: any,
    message: any

    getInfoItem(code: string): void

    getInfoUser(token: any): void
}

interface State {
    textSearch: string,
    showAlert: boolean
}

export default class SCanSCreen extends Component<Props, State> {
    state = {
        textSearch: '',
        showAlert: false
    };
    private refAlert: any;
    // static navigationOptions = ({ navigation }) => {
    //   const { params = {} } = navigation.state;
    //   let tabBarIcon = () => (
    //     <Image
    //       source={require("../images/ic_qrcode.png")}
    //       style={{ width: 20, height: 20 }}
    //     />
    //   );
    //   return { tabBarIcon };
    // };
    componentDidMount() {
        getInfoUser().then((value) => {
            if (value) {
                this.props.getInfoUser(value.use_session)
            }
        })
    }

    componentWillReceiveProps(nextProps: any, nextContext: any): void {
        const {resultType, data, message,code} = nextProps;
        if (resultType == 'Success') {
            this.gotoDetailItem(code)
        } else if (resultType == 'Failure') {
            this.setState({showAlert: true})
        }
    }

    _onPressQR = () => {
        this.props.navigation.navigate("ScanQR1");
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar/>
                {/* toolbar */}
                <View style={[styles.toolbar, {backgroundColor: "#0368d0"}]}>
                    <Image
                        style={{
                            marginLeft: 10,
                            width: 20,
                            height: 20
                        }}
                        source={require("../images/ic_menu.png")}
                    />
                    <Text style={[styles.titleToolbar]}>Quét QR code</Text>
                </View>
                <View style={{
                    width: "100%",
                    height: 45,
                    flexDirection: 'column',
                    backgroundColor: "#0368d0"
                }}>
                    <View style={[styles.searchView, {backgroundColor: "#0368d0"}]}>
                        <TouchableOpacity onPress={() => {
                            this.handleSearch()
                        }}>
                            <Image
                                style={{
                                    marginLeft: 10,
                                    width: 20,
                                    height: 20
                                }}
                                source={require("../images/ic_search.png")}
                            />
                        </TouchableOpacity>

                        <TextInput
                            onSubmitEditing={() => this.handleSearch()}
                            returnKeyType={"search"}
                            style={{
                                height: 40,
                                color: "white",
                                paddingHorizontal: 10
                            }}
                            value={this.state.textSearch}
                            onChangeText={(text: any) => {
                                this.setState({textSearch: text})
                            }} keyboardType={'numeric'}
                            placeholder="Truy vấn theo mã sản phẩm "
                            placeholderTextColor="white"
                            autoCorrect={false}
                        />
                    </View>
                    <View
                        style={{
                            height: 0.5,
                            marginLeft: 10,
                            marginRight: 10,
                            backgroundColor: "#FFFFFF",
                            marginBottom: 20
                        }}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white"
                    }}
                >
                    <Image
                        style={{
                            flex: 1,
                            height: undefined,
                            width: undefined,
                            marginLeft: 50
                        }}
                        resizeMode="contain"
                        source={require("../images/bg_quet2.png")}
                    />
                    <TouchableOpacity
                        style={{
                            width: 200,
                            marginTop: 20,
                            marginBottom: 20,
                            backgroundColor: "#00a219",
                            paddingVertical: 10,
                            alignSelf: "center",
                            justifyContent: "center"
                        }}
                        onPress={this._onPressQR}
                    >
                        <Text style={styles.buttonText}>Quét QR</Text>
                    </TouchableOpacity>
                </View>
                <Alert ref={(ref: any) => this.refAlert = ref} show={this.state.showAlert} type={"normal"}
                       title={'Thông báo'}
                       onConfirmPressed={() => {
                           this.setState({showAlert: false})
                       }}
                       message={'Sản phẩm không tồn tại'}/>
                <Loading loading={this.props.loading} indicatorColor={'blue'}/>
            </SafeAreaView>
        );
    }

    handleSearch = () => {
        let textSearch = this.state.textSearch;
        this.props.getInfoItem(textSearch)
    }
    gotoDetailItem = (code: string) => {
        let url = 'https://vnptcheck.vn/check/'
        url = url.concat(code)
        NavigationService.navigate(ScanRoute.WEB_VIEW, {
            WEB_VIEW_PARAMS: {
                title: 'Thông tin sản phẩm',
                url
            }
        })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column"
    },
    buttonContainer: {
        width: 300,
        marginTop: 30,
        backgroundColor: "#00a219",
        paddingVertical: 15,
        alignSelf: "center",
        justifyContent: "center"
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontWeight: "normal",
        fontSize: 18
    },
    toolbar: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        alignItems: "center"
    },
    searchView: {
        width: "100%",
        height: 35,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#0368d0"

    },
    titleToolbar: {
        marginLeft: 16,
        color: "white",
        fontWeight: "normal",
        fontSize: 18
    },
    viewLine: {
        height: 0.5,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#FFFFFF"
    }
});
