import {getAccessToken, setAccessToken} from "../utils/AsyncStorage";

type RequestOptions = "POST" | "GET"

class HttpService {
    request(method: RequestOptions, url: string, data = {}): Promise<any> {
        // @ts-ignore
        return new Promise(async (resolve: any, reject: any) => {
            let accessToken: any = await getAccessToken();
            let headers: any = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
            if (accessToken) {
                headers['Authorization'] = accessToken;
            }
            let fetchOptions: any = {
                method: method,
                headers
            }
            if (method !== 'GET') {
                fetchOptions['body'] = JSON.stringify(data)
            }
            console.log(`%c Fetch options REST api from ${url}: `, 'background: #ffff00' + '; color: #000', fetchOptions);
            return fetch(url, fetchOptions)
                .then((res) => {
                    console.log(`%c Response request from ${url}: `, 'background: #3333ff; color: #fff', res)
                    if (res.ok) {
                        if (res.headers.has("authorization")) {
                            let newToken;
                            newToken = res.headers.get("authorization");
                            newToken && setAccessToken(newToken);
                        }
                    }
                    return res.json()
                }).then(async (data) => {
                    if (data.code == 200) {
                        console.log(`%c Success REST from ${url}: `, 'background: #66ff33 ;color: #000', data)
                        return resolve(data)
                    } else {
                        console.log(`%c Error REST from ${url}: `, 'background: #ff0000 ;color: #fff', data)
                        return reject(data)
                    }
                }).catch(error => {
                    console.log(`%c Error REST from ${url}: `, 'background: red color: #fff', error.toString())
                    return reject(error)
                })
        })

    }
}

export default new HttpService()