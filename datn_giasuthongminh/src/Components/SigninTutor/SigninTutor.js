import React, { Component } from 'react';
import './SigninTutor.css';
import { Redirect } from 'react-router';
import TutorLoginApi from '../../API/TutorLoginAPI';
class SigninTutor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameTutor: "",
            telTutor: "",
            emailTutor: "",
            passTutor: "",
            rePassTutor: "",
            redirectToTutorProfile: false
        };
    }
    handleChangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onSubmitForm = (e) => {
        if (this.state.nameTutor === "" || this.state.telTutor === "" || this.state.emailTutor === "" || this.state.passTutor === "" || this.state.rePassTutor === "") {
        } else {
            
            e.preventDefault();
        var data = {
            userNameTutor: this.state.nameTutor,
            telUserTutor: this.state.telTutor,
            emailUserTutor: this.state.telTutor,
            passwordTutor: this.state.passTutor
        }
        console.log("1111111111  " , data);
        var tutorAcount = TutorLoginApi.createTutorLogin(data).then(result => {
            if (result && result.code === "success") {
                tutorAcount = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
        .catch(err => console.log(err));
        // if (!result) alert("Lỗi kết nối mạng")
        // if (result && result.code === "error") this.setState({ message: result.message })
        // else if (result && result.data) {
        //     reactLocalStorage.setObject("user.info", result.data)
        // }
        this.setState({
            redirectToTutorProfile: true
        })

        }
    }
    render() {
        if (this.state.redirectToTutorProfile) {
            return <Redirect to={{
                    pathname: '/tutor-profile',
                    state: { nameTutor: [this.state.nameTutor],
                             emailTutor: [this.state.emailTutor],
                             telTutor: [this.state.telTutor] }}} />
    
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
                                <input type="text" name="nameTutor" onChange={this.handleChangeInput}></input>
                            </div>
                        </div>
                        <div className="part-signinTutor">
                            <div className="left-part">
                                <label className="label-becomeTutor">Số điện thoại</label>
                            </div>
                            <div className="right-part">
                                <input type="text" name="telTutor" pattern="[0-9]*" onChange={this.handleChangeInput}></input>
                            </div>
                        </div>
                        <div className="part-signinTutor">
                            <div className="left-part">
                                <label className="label-becomeTutor">Email</label>
                            </div>
                            <div className="right-part">
                                <input type="text" name="emailTutor" onChange={this.handleChangeInput}></input>
                            </div>
                        </div>
                        <div className="part-signinTutor">
                            <div className="left-part">
                                <label className="label-becomeTutor">Mật khẩu</label>
                            </div>
                            <div className="right-part">
                                <input type="password" name="passTutor" onChange={this.handleChangeInput}></input>
                            </div>
                        </div>
                        <div className="part-signinTutor">
                            <div className="left-part">
                                <label className="label-becomeTutor">Nhắc lại mật khẩu</label>
                            </div>
                            <div className="right-part">
                                <input type="password" name="rePassTutor" onChange={this.handleChangeInput}></input>
                            </div>
                        </div>
                        <div className="btn-become">
                            <button className="btn-become" onClick={this.onSubmitForm}>Đăng ký gia sư</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SigninTutor;