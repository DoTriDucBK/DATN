import React, { Component } from 'react';
import './InfoMess.css';
class InfoNotLogin extends Component {
    toggle = () => {
        this.props.toggleNotLogin();
    }
    render() {
        return (
            <div className="infoMess-con">
                <div className="title-dialog-search">
                    <p className="title-dialog-search">Error</p>
                </div>
                <div className="value-dialog-search">
                    <div className="img-info-err">
                        <label className="img-info-err"><i className="fas fa-exclamation-circle"></i></label>
                    </div>
                    <div className="value-info">
                        <p className="value-info">Đăng nhập trước khi thực hiện!</p>
                    </div>
                </div>
                <div className="btn-ok-dialog">
                    <button className="btn-ok-dialog" onClick={this.toggle}>OK</button>
                </div>
            </div>
        );
    }
}

export default InfoNotLogin;