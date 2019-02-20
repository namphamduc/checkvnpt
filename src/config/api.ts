import Config from 'react-native-config'

export const BASE_URL = Config.API_URL;
export const URL_LOGIN = 'https://vnptcheck.vn//check2_service_authen/bi/signin'
//https://vnptcheck.vn//check2_service_app/app/getitembycode/23174021902424
export const API_GET_ITEM_BY_CODE = BASE_URL + '/getitembycode/';
// https://vnptcheck.vn//check2_service_app/app/getcompanybycode/23174021902424
export const API_GET_COMPANY_BY_CODE = BASE_URL + '/getcompanybycode/';
export const API_BATCH_IMAGE_BY_CODE = BASE_URL + '/getbatchimagebycode/';
export const API_PUSH_LOCATION = BASE_URL + '/updatelocation/';
