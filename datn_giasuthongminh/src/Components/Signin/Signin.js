import React, { Component } from 'react';
import './Signin.css';
import UserApi from '../../API/UserAPI';
import { reactLocalStorage } from "reactjs-localstorage";
import { email, password, required, phone, confirmPassword } from '../../utils/Validate';
import { Redirect } from 'react-router';
class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                user_acc_pass: {
                    value: "",
                    error: ""
                },
                user_acc_emai: {
                    value: "",
                    error: ""
                },
                user_acc_phon: {
                    value: "",
                    error: ""
                },
                user_acc_confirm: {
                    value: "",
                    error: ""
                },
                user_acc_fullname: {
                    value: "",
                }
            },
            message: "",
            isClick: false,
            redirectHome: false,
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        var { userInfo } = this.state;
        var data = {
            userName: userInfo.user_acc_fullname.value,
            telUser: userInfo.user_acc_phon.value,
            emailUser: userInfo.user_acc_emai.value,
            password: userInfo.user_acc_pass.value
        }
        console.log("1111111111  " , data);
        var result = await UserApi.register(data);
        if (!result) alert("Lỗi kết nối mạng")
        if (result && result.code === "error") this.setState({ message: result.message })
        else if (result && result.data) {
            reactLocalStorage.setObject("user.info", result.data)
        }
        console.log(result.data);
        this.setState({
            redirectHome: true
        })
    };

    onChangeFullName = (e) => {
        var value = e.target.value
        var { userInfo, isClick } = this.state;
        userInfo.user_acc_fullname.value = value;
        isClick = this.check({ userInfo });
        this.setState({ userInfo, isClick, message: "" })
    }

    onChangeEmail = (e) => {
        var value = e.target.value
        var { userInfo, isClick } = this.state;
        userInfo.user_acc_emai.value = value;
        userInfo.user_acc_emai.error = required(value) || email(value);
        isClick = this.check({ userInfo });
        this.setState({ userInfo, isClick, message: "" })
    }

    onChangePhone = (e) => {
        var value = e.target.value
        var { userInfo, isClick } = this.state;
        userInfo.user_acc_phon.value = value;
        userInfo.user_acc_phon.error = required(value) || phone(value);
        isClick = this.check({ userInfo });
        this.setState({ userInfo, isClick, message: "" })
    }
    onChangePass = (e) => {
        var value = e.target.value
        var { userInfo, isClick } = this.state;
        userInfo.user_acc_pass.value = value;
        userInfo.user_acc_pass.error = required(value) || password(value);
        isClick = this.check({ userInfo });
        this.setState({ userInfo, isClick, message: "" })
    }
    onChangeConfirm = (e) => {
        var value = e.target.value
        var { userInfo, isClick } = this.state;
        userInfo.user_acc_confirm.value = value;
        userInfo.user_acc_confirm.error = required(value) || confirmPassword(value, userInfo.user_acc_pass.value);
        isClick = this.check({ userInfo });
        this.setState({ userInfo, isClick, message: "" })
    }

    check = (state) => {
        if (!state || (!state.userInfo) || (!state.userInfo.user_acc_emai) || (!state.userInfo.user_acc_phon) || (!state.userInfo.user_acc_pass) || (!state.userInfo.user_acc_confirm)) return false;
        if ((!state.userInfo.user_acc_emai.value) || (state.userInfo.user_acc_emai.value && state.userInfo.user_acc_emai.error)) return false
        if ((!state.userInfo.user_acc_phon.value) || (state.userInfo.user_acc_phon.value && state.userInfo.user_acc_phon.error)) return false
        if ((!state.userInfo.user_acc_pass.value) || (state.userInfo.user_acc_pass.value && state.userInfo.user_acc_pass.error)) return false
        if ((!state.userInfo.user_acc_confirm.value) || (state.userInfo.user_acc_confirm.value && state.userInfo.user_acc_confirm.error)) return false
        return true
    }
    render() {
        const { message, userInfo, isClick } = this.state;
        if (this.state.redirectHome && isClick) {
            return <Redirect push to={"/"} />;
        }
        if (this.state.redirectHome && !isClick) {
            alert("Vui lòng nhập đủ thông tin")
        }
        return (
            <div className="signin-container">
                <div className="title-signin">
                    <h1>Đăng kí thành viên</h1>
                </div>
                <div className="part-signin">
                    <div className="title-part-signin">
                        Họ tên
                    </div>
                    <div className="value-part-signin">
                        <input type="text" name="username"placeholder="Nhập họ, tên" value={userInfo.user_acc_fullname.value}onChange={this.onChangeFullName}></input>
                    </div>
                </div>
                <div className="part-signin">
                    <div className="title-part-signin">
                        Số điện thoại
                    </div>
                    <div className="value-part-signin">
                        <input type="text" name="telUser" placeholder="Nhập số điện thoại" 
                        value={userInfo.user_acc_phon.value}onChange={this.onChangePhone}></input>
                    </div>
                </div>
                {userInfo.user_acc_phon.error ? userInfo.user_acc_phon.error : null}
                <div className="part-signin">
                    <div className="title-part-signin">
                        Email
                    </div>
                    <div className="value-part-signin">
                        <input type="text"  name="emailUser"placeholder="Nhập email" 
                        value={userInfo.user_acc_emai.value}onChange={this.onChangeEmail}></input>
                    </div>
                </div>
                {userInfo.user_acc_emai.error ? userInfo.user_acc_emai.error : null}
                <div className="part-signin">
                    <div className="title-part-signin">
                        Mật khẩu
                    </div>
                    <div className="value-part-signin">
                        <input type="password" name="passwordUser" placeholder="Nhập mật khẩu" 
                        value={userInfo.user_acc_pass.value}onChange={this.onChangePass}></input>
                    </div>
                </div>
                {userInfo.user_acc_pass.error ? userInfo.user_acc_pass.error : null}
                <div className="part-signin">
                    <div className="title-part-signin">
                        Nhập lại mật khẩu
                    </div>
                    <div className="value-part-signin">
                        <input type="password" name="rePassword" placeholder="Nhập lại mật khẩu" 
                        value={userInfo.user_acc_confirm.value} onChange={this.onChangeConfirm}></input>
                    </div>
                </div>
                {userInfo.user_acc_confirm.error ? userInfo.user_acc_confirm.error : null}
                <div className="btn-sigin1">
                    <button className="btn-signin1" onClick={this.handleSubmit}>Đăng kí</button>
                </div>
            </div>
        );
    }
}

export default Signin;