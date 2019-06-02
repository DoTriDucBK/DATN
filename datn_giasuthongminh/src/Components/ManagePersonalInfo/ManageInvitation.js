import React, { Component } from 'react';
import './ManageClassOffer.css';
import './ManageInvitation.css';
import ClassItem_Tutor from '../ClassItem/ClassItem_Tutor';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import ClassUserAPI from '../../API/ClassUserAPI';
import { reactLocalStorage } from "reactjs-localstorage";
import ClassUserApi from '../../API/ClassUserAPI';
class ManageInvitation extends Component {
    constructor(props){
        super(props);
        this.state={
            idUser:reactLocalStorage.getObject("user.info").idUser,
            idTutor:0,
            classTutor:[],
            classUser:[],
            status:0
        }
    }
    async componentDidMount(){
            let value = await ClassUserAPI.getClassAndTutor(this.state.idUser);
            this.setState({
                classTutor: value.data,
                // idUser:parseInt(this.props.location.state.id_User),
            // idTutor:parseInt(this.props.location.state.idTutor)
            });
            console.log(this.state)
    }
    onClick = () => {
        console.log(this.state);
        
    }
    searchClass = async () => {
        console.log(this.state);
        var options={
            status:parseInt(this.state.status),
            idUser:reactLocalStorage.getObject("user.info").idUser
        }
        var list = await ClassUserApi.getClassAndTutorByIdAndStatus(options).then(
            classUser => {
                if(classUser && classUser.code === "success"){
                    list = classUser.data
                    this.setState({ classUser:classUser.data})
                }else if(classUser && classUser.code ==="error"){
                    alert(classUser.message)
                }
            }
        ).catch(err => console.log(err)
        )
    }
    showClassInfo = () => {
        if(this.state.classUser.length === 0 && this.state.classTutor.length > 0){
        const classTutor = this.state.classTutor.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassItem_Tutor description={item.classInfo[0].description}
                    detailClass={item.classInfo[0].detailClass}
                    nameSubject={item.classInfo[0].nameSubject}
                    city={item.classInfo[0].nameCity}
                    typeMethod={item.classInfo[0].typeMethod}
                    numberDay={item.classInfo[0].numberDay}
                    fee={item.classInfo[0].fee}
                    nameTutor={item.tutor[0].nameTutor}
                    birthdayTutor={item.tutor[0].birthdayTutor}
                    telTutor={item.tutor[0].telTutor}
                    emailTutor={item.tutor[0].emailTutor} 
                    status = {item.classInfo[0].status}
                    idClassUser = {item.idClass_User}
                    idClass={item.classInfo[0].idClass}/>
            </div>
        ); 
        return classTutor;}
        else {
            const classTutor = this.state.classUser.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassItem_Tutor description={item.classInfo[0].description}
                    detailClass={item.classInfo[0].detailClass}
                    nameSubject={item.classInfo[0].nameSubject}
                    city={item.classInfo[0].nameCity}
                    typeMethod={item.classInfo[0].typeMethod}
                    numberDay={item.classInfo[0].numberDay}
                    fee={item.classInfo[0].fee}
                    nameTutor={item.tutor[0].nameTutor}
                    birthdayTutor={item.tutor[0].birthdayTutor}
                    telTutor={item.tutor[0].telTutor}
                    emailTutor={item.tutor[0].emailTutor} 
                    status = {item.classInfo[0].status}
                    idClassUser = {item.idClass_User}
                    idClass={item.classInfo[0].idClass}/>
            </div>
            );
            return classTutor;
        }

    }
    handleChangeSearch = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    render() {
        return (
            <div className="manage-class-container">
                <div className="manage-class-title">
                    <div className="titleClass-manage1">
                        <p className="titleClass-manage">Các yêu cầu tìm gia sư</p>
                    </div>
                    <div className="titleClass-manage2">

                    </div>
                </div>
                <div className="select-manage-class">
                    <div className="select-container">
                        <select required="" className="select-searchClassOffer" name ="status" onChange={this.handleChangeSearch} >
                            <option value="" className="opt-searchClassOffer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- Trạng thái --</option>
                            <option value="2">Đang tìm gia sư</option>
                            <option value="1">Đã chấp nhận</option>
                        </select>
                        <button className="manage-btnClass" onClick={this.searchClass}> &nbsp;Áp dụng</button>
                    </div>

                </div>
                <div className="title-class-tutor-manage">
                    <div className="manage-tutor">

                    </div>
                    <div className="manage2-tutor">
                        <p className="manage2-tutor">Nội dung lớp học</p>
                    </div>
                    <div className="manage3-tutor">
                        <p className="manage3-tutor">Thông tin gia sư</p>
                    </div>
                    <div className="manage4-tutor">
                        <p className="manage4-tutor">Trạng thái</p>
                    </div>
                </div>
                {this.showClassInfo()}
            </div>
        );
    }
}

export default ManageInvitation;