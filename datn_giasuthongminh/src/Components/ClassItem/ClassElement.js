import React, { Component } from 'react';
import './ClassElement.css';
import MyUtils from '../../utils/MyUtils';
class ClassElement extends Component {
    render() {
        return (
            <div className="classItem-con">
                <div className="img-logoBK">

                </div>
                <div className="Class-detail">
                    <div className="name-class">
                        <p className="name-class"><label className="name-class"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b>Tìm lớp gia sư Hóa 9</b></p>
                    </div>
                    <div className="detail-class">
                        <p className="detail-class">Cần ôn tập lại kiến thức lớp 8 để củng cố kĩ nang môn Hóa. Yêu cầu gia sư nhiệt tình, kinh nghiệm, dạy tốt.</p>
                    </div>
                    <div className="info-class">
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;Hóa học</p>
                        </div>
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;Online</p>
                        </div>
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;Hà Nội</p>
                        </div>
                        <div className="info-class2">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;2 buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee">
                    <div className="value-fee"><b>{MyUtils.currencyFormat(1600000)}</b>đ/1 tháng</div>
                </div>
                <div className="class-offer">
                    <div className="button-manage">
                        Đang yêu cầu
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassElement;