import React, { Component } from 'react';
import './Signin.css';
import UserApi from '../../API/UserAPI';
import { Redirect } from "react-router";
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            telUser: "",
            emailUser: "",
            idUser: "",
            passwordUser: "",
            rePassword:"",
            redirectHome: false
        };
    }
    handleChangeForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmitForm = (e) => {
        // if(this.state.username === ""|| this.state.telUser === "" || this.state.emailUser===""||this.state.passwordUser===""){

        // }else{
            e.preventDefault();
            var data = {
                idUser:this.state.passwordUser+"1",
                userName: this.state.username,
                telUser:this.state.telUser,
                emailUser: this.state.emailUser,
                password:this.state.passwordUser
            };
            var user = UserApi.createUser(data).then(result => {
                if (result && result.code === "success") {
                    user = result.data;
                } else if (result.code === "error") {
                    alert(result.message)
                }
            })
            .catch(err => console.log(err));
            this.setState({
                redirectHome:true
            })
        // }
    }
    render() {
        if(this.state.redirectHome){
            return <Redirect push to = "/"/>
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
                        <input type="text" name="username"placeholder="Nhập họ, tên" onChange={this.handleChangeForm}></input>
                    </div>
                </div>
                <div className="part-signin">
                    <div className="title-part-signin">
                        Số điện thoại
                    </div>
                    <div className="value-part-signin">
                        <input type="text" name="telUser" placeholder="Nhập số điện thoại" onChange={this.handleChangeForm}></input>
                    </div>
                </div>
                <div className="part-signin">
                    <div className="title-part-signin">
                        Email
                    </div>
                    <div className="value-part-signin">
                        <input type="text"  name="emailUser"placeholder="Nhập email" onChange={this.handleChangeForm}></input>
                    </div>
                </div>
                <div className="part-signin">
                    <div className="title-part-signin">
                        Mật khẩu
                    </div>
                    <div className="value-part-signin">
                        <input type="password" name="passwordUser" placeholder="Nhập mật khẩu" onChange={this.handleChangeForm}></input>
                    </div>
                </div>
                <div className="part-signin">
                    <div className="title-part-signin">
                        Nhập lại mật khẩu
                    </div>
                    <div className="value-part-signin">
                        <input type="password" name="rePassword" placeholder="Nhập lại mật khẩu" onChange={this.handleChangeForm}></input>
                    </div>
                </div>
                <div className="btn-sigin1">
                    <button className="btn-signin1" onClick={this.onSubmitForm}>Đăng kí</button>
                </div>
            </div>
        );
    }
}

export default Signin;