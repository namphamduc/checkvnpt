import {connect} from 'react-redux'
import {requestLogin} from "../redux/actions/LoginActions";
import LoginScreen2 from "../screens/LoginScreen2";

const mapStateToProps = (state: any) => {
    return (
        {
            loading: state.login.loading,
            message: state.login.message,
            error: state.login.error
        })
}
const mapDispatchToProps = (dispatch: any) => ({
    requestLogin: (password: any, email: any, rememberMe: boolean) => dispatch(requestLogin(password, email,rememberMe))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen2)