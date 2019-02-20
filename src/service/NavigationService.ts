import {NavigationActions, StackActions} from 'react-navigation';
let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
    _navigator = navigatorRef;
}
export default {
    setTopLevelNavigator,
    navigate
}
function navigate(routeName: string, params?: any) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}