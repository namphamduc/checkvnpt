import {Permission, PermissionsAndroid} from 'react-native';

async function requestPermission(permission: Permission, onGranted: () => void, onReject: () => void) {
    try {
        const granted = await PermissionsAndroid.request(permission)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            onGranted()
        } else {
            onReject()
        }
    } catch (err) {
        onReject()
    }
}

function checkPermission(permission: Permission): Promise<boolean> {
    return PermissionsAndroid.check(permission)
}

export {
    checkPermission, requestPermission
}
