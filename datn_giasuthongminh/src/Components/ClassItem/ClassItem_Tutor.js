import React, { Component } from 'react';
import './ClassItem_Tutor.css';
import MyUtils from '../../utils/MyUtils';
class ClassItem_Tutor extends Component {
    render() {
        return (
            <div className="classItem-tutor-con">
                <div className="image-logoBK">

                </div>
                <div className="Class-tutor-detail">
                    <div className="name-class-tutor">
                        <p className="name-class-tutor"><label className="name-class-tutor"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b>Tìm lớp gia sư Hóa 9</b></p>
                    </div>
                    <div className="detail-class-tutor">
                        <p className="detail-class-tutor">Cần ôn tập lại kiến thức lớp 8 để củng cố kĩ nang môn Hóa. Yêu cầu gia sư nhiệt tình, kinh nghiệm, dạy tốt.</p>
                    </div>
                    <div className="info-class-tutor">
                        <div className="info-class1-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;Hóa học</p>
                        </div>
                        <div className="info-class1-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;Online</p>
                        </div>
                        <div className="info-class1-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;Hà Nội</p>
                        </div>
                        <div className="info-class2-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;2 buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-info-tutor">
                    <div className="class-info-tutor1">
                        <p className="infomation-tutor2"><label className="name-class-tutor"><i className="fas fa-user"></i></label>&nbsp;&nbsp;<b>Đỗ Thị Thúy Hằng</b></p>
                    </div>
                    <div className="class-info-tutor2">
                        <p className="infomation-tutor1"><label className="name-class-tutor"><i class="fas fa-calendar-day"></i></label>&nbsp;&nbsp;22/07/1999</p>
                    </div>
                    <div className="class-info-tutor2">
                        <p className="infomation-tutor1"><label className="name-class-tutor"><i class="fas fa-phone-square"></i></label>&nbsp;&nbsp;0965143540</p>
                    </div>
                    <div className="class-info-tutor2">
                        <p className="infomation-tutor1"><label className="name-class-tutor"><i class="fas fa-envelope"></i></label>&nbsp;&nbsp;moonmilk99@gmail.com</p>
                    </div>
                </div>
                <div className="class-offer-tutor">
                    <div className="button-manage-tutor">
                        Đang yêu cầu
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassItem_Tutor;