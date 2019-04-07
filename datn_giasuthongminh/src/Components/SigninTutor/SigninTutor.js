import React, { Component } from 'react';
import './SigninTutor.css';
import { Redirect } from 'react-router';
import TutorLoginApi from '../../API/TutorLoginAPI';
import { reactLocalStorage } from "reactjs-localstorage";
import { email, password, required, phone, confirmPassword } from '../../utils/Validate';
class SigninTutor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tutorInfo: {
                tutor_acc_pass: {
                    value: "",
                    error: ""
                },
                tutor_acc_emai: {
                    value: "",
                    error: ""
                },
                tutor_acc_phon: {
                    value: "",
                    error: ""
                },
                tutor_acc_confirm: {
                    value: "",
                    error: ""
                },
                tutor_acc_fullname: {
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

        var { tutorInfo } = this.state;
        var data = {
            userNameTutor: tutorInfo.tutor_acc_fullname.value,
            telUserTutor: tutorInfo.tutor_acc_phon.value,
            emailUserTutor: tutorInfo.tutor_acc_emai.value,
            passwordTutor: tutorInfo.tutor_acc_pass.value
        }
        console.log("1111111111  " , data);
        var result = await TutorLoginApi.register(data);
        console.log(result.data);
        if (!result) alert("Lỗi kết nối mạng")
        if (result && result.code === "error") this.setState({ message: result.message })
        else if (result && result.data) {
            reactLocalStorage.setObject("tutor.login.info", result.data)
        }
        // console.log(result.data);
        this.setState({
            redirectHome: true
        })
    };

    onChangeFullName = (e) => {
        var value = e.target.value
        var { tutorInfo, isClick } = this.state;
        tutorInfo.tutor_acc_fullname.value = value;
        isClick = this.check({ tutorInfo });
        this.setState({ tutorInfo, isClick, message: "" })
    }

    onChangeEmail = (e) => {
        var value = e.target.value
        var { tutorInfo, isClick } = this.state;
        tutorInfo.tutor_acc_emai.value = value;
        tutorInfo.tutor_acc_emai.error = required(value) || email(value);
        isClick = this.check({ tutorInfo });
        this.setState({ tutorInfo, isClick, message: "" })
    }

    onChangePhone = (e) => {
        var value = e.target.value
        var { tutorInfo, isClick } = this.state;
        tutorInfo.tutor_acc_phon.value = value;
        tutorInfo.tutor_acc_phon.error = required(value) || phone(value);
        isClick = this.check({ tutorInfo });
        this.setState({ tutorInfo, isClick, message: "" })
    }
    onChangePass = (e) => {
        var value = e.target.value
        var { tutorInfo, isClick } = this.state;
        tutorInfo.tutor_acc_pass.value = value;
        tutorInfo.tutor_acc_pass.error = required(value) || password(value);
        isClick = this.check({ tutorInfo });
        this.setState({ tutorInfo, isClick, message: "" })
    }
    onChangeConfirm = (e) => {
        var value = e.target.value
        var { tutorInfo, isClick } = this.state;
        tutorInfo.tutor_acc_confirm.value = value;
        tutorInfo.tutor_acc_confirm.error = required(value) || confirmPassword(value, tutorInfo.tutor_acc_pass.value);
        isClick = this.check({ tutorInfo });
        this.setState({ tutorInfo, isClick, message: "" })
    }

    check = (state) => {
        if (!state || (!state.tutorInfo) || (!state.tutorInfo.tutor_acc_emai) || (!state.tutorInfo.tutor_acc_phon) || (!state.tutorInfo.tutor_acc_pass) || (!state.tutorInfo.tutor_acc_confirm)) return false;
        if ((!state.tutorInfo.tutor_acc_emai.value) || (state.tutorInfo.tutor_acc_emai.value && state.tutorInfo.tutor_acc_emai.error)) return false
        if ((!state.tutorInfo.tutor_acc_phon.value) || (state.tutorInfo.tutor_acc_phon.value && state.tutorInfo.tutor_acc_phon.error)) return false
        if ((!state.tutorInfo.tutor_acc_pass.value) || (state.tutorInfo.tutor_acc_pass.value && state.tutorInfo.tutor_acc_pass.error)) return false
        if ((!state.tutorInfo.tutor_acc_confirm.value) || (state.tutorInfo.tutor_acc_confirm.value && state.tutorInfo.tutor_acc_confirm.error)) return false
        return true
    }
    render() {
        const { message, tutorInfo, isClick } = this.state;
      
        if (this.state.redirectToPersonalPage && !isClick) {
            alert("Vui lòng nhập đủ thông tin")
        }
        if (this.state.redirectHome && isClick) {
            return <Redirect push to="/"/>
                    // pathname: '/tutor-profile',
                    // state: { nameTutor: [this.state.tutorInfo.tutor_acc_fullname.value],
                    //          emailTutor: [this.state.tutorInfo.tutor_acc_emai.value],
                    //          telTutor: [this.state.tutorInfo.tutor_acc_phon.value] }}} />
    
        }
        return (
            <div className="signTutor-con">
                <div className="becomeTutor">
                    <div className="text-becomeTutor">
                        <p className="text-becomeTutor"><b>Bạn muốn trở thành gia sư?</b></p>
                    </div>
                    <div className="form-signin">
                        <div className="part-signinTutor">
                            <div className="left-part">
                                <label className="label-becomeTutor">Họ tên</label>
                            </div>
                            <div className="right-part">
                                <input type="text" name="nameTutor" value={tutorInfo.tutor_acc_fullname.value}onChange={this.onChangeFullName}></input>
                            </div>
                        </div>
                        <div className="part-signinTutor">
                            <div className="left-part">
                                <label className="label-becomeTutor">Số điện thoại</label>
                            </div>
                            <div className="right-part">
                                <input type="text" name="telTutor" pattern="[0-9]*"  value={tutorInfo.tutor_acc_phon.value}onChange={this.onChangePhone}></input>
                            </div>
                        </div>
                        {tutorInfo.tutor_acc_phon.error ? tutorInfo.tutor_acc_phon.error : null}
                        <div className="part-signinTutor">
                            <div className="left-part">
                                <label className="label-becomeTutor">Email</label>
                            </div>
                            <div className="right-part">
                                <input type="text" name="emailTutor" value={tutorInfo.tutor_acc_emai.value}onChange={this.onChangeEmail}></input>
                            </div>
                        </div>
                        {tutorInfo.tutor_acc_emai.error ? tutorInfo.tutor_acc_emai.error : null}
                        <div className="part-signinTutor">
                            <div className="left-part">
                                <label className="label-becomeTutor">Mật khẩu</label>
                            </div>
                            <div className="right-part">
                                <input type="password" name="passTutor"  value={tutorInfo.tutor_acc_pass.value}onChange={this.onChangePass}></input>
                            </div>
                        </div>
                        {tutorInfo.tutor_acc_pass.error ? tutorInfo.tutor_acc_pass.error : null}
                        <div className="part-signinTutor">
                            <div className="left-part">
                                <label className="label-becomeTutor">Nhắc lại mật khẩu</label>
                            </div>
                            <div className="right-part">
                                <input type="password" name="rePassTutor"   value={tutorInfo.tutor_acc_confirm.value} onChange={this.onChangeConfirm}></input>
                            </div>
                        </div>
                        {tutorInfo.tutor_acc_confirm.error ? tutorInfo.tutor_acc_confirm.error : null}
                        <div className="btn-become">
                            <button className="btn-become" onClick={this.handleSubmit}>Đăng ký gia sư</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SigninTutor;