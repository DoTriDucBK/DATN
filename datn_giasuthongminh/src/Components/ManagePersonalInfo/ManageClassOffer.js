import React, { Component } from 'react';
import './ManageClassOffer.css';
import ClassElement from '../ClassItem/ClassElement';
import ClassElementTutor from '../ClassItem/ClassElementTutor';
class ManageClassOffer extends Component {
    constructor(props){
        super(props);
        this.state= {
            idTutor: this.props.location.state.idTutor
        }
    }
    async componentDidMount(){
        
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
                <div className="result-element-class">
                    <ClassElementTutor />
                </div>
                <div className="result-element-class">
                    <ClassElementTutor />
                </div>
                <div className="result-element-class">
                    <ClassElementTutor />
                </div>
            </div>

        );
    }
}

export default ManageClassOffer;