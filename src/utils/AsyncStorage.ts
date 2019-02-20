import {AsyncStorage} from "react-native";

export async function setAccessToken(val: string) {
    return await AsyncStorage.setItem("accessToken", val);
}

export async function getAccessToken(): Promise<any> {
    try {
        return await AsyncStorage.getItem("accessToken");
    } catch (e) {
        console.log(e);
        return null;
    }
}
export async function setInfoUser(val: string) {
    return await AsyncStorage.setItem("user", JSON.stringify(val));
}

export async function getInfoUser(): Promise<any> {
    try {
        const data = await AsyncStorage.getItem("user") as any;
        const dataObj = JSON.parse(data)
        return dataObj
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function saveHistory(val: string) {
    let data = [] as any
    getAllHistory().then(async function (value: any[]) {
        if (!value || value.length == 0) {
            data.push(val)
        } else {
            value.unshift(val)
            data = value
        }
        console.log('data save ' +JSON.stringify(data) )
        await AsyncStorage.setItem("history", JSON.stringify(data));
    })
    return await AsyncStorage.setItem("history", JSON.stringify(val));
}

export async function getAllHistory(): Promise<any> {
    try {
        const data = await AsyncStorage.getItem("history") as any;
        const dataObj = JSON.parse(data)
        return dataObj
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function clearHistory() {
    AsyncStorage.removeItem("history");
}

export async function clearAccessToken() {
    AsyncStorage.removeItem("user");
}