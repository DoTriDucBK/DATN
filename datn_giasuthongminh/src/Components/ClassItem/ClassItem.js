import React, { Component } from 'react';
import './ClassItem.css';
import MyUtils from '../../utils/MyUtils';
class ClassItem extends Component {
    render() {
        return (
            <div className="classItem-con">
                <div className="img-logoBK">

                </div>
                <div className="Class-detail">
                    <div className="name-class">
                        <p className="name-class"><label className="name-class"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b>{this.props.description}</b></p>
                    </div>
                    <div className="detail-class">
                        <p className="detail-class">{this.props.detailClass}</p>
                    </div>
                    <div className="info-class">
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;{this.props.nameSubject}</p>
                        </div>
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;{this.props.typeMethod}</p>
                        </div> 
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;{this.props.city}</p>
                        </div>
                        <div className="info-class2">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;{this.props.numberDay} buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee">
                    <div className="value-fee"><b>{MyUtils.currencyFormat(MyUtils.calculateFee(this.props.fee, this.props.numberDay))}</b>đ/1 tháng</div>
                </div>
                <div className="class-offer">
                    <div className="fee-offer">
                        <p className="fee-offer">Phí:<label className="fee-offer">&nbsp;<b>{MyUtils.currencyFormat(400000)} vnđ</b></label></p>
                    </div>
                    <div className="button-offer">
                        <button className="button-offer">Đề nghị dạy</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassItem;