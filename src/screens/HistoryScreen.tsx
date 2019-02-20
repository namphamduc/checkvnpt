import React, {Component} from "react";
import {
    ActivityIndicator,
    FlatList,
    Image, RefreshControl,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {status_item} from "../utils/Constance";

interface Props {
    loading: boolean
    data: any
    message: any
    error: boolean

    getHistory(): void
}

interface State {
    refreshing: boolean
}

export default class HistoryScreen extends Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.state = {
            refreshing: false
        }
    }

    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({
            refreshing: false
        })
    }

    componentDidMount(): void {
        this.props.getHistory();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar/>
                {/* toolbar */}
                <View style={[styles.toolbar, {backgroundColor: "#0368d0"}]}>
                    <Text style={[styles.titleToolbar]}>Lịch sử</Text>
                </View>
                <View style={{flex: 1}}>
                    {this.renderHistory(this.props.data)}
                </View>
            </SafeAreaView>
        );
    }

    renderHistory = (data: any) => {
        console.log('json ' + JSON.stringify(this.props.data))
        if (this.props.loading) {
            return this.renderLoading()
        } else {
            if ((data && data.length > 0)) {
                return (<FlatList refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        colors={['blue']}
                        tintColor={'blue'}
                        onRefresh={this._handleRefresh}
                    />
                } data={data} keyExtractor={(item, index) => 'key' + index}
                                  renderItem={this.renderItemHistory}/>)
            } else {
                return (
                    <View style={{alignItems: 'center', marginTop: 20}}>
                        <Text>Không có dữ liệu </Text>
                    </View>
                )
            }
        }

    }
    _handleRefresh = () => {
        this.setState({
            refreshing: true
        })
        this.props.getHistory();
    }
    renderLoading = () => {
        return (
            <ActivityIndicator style={{marginTop: 10, justifyContent: 'center'}} size="small" color={'blue'}/>
        )
    }
    renderItemHistory = (item: any) => {
        console.log('ite' + JSON.stringify(item))
        const {pro_name, ite_status, company_infor, code, time} = item.item
        const {vi} = JSON.parse(pro_name)
        let com_name
        if (company_infor) {
            com_name = company_infor.com_name
        }
        let dataImage: any = this.getImageByItemStatus(ite_status);
        console.log('data dataImage ' + JSON.stringify(dataImage))
        const {image, status} = dataImage
        return (
            <TouchableOpacity>
                <View style={{
                    marginTop: 5,
                    marginBottom: 15,
                    height: 100,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: 'flex-start',
                        alignItems: 'stretch',
                        height: '100%',
                    }}>
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginStart: 10,
                            marginEnd: 10,
                        }}>
                            <Image
                                style={{
                                    alignSelf: 'center',
                                    height: 50,
                                    width: 50
                                }}
                                source={image}
                            />
                            <Text style={{
                                fontSize: 14, color: '#000000', alignSelf: 'center'
                            }}>{status}</Text>

                        </View>
                        <View style={{flexDirection: 'column', flex: 1, marginStart: 10, marginEnd: 10, marginTop: 5}}>
                            <Text numberOfLines={1} ellipsizeMode='tail'
                                  style={{
                                      flex: 1,
                                      fontSize: 16,
                                      color: '#000000',
                                      fontWeight: "bold"
                                  }}>{vi}</Text>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                                <Text style={{fontSize: 14, width: 80, color: '#000000'}}>Mã SP</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail'
                                      style={{fontSize: 14, color: '#0174DF'}}>{code}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                                <Text style={{width: 80, fontSize: 14, color: '#000000'}}>Nhà SX</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail'
                                      style={{fontSize: 14, color: '#848484'}}>{com_name}</Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                                <Text style={{width: 80, fontSize: 14, color: '#000000'}}>Thời gian</Text>
                                <Text numberOfLines={1} ellipsizeMode='tail'
                                      style={{fontSize: 14, color: '#848484'}}>{time}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height: '100%', width: 10, marginEnd: 10, marginTop: 5}}>
                        <Image
                            style={styles.rightContainer}
                            source={require("../images/ic_three_dot.png")}
                        />
                    </View>
                </View>
                <View style={{
                    opacity: 0.3,
                    height: 0.4,
                    backgroundColor: "black"
                }}/>
            </TouchableOpacity>
        )
    }

    getImageByItemStatus = (ite_status: any): any => {
        switch (ite_status) {
            case -2:
                return {status: status_item.offline, image: require("../images/ic_warning.png")}
            case -1:
                return {status: status_item.exp, image: require("../images/ic_error.png")}
            case -3:
                return {status: status_item.no_exp, image: require("../images/ic_error.png")}
            case 3:
                return {status: status_item.selling, image: require("../images/ic_selling.png")}
            case 4:
                // todo need confirm  db.tbl_user_get_info("type") = 3 or != 3
                return {status: status_item.selling, image: require("../images/ic_selling.png")}
            case 5:
                return {status: status_item.bought, image: require("../images/ic_bought_confirm.png")}
        }
    }

}
const styles = StyleSheet.create({
    leftContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    rightContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 10,
        width: 7,
        height: 30
    },
    itemText: {
        color: "black",
        fontSize: 16,
        alignSelf: "center",
        marginLeft: 20
    },
    itemView: {},
    container: {
        flex: 1,
        backgroundColor: "white",
        flexDirection: "column"
    },
    toolbar: {
        justifyContent: "center",
        width: '100%',
        height: 70,
        flexDirection: "row",
        alignItems: "center"
    },
    titleToolbar: {
        marginLeft: 16,
        color: "white",
        fontWeight: "normal",
        fontSize: 18
    }
});
