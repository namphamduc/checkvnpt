import {connect} from 'react-redux'
import MenuScreen from "../screens/MenuScreen";

const mapStateToProps = (state: any) => {
    return ({
        user: state.login.user,
        isLogin: !!state.login.user,
        // isLogin: true,
        // user: {use_thumbnail: 'https://www.w3schools.com/howto/img_avatar.png', use_fullname: 'BuigggsaddssasdasdadsasdadsggDanhNam',},
    })
}
const mapDispatchToProps = (dispatch: any) => ({})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuScreen)
