import React, { Component } from 'react';
import '../Nav/InfoMess.css';
import '../Nav/InfoNotLogin.css';
class ErrorLogin extends Component {
    toggle = () => {
        this.props.toggleErrorLogin();
    }
    render() {
        return (
            <div className="infoMessLogin-con">
                <div className="title-dialog-search">
                    <p className="title-dialog-search">Error</p>
                </div>
                <div className="value-dialog-search">
                    <div className="img-info-err">
                        <label className="img-info-err"><i className="fas fa-exclamation-circle"></i></label>
                    </div>
                    <div className="value-info">
                        <p className="value-info">Email hoặc password không đúng!</p>
                    </div>
                </div>
                <div className="btn-ok-dialog">
                    <button className="btn-ok-dialog" onClick={this.toggle}>OK</button>
                </div>
            </div>
        );
    }
}

export default ErrorLogin;