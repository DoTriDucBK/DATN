import React, { Component } from 'react';
import './ClassInvite.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ClassUserAPI from '../../API/ClassUserAPI';
import ClassTutorAPI from '../../API/ClassTutorAPI';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import {Redirect} from 'react-router-dom';
import Service from '../../utils/Service';
import { reactLocalStorage } from 'reactjs-localstorage';
import UserAPI from '../../API/UserAPI';
class ClassOffer extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            redirectHome:false,
            user:[],
            userOfClass:[]
        }
    }
    async componentDidMount(){
        let user = await UserAPI.getUserByName(this.props.nameTutor);
        let userInfo = await UserAPI.getUserByIdUser(reactLocalStorage.getObject("user.info").idUser);
        this.setState({
            user:user.data,
            userOfClass:userInfo.data
        })
    }
    handleClose = async () => {
        var data2 = {
            idClass:this.props.idClass,
            status:"Chưa nhận lớp"
        }
        var classInfo = await ClassInfoAPI.editClassInfo(data2).then(result => {
            if(result && result.code === "success"){
                classInfo = result.data
            }else if(result.code === "error"){
                alert(result.message)
            }
        }).catch(err =>console.log(err));
        var data = {
            idClass_Tutor: this.props.idClassTutor,
            notification:0,
            is_seen:1,
            idUser:0,
            idTutor:0,
            idClass:0
        }
        // console.log("1111111111  " , data);
        var classTutor = await ClassTutorAPI.editClassTutor(data).then(result => {
            if (result && result.code === "success") {
                classTutor = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
        .catch(err => console.log(err));
        var dataFirebase = {
            title:"Thông báo",
            message:"Học viên "+this.state.userOfClass[0].userName +" từ chối đề nghị được dạy lớp có mã "+ this.props.idClass +" của bạn!"
        }
        var notify =  Service.postNotification(dataFirebase,this.state.user[0].tokenFirebase);
        this.setState({ open: false,
            redirectHome:true
        });
    };
    handleYes = async () => {
        var data1 = {
            idClass_Tutor: this.props.idClassTutor,
            notification:1,
            is_seen:1,
            status:1
        }
        var classTutor = await ClassTutorAPI.editClassTutor(data1).then(result => {
            if (result && result.code === "success") {
                classTutor = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
        .catch(err => console.log(err));
        var data2 = {
            idClass:this.props.idClass,
            status:"Đã nhận lớp"
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
            message:"Học viên "+this.state.userOfClass[0].userName +" đã chấp nhận đề nghị được dạy lớp có mã "+ this.props.idClass +" của bạn!"
        }
        var notify =  Service.postNotification(dataFirebase,this.state.user[0].tokenFirebase);
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
                        <p className="name-person-of-invite"><label className="name-person-of-invite"><i className="fas fa-user"></i></label>&nbsp;{this.props.nameTutor}</p>
                    </div>
                    <div className="name-person-of-invite">
                        <p className="name-person-of-invite"><label className="name-person-of-invite"><i className="fas fa-phone-square"></i></label>&nbsp;{this.props.telTutor}</p>
                    </div>
                    <div className="name-person-of-invite emailTutor">
                        <p className="name-person-of-invite"><label className="name-person-of-invite"><i className="fas fa-envelope-square"></i></label>&nbsp;{this.props.emailTutor}</p>
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
                    <DialogTitle id="alert-dialog-title">{"Bạn có đồng ý để gia sư dạy lớp này?"}</DialogTitle>
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

export default ClassOffer;