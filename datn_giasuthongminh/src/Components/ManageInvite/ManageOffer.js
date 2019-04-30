import React, { Component } from 'react';
import './ManageInvite.css';
import TutorApi from '../../API/TutorAPI';
import ClassInfoApi from '../../API/ClassInfoAPI';
import ClassTutorAPI from '../../API/ClassTutorAPI';
import ClassInvite from '../ClassItem/ClassInvite';
import { reactLocalStorage } from "reactjs-localstorage";
import ClassOffer from '../ClassItem/ClassOffer';
import UserShareClassAPI from '../../API/UserShareClassAPI';
import ClassShare from '../ClassItem/ClassShare';
class ManageOffer extends Component {
    constructor(props){
        super(props);
        this.state={
            listShare:[],
            username:reactLocalStorage.getObject("user.info").userName,
            classTutor:[],
        }
    }
    async componentDidMount(){
        var options = {
            idUser: reactLocalStorage.getObject("user.info").idUser,
            is_seen:0
        }
        var listClassTutor = await ClassTutorAPI.getClassAndTutorByIdTutor(options);
        this.setState({
            classTutor:listClassTutor.data
        })
        var option = {
            idUserOfClass:reactLocalStorage.getObject("user.info").idUser,
            is_seen:0
        }
        var listClassShare = await UserShareClassAPI.getClassAndTutorByIdTutor(option);
        this.setState({
            listShare:listClassShare.data
        })
    }
    onClickReply = () => {
        console.log(this.state);
    }
    showClass = () => {
        const classTutor = this.state.classTutor.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassOffer description={item.classInfo[0].description}
                idClassTutor={item.idClass_Tutor}
                idClass = {item.idClass}
                    detailClass={item.classInfo[0].detailClass}
                    nameSubject={item.classInfo[0].nameSubject}
                    city={item.classInfo[0].nameCity}
                    typeMethod={item.classInfo[0].typeMethod}
                    numberDay={item.classInfo[0].numberDay}
                    fee={item.classInfo[0].fee}
                    nameTutor={item.tutor[0].nameTutor}
                    telTutor={item.tutor[0].telTutor}
                    emailTutor={item.tutor[0].emailTutor} />
            </div>
        ); 
        console.log(this.state);
        return classTutor;
    }
    showClassShare = () => {
        const classShare = this.state.listShare.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassShare description={item.classInfo[0].description}
                idUserUser = {item.idUserUser}
                idClass = {item.idClass}
                numberStudent={item.classInfo[0].numberStudent}
                    detailClass={item.classInfo[0].detailClass}
                    nameSubject={item.classInfo[0].nameSubject}
                    city={item.classInfo[0].nameCity}
                    typeMethod={item.classInfo[0].typeMethod}
                    numberDay={item.classInfo[0].numberDay}
                    fee={item.classInfo[0].fee}
                    userName={item.user[0].userName}
                    telUser={item.user[0].telUser}
                    emailUser={item.user[0].emailUser} />
            </div>
        ); 
        console.log(this.state);
        return classShare;
    }
    render() {
        return (
            <div className="manage-invite-container">
                <div className="manage-invite-title">
                    <div className="titleInvite-manage1">
                        <p className="titleInvite-manage">Quản lý lời mời dạy lớp</p>
                    </div>
                    <div className="titleInvite-manage2">

                    </div>
                </div>
                <div className="title-invite-manage">
                    <div className="manage-invite">

                    </div>
                    <div className="manage2-invite">
                        <p className="manage2-invite">Nội dung lớp học</p>
                    </div>
                    <div className="manage3-invite">
                        <p className="manage3-invite">Người gửi</p>
                    </div>
                    <div className="manage4-invite">
                        <p className="manage4-invite">Trạng thái</p>
                    </div>
                </div>
                {this.showClass()}
                <div className="manage-invite-title custom">
                    <div className="titleInvite-manage1">
                        <p className="titleInvite-manage">Quản lý lời mời học ghép</p>
                    </div>
                    <div className="titleInvite-manage2">

                    </div>
                </div>
                <div className="title-invite-manage">
                    <div className="manage-invite">

                    </div>
                    <div className="manage2-invite">
                        <p className="manage2-invite">Nội dung lớp học</p>
                    </div>
                    <div className="manage3-invite">
                        <p className="manage3-invite">Người gửi</p>
                    </div>
                    <div className="manage4-invite">
                        <p className="manage4-invite">Trạng thái</p>
                    </div>
                </div>
                {this.showClassShare()}
            </div>
        );
    }
}

export default ManageOffer;