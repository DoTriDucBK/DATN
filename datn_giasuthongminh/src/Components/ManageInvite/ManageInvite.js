import React, { Component } from 'react';
import './ManageInvite.css';
import TutorApi from '../../API/TutorAPI';
import ClassInfoApi from '../../API/ClassInfoAPI';
import ClassUserAPI from '../../API/ClassUserAPI';
import ClassInvite from '../ClassItem/ClassInvite';
import { reactLocalStorage } from "reactjs-localstorage";
class ManageInvite extends Component {
    constructor(props){
        super(props);
        this.state={
            listInvite:[],
            username:reactLocalStorage.getObject("user.info").userName,
            classTutor:[],
            idTutor:0
        }
    }
    async componentDidMount(){
        var tutor = await TutorApi.getTutorByName(reactLocalStorage.getObject("user.info").userName);
        this.setState({
            idTutor:tutor.data[0].idTutor
        });
        var options = {
            idTutor: tutor.data[0].idTutor,
            is_seen:0
        }
        var listClassTutor = await ClassUserAPI.getClassAndUser(options);
        this.setState({
            classTutor:listClassTutor.data
        });
        console.log(listClassTutor)
    }
    onClickReply = () => {
        console.log(this.state);
    }
    showClass = () => {
        const classTutor = this.state.classTutor.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassInvite idClassUser={item.idClass_User}
                idClass = {item.classInfo[0].idClass}
                 description={item.classInfo[0].description}
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
        return classTutor;
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
            </div>
        );
    }
}

export default ManageInvite;