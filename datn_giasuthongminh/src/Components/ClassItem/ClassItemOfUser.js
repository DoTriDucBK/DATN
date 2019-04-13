import React, { Component } from 'react';
import './ClassItem.css';
import './ClassItemOfUser.css';
import MyUtils from '../../utils/MyUtils';
import {Redirect} from "react-router-dom";
import TutorAPI from '../../API/TutorAPI';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ClassUserAPI from '../../API/ClassUserAPI';
import { Modal, ModalBody } from 'reactstrap';
import '../css/ModalCustome.css';
import DetailClass from '../../Components/DetailClass/DetailClass'
import VoteTutor from '../VoteTutor/VoteTutor';
class ClassItemOfUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectDetailClass:false,
            modal: false,
            idUser:this.props.idUser,
            idClass:this.props.idClass,
            listClassUser:[],
            tutor:[],
            nameTutor:"",
            idTutor:0,
            status:0,
            idClass_User:0,
            oldStar:0,
            timesVote:0
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    async componentDidMount(){
        let valueClassUser = await ClassUserAPI.getClassByIdClass(this.props.idClass);
        this.setState({
            listClassUser:valueClassUser.data,
            // status: valueClassUser.data[0].status
        })
        
    }
    searchTutor = async ()=>{
        let valueTutor = await TutorAPI.getTutorById(this.state.listClassUser[0].idTutor);
        this.setState({
            tutor:valueTutor.data,
            nameTutor:valueTutor.data[0].nameTutor,
            idTutor:valueTutor.data[0].idTutor,
            status: this.state.listClassUser[0].status,
            idClass_User:this.state.listClassUser[0].idClass_User,
            oldStar: valueTutor.data[0].star,
            timesVote:valueTutor.data[0].times_vote
        })
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    render() {
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
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;{this.props.typeMethod}</p>
                        </div> 
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;{this.props.city}</p>
                        </div>
                        <div className="info-class2">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;{this.props.numberDay} buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee">
                    <div className="value-fee"><b className="value-fee">{MyUtils.currencyFormat(this.props.fee)}đ</b></div>
                    <div className="view-detail"><p className="view-detail"  onClick={this.toggle}><u><i>Xem chi tiết lớp</i></u></p></div>
                </div>
                {this.props.status==="Đã nhận lớp" ?
                <div className="class-offer">
                    <div className="button-offer">
                        <button className="button-vote-tutor" onClick={this.searchTutor}>Đánh giá gia sư</button>
                    </div>
                </div>
                :<div className="class-offer">
                </div>}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                    <ModalBody>
                        <VoteTutor idClass_User = {this.state.idClass_User} oldStar={this.state.oldStar} timesVote = {this.state.timesVote} nameTutor={this.state.nameTutor} idTutor={this.state.idTutor} toggle={this.toggle} idClass={this.state.idClass} idUser={this.state.idUser} status={this.state.status}/>
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

export default ClassItemOfUser;