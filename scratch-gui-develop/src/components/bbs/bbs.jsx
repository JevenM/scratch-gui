import classNames from 'classnames';  // 样式
import bindAll from 'lodash.bindall'; // 绑定所有的通用方法
import PropTypes from 'prop-types'; // 传参类型限制
import React from 'react';  
import {defineMessages, injectIntl, intlShape} from 'react-intl'; // 国际化react 组件
import Modal from '../../containers/modal.jsx';   // 窗口
import Spinner from '../spinner/spinner.jsx'; // 加载中
import styles from './bbs.css'; // 样式


class BbsComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose',
            'setFilteredDataRef'
        ]);
        this.state = {
            loaded: false // 加载状态
        };
    }
    componentDidMount () {
        // 加载完成后， 把加载中去掉
        setTimeout(() => {
            this.setState({loaded: true});
        });
    }
    //更新
    componentDidUpdate (prevProps, prevState) {
     
    }
    // 关闭当前端口
    handleClose () {
        this.props.onRequestClose();
    }
    
    // 滚动到顶部
    scrollToTop () {
        this.filteredDataRef.scrollTop = 0;
    }
    //  设置引用
    setFilteredDataRef (ref) {
        this.filteredDataRef = ref;
    }
    render () {
        return (
            <Modal
                fullScreen
                contentLabel={this.props.title}
                id={this.props.id}
                onRequestClose={this.handleClose}
            >
                {/* NOTES 底部的共总 items 区域 */}
                <div
                    className={classNames(styles.bbsScrollGrid)}
                    ref={this.setFilteredDataRef}
                >
                    {/* NOTES 加载中 */}
                    { this.state.loaded &&!this.props.loading ? ( 
                             <div>数据中心</div>
                        ):(
                            <div className={styles.spinnerWrapper}>
                                <Spinner
                                    large
                                    level="primary"
                                />
                            </div>
                        )
                    }
                    
                </div>
            </Modal>
        );
    }
}

BbsComponent.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    onRequestClose: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

BbsComponent.defaultProps = {
    title: '论坛',
    id: 'bbs',
    loading: false
};

export default injectIntl(BbsComponent);
