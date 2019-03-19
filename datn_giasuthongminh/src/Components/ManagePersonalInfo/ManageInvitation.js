import React, { Component } from 'react';
import './ManageClassOffer.css';
import './ManageInvitation.css';
import ClassItem_Tutor from '../ClassItem/ClassItem_Tutor';
class ManageInvitation extends Component {
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
                        <select required="" className="select-searchClassOffer">
                            <option value hidden className="opt-searchClassOffer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- Trạng thái --</option>
                            <option value="1">Đang tìm gia sư</option>
                            <option value="2">Đã chấp nhận</option>
                        </select>
                        <button className="manage-btnClass"> &nbsp;Áp dụng</button>
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
                <div className="result-element-class">
                    <ClassItem_Tutor/>
                </div>
                <div className="result-element-class">
                    <ClassItem_Tutor />
                </div>
                <div className="result-element-class">
                    <ClassItem_Tutor />
                </div>
            </div>
        );
    }
}

export default ManageInvitation;