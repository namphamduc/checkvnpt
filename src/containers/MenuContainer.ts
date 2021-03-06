import {connect} from 'react-redux'
import MenuScreen from "../screens/MenuScreen";
import {getInfoUser} from "../redux/actions/InfoUserActions";

const mapStateToProps = (state: any) => {
    return ({
        user: state.infoUser.user,
        isLogin: !!state.infoUser.user,
    })
}
const mapDispatchToProps = (dispatch: any) => ({
    getInfoUser: (token: any) => dispatch(getInfoUser(token))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuScreen)
