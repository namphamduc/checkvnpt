import {connect} from 'react-redux'
import ScanScreen from "../screens/ScanScreen";
import {getInfoUser} from "../redux/actions/InfoUserActions";

const mapStateToProps = (state: any) => {
    return ({})
}
const mapDispatchToProps = (dispatch: any) => ({
    getInfoUser : (code: string) => dispatch(getInfoUser(code))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScanScreen)
