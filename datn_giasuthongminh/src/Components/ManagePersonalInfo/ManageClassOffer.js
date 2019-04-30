import React, { Component } from 'react';
import './ManageClassOffer.css';
import ClassElement from '../ClassItem/ClassElement';
import ClassElementTutor from '../ClassItem/ClassElementTutor';
import { reactLocalStorage } from 'reactjs-localstorage';
import ClassTutorAPI from '../../API/ClassTutorAPI';
class ManageClassOffer extends Component {
    constructor(props){
        super(props);
        this.state= {
            idTutor: reactLocalStorage.getObject("user.info").idTutor,
            listClassTutor:[]
        }
    }
    async componentDidMount(){
        var options = {
            idTutor: this.state.idTutor
        }
        var listClassTutor = await ClassTutorAPI.getClassAndTutorByIdTutor(options);
        this.setState({
            listClassTutor:listClassTutor.data
        })
    }
    show_listClassTutor = () => {
        const listClass = this.state.listClassTutor.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassElementTutor description={item.classInfo[0].description}
                idClassTutor={item.idClass_Tutor}
                idClass = {item.idClass}
                status = {item.status}
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
        return listClass;
    }
    render() {
        return (
            <div className="manage-class-container">
                <div className="manage-class-title">
                    <div className="titleClass-manage1">
                        <p className="titleClass-manage">Các đề nghị dạy đã gửi</p>
                    </div>
                    <div className="titleClass-manage2">

                    </div>
                </div>
                <div className="select-manage-class">
                    <div className="select-container">
                        <select required="" className="select-searchClassOffer">
                            <option value hidden className="opt-searchClassOffer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Trạng thái--</option>
                            <option value="1">Đang yêu cầu</option>
                            <option value="2">Đã chấp nhận</option>
                        </select>
                        <button className="manage-btnClass"> &nbsp;Áp dụng</button>
                    </div>

                </div>
                <div className="title-class-manage">
                    <div className="manage">

                    </div>
                    <div className="manage2">
                        <p className="manage2">Nội dung lớp học</p>
                    </div>
                    <div className="manage3">
                        <p className="manage3">Học phí đề nghị</p>
                    </div>
                    <div className="manage4">
                        <p className="manage4">Trạng thái</p>
                    </div>
                </div>
                {this.show_listClassTutor()}
            </div>

        );
    }
}

export default ManageClassOffer;