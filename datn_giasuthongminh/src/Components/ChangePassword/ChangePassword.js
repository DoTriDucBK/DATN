import React, { Component } from 'react';
import './ChangePassword.css';
class ChangePassword extends Component {
    toggle = ()=>{
        this.props.togglePass();
    }
    render() {
        return (
            <div className="change-password-container">
                <div className="change-pass-title">
                    <div className="change-pass-title-left">
                        <h1 className="change-pass-title">Đổi mật khẩu</h1>
                    </div>
                    <div className="change-pass-cancel">
                        <label className="change-pass-cancel" onClick={this.toggle}><i className="far fa-times-circle"></i></label>
                    </div>
                </div>
                <div className="change-pass-value">
                    <div className="change-pass-value-item">
                        <div className="change-pass-value-item-title">
                            <p className="change-pass-value-item-title">Mật khẩu cũ</p>
                        </div>
                        <div className="change-pass-value-item-input">
                            <input className="change-pass-value-item-input" type="password" placeholder="Nhập mật khẩu cũ"></input>
                        </div>  
                    </div>
                    <div className="change-pass-value-item">
                        <div className="change-pass-value-item-title">
                            <p className="change-pass-value-item-title">Mật khẩu mới</p>
                        </div>
                        <div className="change-pass-value-item-input">
                            <input className="change-pass-value-item-input" type="password" placeholder="Nhập mật khẩu mới"></input>
                        </div>  
                    </div>
                    <div className="change-pass-value-item">
                        <div className="change-pass-value-item-title">
                            <p className="change-pass-value-item-title">Xác nhận mật khẩu mới</p>
                        </div>
                        <div className="change-pass-value-item-input">
                            <input className="change-pass-value-item-input" type="password" placeholder="Nhập lại mật khẩu mới"></input>
                        </div>  
                    </div>
                    <div className="btn-change-pass">
                        <button className="btn-change-pass">Xác nhận</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePassword;