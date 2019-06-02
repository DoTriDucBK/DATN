import React, { Component } from 'react';
import './ClassItem_Tutor.css';
import MyUtils from '../../utils/MyUtils';
import {Redirect} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ClassUserAPI from '../../API/ClassUserAPI';
import ClassInfoAPI from '../../API/ClassInfoAPI';
class ClassItem_Tutor extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            redirectManageClassOfUser:false
        }
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleYes = () => {
        alert(this.props.idClassUser);
        var data = {
            idClass_User: this.props.idClass_User,
            idClass: 0,
            idTutor:0,
            idUser:0,
            status:0,
            is_seen: 1,
            notification:1
        }
        var classUser = ClassUserAPI.editClassUser(data).then(result => {
            if (result && result.code === "success") {
                classUser = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        }).catch(err => console.log(err));
        var data2 = {
            idClass:this.props.idClass,
            status:"Chưa nhận lớp"
        }
        var classInfo = ClassInfoAPI.editClassInfo(data2).then (result => {
            if(result && result.code ==="success"){
                classInfo = result.data;
            }else if (result.code === "error"){
                alert (result.message)
            }
        }).catch(err => console.log(err));
        this.setState({
            open: false,
            redirectManageClassOfUser:true
        });
    }
    onClickCancelRequest = () => {
        this.setState({
            open: true
        })

    }
    render() {
        if(this.state.redirectManageClassOfUser){
            return <Redirect push to="/manage-class-of-user" />
        }
        return (
            <div className="classItem-tutor-con">
                <div className="image-logoBK">

                </div>
                <div className="Class-tutor-detail">
                    <div className="name-class-tutor">
                        <p className="name-class-tutor"><label className="name-class-tutor"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b>{this.props.description}</b></p>
                    </div>
                    <div className="detail-class-tutor">
                        <p className="detail-class-tutor">{this.props.detailClass}</p>
                    </div>
                    <div className="info-class-tutor">
                        <div className="info-class1-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;{this.props.nameSubject}</p>
                        </div>
                        <div className="info-class1-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;{this.props.typeMethod}</p>
                        </div>
                        <div className="info-class1-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;{this.props.city}</p>
                        </div>
                        <div className="info-class2-tutor numberDay">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;{this.props.numberDay} buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-info-tutor">
                    <div className="class-info-tutor1">
                        <p className="infomation-tutor2"><label className="name-class-tutor"><i className="fas fa-user"></i></label>&nbsp;&nbsp;<b>{this.props.nameTutor}</b></p>
                    </div>
                    <div className="class-info-tutor2">
                        <p className="infomation-tutor1"><label className="name-class-tutor"><i className="fas fa-calendar-day"></i></label>&nbsp;&nbsp;{this.props.birthdayTutor}</p>
                    </div>
                    <div className="class-info-tutor2">
                        <p className="infomation-tutor1"><label className="name-class-tutor"><i className="fas fa-phone-square"></i></label>&nbsp;&nbsp;{this.props.telTutor}</p>
                    </div>
                </div>
                <div className="class-offer-tutor">
                {this.props.status === "Đang yêu cầu"?
                    <div>
                    <div className="button-manage-tutor">
                        {this.props.status}
                    </div>
                    <p className="cancel-request" onClick ={this.onClickCancelRequest}><i>Hủy yêu cầu</i></p>
                    </div>:
                    <div className="button-manage-tutor1">
                        {this.props.status}
                    </div>
                }
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn có muốn hủy yêu cầu mời gia sư dạy lớp này?"}</DialogTitle>
                    <DialogContent id="alert-dialog-description">
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Không
            </Button>
                        <Button onClick={this.handleYes} color="primary" autoFocus>
                            Có
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ClassItem_Tutor;