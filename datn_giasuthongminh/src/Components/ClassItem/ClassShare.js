import React, { Component } from 'react';
import './ClassInvite.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import UserShareClassAPI from '../../API/UserShareClassAPI';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import {Redirect} from 'react-router-dom';
import MyUtils from '../../utils/MyUtils';
import Service from '../../utils/Service';
import { reactLocalStorage } from "reactjs-localstorage";
import UserAPI from '../../API/UserAPI';
class ClassShare extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            redirectHome:false,
            userShare:[]
        }
    }
    async componentDidMount(){
        var user = await UserAPI.getUserByName(this.props.userName);
        this.setState({
            userShare:user.data
        })
    }
    handleClose = async () => {
        var data = {
            idUserUser: this.props.idUserUser,
            notification:0,
            is_seen:0,
            idUser:0,
            idUserOfClass:0,
            idClass:0
        }
        // console.log("1111111111  " , data);
        var userShare = await UserShareClassAPI.editClassUser(data).then(result => {
            if (result && result.code === "success") {
                userShare = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
        .catch(err => console.log(err));
        var dataFirebase = {
            title:"Thông báo",
            message:"Học viên "+reactLocalStorage.getObject("user.info").userName +" từ chối yêu cầu đề nghị học ghép lớp có mã "+ this.props.idClass +" của bạn!"
        }
        var notify =  Service.postNotification(dataFirebase,this.state.userShare[0].tokenFirebase);
        this.setState({ open: false,
            redirectHome:true
        });
    };
    handleYes = async () => {
        var data1 = {
            idUserUser: this.props.idUserUser,
            notification:1,
            is_seen:1
        }
        var userShare = await UserShareClassAPI.editClassUser(data1).then(result => {
            if (result && result.code === "success") {
                userShare = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
        .catch(err => console.log(err));
        var data2 = {
            idClass:this.props.idClass,
            numberStudent: parseInt(this.props.numberStudent) + 1,
            fee: MyUtils.calculateFeeShare(this.props.numberStudent, this.props.fee)
        }
        var classInfo = await ClassInfoAPI.editClassInfo(data2).then(result => {
            if(result && result.code === "success"){
                classInfo = result.data
            }else if(result.code === "error"){
                alert(result.message)
            }
        }).catch(err =>console.log(err));
        var dataFirebase = {
            title:"Thông báo",
            message:"Học viên "+reactLocalStorage.getObject("user.info").userName +" đã chấp nhận yêu cầu đề nghị học ghép lớp có mã "+ this.props.idClass +" của bạn!"
        }
        var notify =  Service.postNotification(dataFirebase,this.state.userShare[0].tokenFirebase);
        this.setState({
            open:false,
            redirectHome:true
        })
    }
    onClickReply =() => {
        this.setState({
            open:true
        })
    }
    render() {
        if(this.state.redirectHome){
            return <Redirect push to="/"/>
        }
        return (
            <div className="classInvite-con">
                <div className="img-logoBK-invite">

                </div>
                <div className="Invite-detail">
                    <div className="name-class-invite">
                        <p className="name-class-invite"><label className="name-class-invite"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b>{this.props.description}</b></p>
                    </div>
                    <div className="detail-class-invite">
                        <p className="detail-class-invite">{this.props.detailClass}</p>
                    </div>
                    <div className="info-class-invite">
                        <div className="info-class1-invite">
                            <p className="info-class1-invite"><label className="name-class-invite"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;{this.props.nameSubject}</p>
                        </div>
                        <div className="info-class1-invite">
                            <p className="info-class1-invite"><label className="name-class-invite"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;{this.props.typeMethod}</p>
                        </div>
                        <div className="info-class1-invite">
                            <p className="info-class1-invite"><label className="name-class-invite"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;{this.props.city}</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee-invite">
                    <div className="name-person-of-invite">
                        <p className="name-person-of-invite"><label className="name-person-of-invite"><i className="fas fa-user"></i></label>&nbsp;{this.props.userName}</p>
                    </div>
                    <div className="name-person-of-invite">
                        <p className="name-person-of-invite"><label className="name-person-of-invite"><i className="fas fa-phone-square"></i></label>&nbsp;{this.props.telUser}</p>
                    </div>
                    <div className="name-person-of-invite">
                        <p className="name-person-of-invite"><label className="name-person-of-invite"><i className="fas fa-envelope-square"></i></label>&nbsp;{this.props.emailUser}</p>
                    </div>
                </div>
                <div className="class-offer-invite">
                   <button className="btn-reply"  onClick={this.onClickReply}>Phản hồi</button>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn có đồng ý học ghép cùng?"}</DialogTitle>
                    <DialogContent id="alert-dialog-description">
                        
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Từ chối
            </Button>
                        <Button onClick={this.handleYes} color="primary" autoFocus>
                            Đồng ý
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ClassShare;