import React, { Component } from 'react';
import './ManageClass.css';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import ClassItem from '../ClassItem/ClassItem';
import ClassElement from '../ClassItem/ClassElement';
class ManageClass extends Component {
    constructor(props){
        super(props);
        this.state={
            idUser:0,
            idTutor:0,
            listClass:[]
        }
    }
    async componentDidMount(){
            let value = await ClassInfoAPI.getClassByIdUser(this.props.location.state.id_User);
            this.setState({
                listClass: value.data,
                idUser:parseInt(this.props.location.state.id_User),
            idTutor:parseInt(this.props.location.state.idTutor)
            });
    }
    onClick = () => {
        console.log(this.state);
        
    }
    showClassInfo = () => {
        const listClass = this.state.listClass.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassElement description={item.description}
                    detailClass={item.detailClass}
                    nameSubject={item.nameSubject}
                    city={item.nameCity}
                    typeMethod={item.typeMethod}
                    numberDay={item.numberDay}
                    fee={item.fee}
                    status={item.status} 
                    idTutor={this.state.idTutor}/>
            </div>
        );
        return listClass;
    }
    render() {
        return (
            <div className="manage-class-container">
                <div className="manage-class-title">
                    <div className="titleClass-manage1">
                        <p className="titleClass-manage">Các lớp đã đăng</p>
                    </div>
                    <div className="titleClass-manage2">

                    </div>
                </div>
                <div className="select-manage-class">
                    <div className="select-container">
                        <select required="" className="select-searchClassOffer">
                            <option value className="opt-searchClassOffer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- Trạng thái --</option>
                            <option value="2">Đang tìm gia sư</option>
                            <option value="1">Đã chấp nhận</option>
                            <option value="0">Đã gửi yêu cầu</option>
                        </select>
                        <button className="manage-btnClass" onClick={this.onClick}> &nbsp;Áp dụng</button>
                    </div>

                </div>
                <div className="title-class-tutor-manage">
                    <div className="manage-tutor">

                    </div>
                    <div className="manage2-tutor">
                        <p className="manage2-tutor">Nội dung lớp học</p>
                    </div>
                    <div className="manage3-tutor">
                        <p className="manage3-tutor">Học phí</p>
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

export default ManageClass;