import {checkPermission, requestPermission} from "./PermissionHelper";
import {PermissionsAndroid, Platform} from "react-native";


function getCurrentLocation(onSuccess: (dataLocation: any) => void, onError: (error: any) => void) {
    if (Platform.OS === 'android' && Platform.Version >= 25) {
        if (checkPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)) {
            getLocation(onSuccess, onError)
        } else {
            requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, () => {
                getLocation(onSuccess, onError)
            }, () => {
                onError('Permission_Location_rejected')
            })
        }
    } else {
        getLocation(onSuccess, onError)
    }
}

function getLocation(onSuccess: (dataLocation: any) => void, onError: (error: any) => void) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log('------------' + JSON.stringify(position))
            onSuccess(position)
        },
        (error) => {
            console.log('   m' + JSON.stringify(error))
            onError(error)
        },
        {enableHighAccuracy: true, timeout: 20000},
    );
}

export {
    getCurrentLocation
}