import bindAll from 'lodash.bindall'; // 通用绑定this
import PropTypes from 'prop-types'; //类型
import React from 'react';
import {injectIntl, intlShape, defineMessages} from 'react-intl'; // 国际化
import BbsComponent from '../components/bbs/bbs.jsx' //论坛组件
import {connect} from 'react-redux'; // redux 连接器
import {closebbs} from '../reducers/modals'; // 关闭课程弹窗



class Bbs extends React.PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            loading: false // 加载状态
        };
    }
    render () {
        if (!this.props.visible) return null;
        return (
            <BbsComponent
                 onRequestClose={this.props.onRequestClose}
                 loading={this.state.loading}
            />
        );
    }
    componentDidMount(){
        
    }
}
 
Bbs.propTypes = {
    onRequestClose: PropTypes.func,
    visible: PropTypes.bool
};

const mapStateToProps = state => ({
    visible: state.scratchGui.modals.bbs
});

const mapDispatchToProps = dispatch => ({
    onRequestClose: () => dispatch(closebbs()) // 关闭当前弹窗
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Bbs));
