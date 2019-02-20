import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
    ActivityIndicator,
    Modal, EasingFunction,
} from 'react-native';

interface Props {
    image?: any,
    backgroundColor?: string,
    borderRadius?: number,
    size?: number,
    imageSize?: number,
    indicatorColor?: string,
    easing?: any,
    loading: boolean,
}

interface State {
    rotate_value: any
    show: boolean
    startAnimation: boolean
}

export default class Loading extends Component<Props, State> {
    static EasingType = Easing;

    static defaultProps = {
        image: null,
        backgroundColor: '#ffffffF2',
        borderRadius: 5,
        size: 70,
        imageSize: 40,
        indicatorColor: 'gray',
        easing: Easing.ease,
        loading: null,
    };
    private doingAnimation: boolean;
    private easing: EasingFunction;


    constructor(props: any) {
        super(props);
        this.doingAnimation = false;
        this.easing = Easing.ease;
        this.state = {
            rotate_value: new Animated.Value(0),
            show: false,
            startAnimation: false,
        };
    }

    _startAnimation = () => {
        this.doingAnimation = true;
        this.state.rotate_value.setValue(0);
        Animated.timing(this.state.rotate_value, {
            toValue: 1,
            duration: 1000,
            easing: Easing.out(this.easing),
        }).start(() => {
            if (this.state.startAnimation) {
                this._startAnimation();
            }
        });
    };

    /**
     * show loading
     * @param isShow
     */
    show(isShow = true) {
        if (isShow) {
            this.setState((state: any) => {
                state.show = true;
                state.startAnimation = true;
                return state;
            });
            !this.doingAnimation && this._startAnimation();
        } else {
            this.close();
        }
    }

    /**
     * hide loading
     */
    close() {
        this.doingAnimation = false;
        this.setState((state: any) => {
            state.show = false;
            state.startAnimation = false;
            return state;
        });
    }

    render() {
        const {
            image = null,
            backgroundColor = '#ffffffF2',
            borderRadius = 5,
            size = 70,
            imageSize = 40,
            indicatorColor = 'gray',
            easing = Easing.ease,
            loading = null,
        } = this.props;
        this.easing = easing;

        let {show} = this.state;
        if (loading != null) {
            show = loading;
        }
        return (
            <Modal transparent={true} onRequestClose={() => {
            }}
                   visible={show}>
                <View style={styles.loadingView}>
                    <View style={[styles.loading, {
                        backgroundColor: backgroundColor,
                        borderRadius: borderRadius,
                        width: size,
                        height: size,
                    }]}>
                        {
                            image ?
                                <Animated.Image
                                    style={{
                                        width: imageSize,
                                        height: imageSize,
                                        transform: [
                                            {
                                                rotateZ: this.state.rotate_value.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0deg', '360deg'],
                                                }),
                                            },
                                        ],
                                    }}
                                    source={image}/> :
                                <ActivityIndicator
                                    size={'large'}
                                    color={indicatorColor}
                                    animating={true}/>
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        backgroundColor: '#00000033',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const EasingType = Loading.EasingType;
