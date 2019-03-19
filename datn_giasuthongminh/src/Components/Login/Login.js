import React, { Component } from 'react';
import './Login.css';

// import {password, required, emailAndPhone} from '../../utils/Validate';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameInput: {
                value: "",
                error: ""
            },
            passwordInput: {
                value: "",
                error: ""
            }
        }

    }

    onChangeUserName = (e) => {
        var value = e.target.value;
        this.usernameInput.value = value;
        console.log(this.usernameInput.value);
    }
    render() {
        return (
            <div className="login-con">
                <div className="login-title">
                    <p><b>Đăng nhập</b></p>
                </div>
                <div className="login-username">
                    <div className="login-username-title">
                        <p className="login-username">Username</p>
                    </div>
                    <input type="text" placeholder="Tên đăng nhập">
                    </input>
                </div>
                <div className="login-username">
                    <div className="login-username-title">
                        <p className="login-username">Password</p>
                    </div>
                    <input type="password" placeholder="Mật khẩu"></input>
                </div>
                <div className="login-btn">
                    <button className="btn-login">Đăng nhập</button>
                </div>
                <div className="log-sign">
                    <p>Bạn chưa có tài khoản, <label><b>Đăng ký </b></label> ngay!</p>
                </div>
            </div>
        );
    }
}

export default Login;