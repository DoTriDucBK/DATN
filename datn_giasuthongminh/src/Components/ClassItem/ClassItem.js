import React, { Component } from 'react';
import './ClassItem.css';
import MyUtils from '../../utils/MyUtils';
import {Redirect} from "react-router-dom";
import TutorAPI from '../../API/TutorAPI';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import ClassTutorAPI from '../../API/ClassTutorAPI';
import { Modal, ModalBody } from 'reactstrap';
import '../css/ModalCustome.css';
import DetailClass from '../../Components/DetailClass/DetailClass';
import Service from '../../utils/Service';
import UserAPI from '../../API/UserAPI';
import InfoNotLogin from '../Nav/InfoNotLogin';
import { reactLocalStorage } from 'reactjs-localstorage';
class ClassItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectDetailClass:false,
            nameTutor:this.props.nameTutor,
            tutor:[],
            open:false,
            redirectManageOffer:false,
            modal: false,
            userOfClass:[],
            modalNotLogin:false,
        }
        this.toggle = this.toggle.bind(this);
        this.toggleNotLogin = this.toggleNotLogin.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggleNotLogin(){
        this.setState(prevState => ({
            modalNotLogin: !prevState.modalNotLogin
        }))
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleYes = () => {
        var data = {
            idUser: this.props.idUser,
            idTutor: this.state.tutor[0].idTutor,
            idClass:this.props.idClass,
            status:2,
            notification:0,
            is_seen:0
        }
        console.log("1111111111  " , data);
        var classTutor = ClassTutorAPI.createClassTutor(data).then(result => {
            if (result && result.code === "success") {
                classTutor = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
            .catch(err => console.log(err));
            var dataClass = {
                idClass: this.props.idClass,
                status: "Đang yêu cầu" 
            }
            var classInfo = ClassInfoAPI.editClassInfo(dataClass).then(result => {
                if (result && result.code === "success") {
                    classInfo = result.data;
                } else if (result.code === "error") {
                    alert(result.message);
                }
            }).catch(err => console.log(err));
            var dataFirebase = {
                title:"Thông báo",
                message:"Gia sư "+this.state.tutor[0].nameTutor +" gửi yêu cầu đề nghị được dạy lớp có mã "+ this.props.idClass +" của bạn!"
            }
            var notify =  Service.postNotification(dataFirebase,this.state.userOfClass[0].tokenFirebase);
        this.setState({
            open: false,
            redirectManageOffer: true
        });
    }
    onClickOfferTutor = async() => {
        if(!(reactLocalStorage.getObject("home.is_login"))){
            this.toggleNotLogin()
        }else{
            let userOfClassInfo = await UserAPI.getUserByIdUser(this.props.idUser)
        this.setState({

            open: true,
            userOfClass:userOfClassInfo.data
        })
        console.log(userOfClassInfo)
    }
        


    }
    async componentDidMount(){
        console.log(this.props.idUser);
        let tutorInfo = await TutorAPI.getTutorByName(this.props.nameTutor);
        this.setState({
            tutor: tutorInfo.data
        })
    }
    render() {
        if(this.state.redirectManageOffer){
            return <Redirect to={{
                pathname:"/manage-class",
                state:{
                    idTutor:[this.state.tutor[0].idTutor]
                }
            }}>

            </Redirect>
        }
        return (
            <div className="classItem-con">
                <div className="img-logoBK">

                </div>
                <div className="Class-detail">
                    <div className="name-class">
                        <p className="name-class"><label className="name-class"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b>{this.props.description}</b></p>
                    </div>
                    <div className="detail-class">
                        <p className="detail-class">{this.props.detailClass}</p>
                    </div>
                    <div className="info-class">
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;{this.props.nameSubject}</p>
                        </div>
                        <div className="info-class1 method">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;{this.props.typeMethod}</p>
                        </div> 
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;{this.props.city}</p>
                        </div>
                        <div className="info-class2 numberDay">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;{this.props.numberDay} buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee">
                    <div className="value-fee"><b className="value-fee">{MyUtils.currencyFormat(this.props.fee)}đ</b></div>
                    <div className="view-detail"><p className="view-detail"  onClick={this.toggle}><u><i>Xem chi tiết lớp</i></u></p></div>
                </div>
                {this.props.status==="Chưa nhận lớp" ?
                <div className="class-offer">
                    <div className="fee-offer">
                        <div className="status-offer"><label className="status-offer">{this.props.status}</label></div>
                    </div>
                    <div className="button-offer">
                        <button className="button-offer" onClick={this.onClickOfferTutor}>Đề nghị dạy</button>
                    </div>
                </div>
                :(this.props.status === "Đã nhận lớp" ?<div className="class-offer">
                    <div className="status-class-custom">
                        <label className="status-class-custom">{this.props.status}</label>
                    </div>
                </div>:<div className="class-offer">
                    <div className="status-class-custom2">
                        <label className="status-class-custom">{this.props.status}</label>
                    </div>
                </div>)}
            
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn dạy lớp?"}</DialogTitle>
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
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                    <ModalBody>
                        <DetailClass idClass={this.props.idClass} idUserOfClass = {this.props.idUser} toggleDetail = {this.toggle}/>
                    </ModalBody>

                </Modal>
                <Modal isOpen={this.state.modalNotLogin} toggle={this.toggleNotLogin} className={this.props.className}>

                    <ModalBody>
                        <InfoNotLogin toggleNotLogin={this.toggleNotLogin} />
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

export default ClassItem;