import React, { Component } from 'react';
import './ClassItem.css';
import './ClassItemOfUser.css';
import MyUtils from '../../utils/MyUtils';
import TutorAPI from '../../API/TutorAPI';
import ClassUserAPI from '../../API/ClassUserAPI';
import { Modal, ModalBody } from 'reactstrap';
import '../css/ModalCustome.css';
import DetailClassUser from '../../Components/DetailClass/DetailClassUser';
import VoteTutor from '../VoteTutor/VoteTutor';
import ClassInfoApi from '../../API/ClassInfoAPI';
import ClassTutorApi from '../../API/ClassTutorAPI';

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
            timesVote:0,
            comment:"",
            modalDetailClass:false,
            
        }
        this.toggle = this.toggle.bind(this);
        this.toggleDetailClass = this.toggleDetailClass.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggleDetailClass() {
        this.setState(prevState => ({
            modalDetailClass: !prevState.modalDetailClass
        }));
        console.log(this.props.comment)
    }
    
    async componentDidMount(){
        var valueClassUser = await ClassUserAPI.getClassByIdClass(this.state.idClass);
        var valueClassTutor = await ClassTutorApi.getClassByIdClass(this.state.idClass);
        if(valueClassUser.data.length > 0){
            this.setState({
                listClassUser:valueClassUser.data
            })
        }else if (valueClassTutor.data.length > 0){
            this.setState({
                listClassUser:valueClassTutor.data
            })
        }
    }
    searchTutor = async ()=>{
        let valueTutor = await TutorAPI.getTutorById(this.state.listClassUser[0].idTutor);
        this.setState({
            tutor:valueTutor.data,
            nameTutor:valueTutor.data[0].nameTutor,
            idTutor:valueTutor.data[0].idTutor,
            status: this.state.listClassUser[0].status,
            oldStar: valueTutor.data[0].star,
            timesVote:valueTutor.data[0].times_vote,
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
                        <div className="info-class2 numberDay">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;{this.props.numberDay} buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee">
                    <div className="value-fee"><b className="value-fee">{MyUtils.currencyFormat(this.props.fee)}đ</b></div>
                    <div className="view-detail"><p className="view-detail" onClick = {this.toggleDetailClass}><u><i>Xem chi tiết lớp</i></u></p></div>
                </div>
                {this.props.status==="Đã nhận lớp" ?
                <div className="class-offer">
                    <div className="button-offer">
                        {this.props.comment === null?
                        <button className="button-vote-tutor" onClick={this.searchTutor}>Đánh giá gia sư</button>:
                        <div className="status-class-custom"><label className="status-class-custom">{this.props.status}</label></div>}
                    </div>
                </div>
                :<div className="class-offer">
                    {this.props.status === "Đang yêu cầu"?
                    <div className="status-class-custom2">
                        <label className="status-class-custom">{this.props.status}</label>
                    </div>:<div className="status-class-custom3"><label className="status-class-custom">{this.props.status}</label></div>}
                </div>}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                    <ModalBody>
                        <VoteTutor  oldStar={this.state.oldStar} timesVote = {this.state.timesVote} nameTutor={this.state.nameTutor} idTutor={this.state.idTutor} toggle={this.toggle} idClass={this.state.idClass} idUser={this.state.idUser} status={this.state.status}/>
                    </ModalBody>

                </Modal>
                <Modal isOpen={this.state.modalDetailClass} toggle={this.toggleDetailClass} className={this.props.className}>

                    <ModalBody>
                        <DetailClassUser idClass={this.props.idClass} idUserOfClass = {this.props.idUser} toggleDetail = {this.toggleDetailClass}/>
                    </ModalBody>

                </Modal>
               
            </div>
        );
    }
}

export default ClassItemOfUser;