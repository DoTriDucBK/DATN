import React, { Component } from 'react';
import './Login.css';
import UserApi from '../../API/UserAPI';
import { reactLocalStorage } from "reactjs-localstorage";
import { password, required, emailAndPhone } from '../../utils/Validate';
import { Redirect } from 'react-router';
import TutorLoginApi from '../../API/TutorLoginAPI';

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
            },
            message: "",
            isClick: false,
            redirectSignUp: false,
            redirectHome: false,
            type: ""
        }

    }
    redirectSignUp = () => {
        this.setState({ redirectSignUp: true });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        var { usernameInput, passwordInput, type } = this.state;
        var user = null;
            var result = await UserApi.login({
                userName: usernameInput.value,
                password: passwordInput.value,
                type: parseInt(type)
            })
            if (result && result.message)
                this.setState({ message: result.message })
            else if (result && result.data) {
                user = result.data;
                reactLocalStorage.setObject("user.info", user);
                reactLocalStorage.set("home.is_login", true);
                this.props.handleLogin(user, true)
            } else alert("Lỗi kết nối mạng");

            this.setState({
                redirectHome: true,
            })
            this.props.toggle();
    };

    onChangeUsername = (e) => {
        var value = e.target.value;
        var { usernameInput, passwordInput, isClick } = this.state;
        usernameInput.value = value
        usernameInput.error = required(value);
        isClick = this.check({ usernameInput, passwordInput });
        this.setState({ usernameInput, passwordInput, isClick, message: "" })
    }

    onChangePassword = (e) => {
        var value = e.target.value;
        var { usernameInput, passwordInput, isClick } = this.state;
        passwordInput.value = value
        passwordInput.error = required(value) || password(value);
        isClick = this.check({ usernameInput, passwordInput });
        this.setState({ usernameInput, passwordInput, isClick, message: "" })
    }
    handleChangeInputTextForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }
    check = (state) => {
        if (!state || (!state.usernameInput) || (!state.passwordInput)) return false;
        if ((!state.usernameInput.value) || (state.usernameInput.value && state.usernameInput.error)) return false;
        if ((!state.passwordInput.value) || (state.passwordInput.value && state.passwordInput.error)) return false;
        return true
    }

    render() {
        if (this.state.redirectSignUp) {
            return <Redirect push to={"/signin"} />
        }
        if (this.state.redirectHome) {
            return <Redirect push to={"/"} />
        }
        return (
            <div className="login-con">
                <div className="login-title">
                    <p><b>Đăng nhập</b></p>
                </div>
                <div className="login-username">
                    <div className="login-username-title">
                        <p className="login-username">Username</p>
                    </div>
                    <input type="text" placeholder="Tên đăng nhập"
                        value={this.state.usernameInput.value}
                        onChange={this.onChangeUsername}>
                    </input>
                </div>
                <div className="login-username">
                    <div className="login-username-title">
                        <p className="login-username">Password</p>
                    </div>
                    <input type="password" placeholder="Mật khẩu" value={this.state.passwordInput.value} onChange={this.onChangePassword}></input>
                </div>
                <div className="is_tutor">
                    <div className="is_tutor_left">
                        <label className="is_tutor">Bạn là: </label>
                    </div>
                    <div className="is_tutor_right">
                        <input type="radio" name="type" value="2" className="is_tutor" checked={this.state.type === "2"} onChange={this.handleChangeInputTextForm} /> Học viên
                        <input type="radio" name="type" value="1" className="is_tutor" checked={this.state.type === "1"} onChange={this.handleChangeInputTextForm} /> Gia sư
                    </div>
                </div>
                <div className="login-btn">
                    <button className="btn-login" onClick={this.handleSubmit}>Đăng nhập</button>
                </div>
                <div className="log-sign">
                    <p>Bạn chưa có tài khoản, <label><b onClick={this.redirectSignUp}>Đăng ký </b></label> ngay!</p>
                </div>
            </div>
        );
    }
}

export default Login;