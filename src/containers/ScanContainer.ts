import {connect} from 'react-redux'
import ScanScreen from "../screens/ScanScreen";
import {getInfoUser} from "../redux/actions/InfoUserActions";
import {getInfoItemScan} from "../redux/actions/ScanQRActions";

const mapStateToProps = (state: any) => {
    return ({
        loading: state.infoItem.loading,
        data: state.infoItem.data,
        resultType: state.infoItem.resultType,
        message: state.infoItem.message,
        code: state.infoItem.code
    })
}
const mapDispatchToProps = (dispatch: any) => ({
    getInfoUser: (code: string) => dispatch(getInfoUser(code)),
    getInfoItem: (code: string) => dispatch(getInfoItemScan(code))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ScanScreen)
