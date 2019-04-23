import React, { Component } from 'react';
import './ClassInvite.css';
class ClassInvite extends Component {
    render() {
        return (
            <div className="classInvite-con">
                <div className="img-logoBK-invite">

                </div>
                <div className="Invite-detail">
                    <div className="name-class-invite">
                        <p className="name-class-invite"><label className="name-class-invite"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b>{this.props.description}</b></p>
                    </div>
                    <div className="detail-class-invite">
                        <p className="detail-class-invite">{this.props.detailClass}</p>
                    </div>
                    <div className="info-class-invite">
                        <div className="info-class1-invite">
                            <p className="info-class1-invite"><label className="name-class-invite"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;{this.props.nameSubject}</p>
                        </div>
                        <div className="info-class1-invite">
                            <p className="info-class1-invite"><label className="name-class-invite"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;{this.props.typeMethod}</p>
                        </div>
                        <div className="info-class1-invite">
                            <p className="info-class1-invite"><label className="name-class-invite"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;{this.props.city}</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee-invite">
                    <div className="name-person-of-invite">
                        <p className="name-person-of-invite"><label className="name-person-of-invite"><i className="fas fa-user"></i></label>&nbsp;{this.props.userName}</p>
                    </div>
                    <div className="name-person-of-invite">
                        <p className="name-person-of-invite"><label className="name-person-of-invite"><i className="fas fa-phone-square"></i></label>&nbsp;{this.props.telUser}</p>
                    </div>
                    <div className="name-person-of-invite">
                        <p className="name-person-of-invite"><label className="name-person-of-invite"><i className="fas fa-envelope-square"></i></label>&nbsp;{this.props.emailUser}</p>
                    </div>
                </div>
                <div className="class-offer-invite">
                   <button className="btn-reply">Phản hồi</button>
                </div>
            </div>
        );
    }
}

export default ClassInvite;