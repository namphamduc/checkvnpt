import {connect} from 'react-redux'
import HistoryScreen from "../screens/HistoryScreen";
import {getHistory} from "../redux/actions/HistoryActions";

const mapStateToProps = (state: any) => {
    return (
        {
            loading: state.history.loading,
            data: state.history.data,
            message: state.history.message,
            error: state.history.error
        })
}
const mapDispatchToProps = (dispatch: any) => ({
    getHistory: () => dispatch(getHistory())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryScreen)
