import React, { Component } from 'react';
import './ChangePassword.css';
import UserAPI from '../../API/UserAPI';
import { reactLocalStorage } from "reactjs-localstorage";
import { email, password, required, phone, confirmPassword } from '../../utils/Validate';
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo:{
                oldPass:{
                    value:"",
                    error:""
                },
                newPass:{
                    value:"",
                    error:""
                },
                reNewPass:{
                    value:"",
                    error:""
                }
            },
            message: "",
            isClick: false,
        }
    }
    onChangeOldPass = (e) => {
        var value = e.target.value
        var { userInfo, isClick } = this.state;
        userInfo.oldPass.value = value;
        userInfo.oldPass.error = required(value) || password(value);
        isClick = this.check({ userInfo });
        this.setState({ userInfo, isClick, message: "" })
    }
    onChangeNewPass = (e) => {
        var value = e.target.value
        var { userInfo, isClick } = this.state;
        userInfo.newPass.value = value;
        userInfo.newPass.error = required(value) || password(value);
        isClick = this.check({ userInfo });
        this.setState({ userInfo, isClick, message: "" })
    }
    onChangeConfirm = (e) => {
        var value = e.target.value
        var { userInfo, isClick } = this.state;
        userInfo.reNewPass.value = value;
        userInfo.reNewPass.error = required(value) || confirmPassword(value, userInfo.newPass.value);
        isClick = this.check({ userInfo });
        this.setState({ userInfo, isClick, message: "" })
    }
    check = (state) => {
        if (!state || (!state.userInfo) || (!state.userInfo.oldPass) || (!state.userInfo.newPass) || (!state.userInfo.reNewPass)) return false;
        if ((!state.userInfo.oldPass.value) || (state.userInfo.oldPass.value && state.userInfo.oldPass.error)) return false
        if ((!state.userInfo.newPass.value) || (state.userInfo.newPass.value && state.userInfo.newPass.error)) return false
        if ((!state.userInfo.reNewPass.value) || (state.userInfo.reNewPass.value && state.userInfo.reNewPass.error)) return false
        return true
    }
    handleSubmit = async () => {
        var user = null;
        var data = {
            old_pass: this.state.userInfo.oldPass.value,
            new_pass: this.state.userInfo.newPass.value
        }
        var result = await UserAPI.changePassword(data);
        if (result && result.data) {
            this.handleLogout();
        } else alert("Lỗi kết nối mạng");
    }
    handleLogout = async () => {
        console.log("Đưc");
        var result = await UserAPI.logout();
        console.log(result)
        if (result) {
            reactLocalStorage.setObject("user.info", null);
            reactLocalStorage.setObject("home.is_login", false);
            reactLocalStorage.set("type", 0);
            this.props.handleChangePass(null, false, 0);
            this.toggle();
        } else console.log("Lỗi kết nối mạng")
    }
    toggle = () => {
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
                            <input className="change-pass-value-item-input" value={this.state.userInfo.oldPass.value} onChange={this.onChangeOldPass} type="password" placeholder="Nhập mật khẩu cũ"></input>
                        </div>
                        {this.state.userInfo.oldPass.error?this.state.userInfo.oldPass.error:null}
                    </div>
                    <div className="change-pass-value-item">
                        <div className="change-pass-value-item-title">
                            <p className="change-pass-value-item-title">Mật khẩu mới</p>
                        </div>
                        <div className="change-pass-value-item-input">
                            <input className="change-pass-value-item-input" type="password" placeholder="Nhập mật khẩu mới" value ={this.state.userInfo.newPass.value} onChange = {this.onChangeNewPass}></input>
                        </div>
                        {this.state.userInfo.newPass.error?this.state.userInfo.newPass.error:null}
                    </div>
                    <div className="change-pass-value-item">
                        <div className="change-pass-value-item-title">
                            <p className="change-pass-value-item-title">Xác nhận mật khẩu mới</p>
                        </div>
                        <div className="change-pass-value-item-input">
                            <input className="change-pass-value-item-input" type="password" placeholder="Nhập lại mật khẩu mới" value ={this.state.userInfo.reNewPass.value} onChange = {this.onChangeConfirm}></input>
                        </div>
                        {this.state.userInfo.reNewPass.error?this.state.userInfo.reNewPass.error:null}
                    </div>
                    <div className="btn-change-pass">
                        <button className="btn-change-pass" onClick={this.handleSubmit}>Xác nhận</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePassword;