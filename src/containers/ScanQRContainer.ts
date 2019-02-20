import {connect} from 'react-redux'
import ScanQRScreen from "../screens/ScanQRScreen";
import {getInfoItemScan} from "../redux/actions/ScanQRActions";

const mapStateToProps = (state: any) => {
    return ({})
}
const mapDispatchToProps = (dispatch: any) => ({
    getInfoItem: (code: string) => dispatch(getInfoItemScan(code))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScanQRScreen)
