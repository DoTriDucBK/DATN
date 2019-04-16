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
                        <p className="name-class-tutor"><label className="name-class-tutor"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b>{this.props.description}</b></p>
                    </div>
                    <div className="detail-class-tutor">
                        <p className="detail-class-tutor">{this.props.detailClass}</p>
                    </div>
                    <div className="info-class-tutor">
                        <div className="info-class1-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;{this.props.nameSubject}</p>
                        </div>
                        <div className="info-class1-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;{this.props.typeMethod}</p>
                        </div>
                        <div className="info-class1-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;{this.props.city}</p>
                        </div>
                        <div className="info-class2-tutor">
                            <p className="info-class1-tutor"><label className="name-class-tutor"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;{this.props.numberDay} buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-info-tutor">
                    <div className="class-info-tutor1">
                        <p className="infomation-tutor2"><label className="name-class-tutor"><i className="fas fa-user"></i></label>&nbsp;&nbsp;<b>{this.props.nameTutor}</b></p>
                    </div>
                    <div className="class-info-tutor2">
                        <p className="infomation-tutor1"><label className="name-class-tutor"><i className="fas fa-calendar-day"></i></label>&nbsp;&nbsp;{this.props.birthdayTutor}</p>
                    </div>
                    <div className="class-info-tutor2">
                        <p className="infomation-tutor1"><label className="name-class-tutor"><i className="fas fa-phone-square"></i></label>&nbsp;&nbsp;{this.props.telTutor}</p>
                    </div>
                    {/* <div className="class-info-tutor2">
                        <p className="infomation-tutor1"><label className="name-class-tutor"><i className="fas fa-envelope"></i></label>&nbsp;&nbsp;{this.props.emailTutor}</p>
                    </div> */}
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