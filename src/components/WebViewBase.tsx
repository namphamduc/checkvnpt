import React, {Component} from 'react'
import {ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, WebView} from "react-native"

export const WEB_VIEW_PARAMS = "WEB_VIEW_PARAMS"

export default class WebViewBase extends Component<{ navigation?: any, onBackPress?(): any }> {
    static navigationOptions = () => {
        return {
            header: null
        }
    }

    render() {
        return (
            <View style={defaultStyles.container}>
                <View style={[defaultStyles.toolbar, {backgroundColor: "#0368d0"}]}>
                    <TouchableOpacity onPress={this.onBackPress}>
                        <Image
                            style={{
                                marginLeft: 10,
                                width: 20,
                                height: 20
                            }}
                            source={require("../images/ic_left_back.png")}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[defaultStyles.titleToolbar]}>{this.props.navigation.state.params[WEB_VIEW_PARAMS].title}</Text>
                </View>
                <WebView
                    startInLoadingState={true}
                    renderLoading={this.renderLoading}
                    source={{uri: this.props.navigation.state.params[WEB_VIEW_PARAMS].url}}
                />
            </View>
        )

    }

    onBackPress = () => {
        this.props.navigation.pop();
    }

    renderLoading = () => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator color={'blue'}/>
            </View>
        )
    }
}

const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    toolbar: {
        height: 70,
        flexDirection: "row",
        alignItems: "center"
    },
    titleToolbar: {
        marginLeft: 16,
        color: "white",
        fontWeight: "normal",
        fontSize: 16
    },
})
