import React, { Component } from 'react';
import './InfoUser.css';
import UserAPI from '../../API/UserAPI';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Redirect } from 'react-router';
class InfoUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            idUser:reactLocalStorage.getObject("user.info").idUser,
            userName:"" ,
            telUser: "",
            emailUser: "",
            user:[],
            redirectHome:false
        }
    }
    handleChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    async componentDidMount(){
        var userInfo = await UserAPI.getUserByIdUser(this.state.idUser);
        this.setState({
            user:userInfo.data,
            userName:userInfo.data[0].userName,
            emailUser:userInfo.data[0].emailUser,
            telUser:userInfo.data[0].telUser
        })
    }
    submitInfo = async() => {
        var data = {
            idUser: this.state.user[0].idUser,
            userName:this.state.userName,
            telUser:this.state.telUser,
            emailUser:this.state.emailUser
        }
        var user = await UserAPI.editUser(data).then(result => {
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
    }
    render() {
        if(this.state.redirectHome){
            return <Redirect push to="/" />
        }
        if(this.state.user.length === 0) return <div></div>
        return (
            <div className="info-user-container">
                <div className="title-info-user-con">
                    <h1 className="title-info-user-con">
                        Chỉnh sửa thông tin cá nhân
                    </h1>
                </div>
                <div className="value-info-user-con">
                    <div className="value-info-user-item">
                        <div className="value-info-user-item-left">
                            <div className="value-info-user-item-title">
                                <p className="value-info-user-item-title">Họ tên</p>
                            </div>
                            <div className="value-info-user-item-value">
                                <input className="value-info-user-item-value" type="text" name="userName" onChange={this.handleChangeInput} defaultValue = {this.state.userName}></input>
                            </div>
                        </div>
                        <div className="value-info-user-item-right">
                            <div className="value-info-user-item-title">
                                <p className="value-info-user-item-title">Số điện thoại</p>
                            </div>
                            <div className="value-info-user-item-value">
                                <input className="value-info-user-item-value" type="text" name="telUser" onChange={this.handleChangeInput} defaultValue={this.state.telUser}></input>
                            </div>
                        </div>

                    </div>
                    <div className="value-info-user-item">
                        <div className="value-info-user-item-left">
                            <div className="value-info-user-item-title">
                                <p className="value-info-user-item-title">Email</p>
                            </div>
                            <div className="value-info-user-item-value">
                                <input className="value-info-user-item-value" type="text" name="emailUser" onChange={this.handleChangeInput} defaultValue={this.state.emailUser}></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-submit-info-user">
                    <button className="btn-submit-info-user" onClick={this.submitInfo}>Cập nhật</button>
                </div>
            </div>
        );
    }
}

export default InfoUser;