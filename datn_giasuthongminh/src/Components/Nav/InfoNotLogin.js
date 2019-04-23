import React, { Component } from 'react';
import './InfoMess.css';
class InfoNotLogin extends Component {
    render() {
        return (
            <div className="infoMess-con">
                <div className="img-info-err">

                </div>
                <div className="value-info">
                    <p className="value-info">Vui lòng đăng nhập trước khi thực hiện!</p>
                </div>
            </div>
        );
    }
}

export default InfoNotLogin;