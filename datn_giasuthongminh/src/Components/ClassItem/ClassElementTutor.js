import React, { Component } from 'react';
import './ClassElement.css';
import MyUtils from '../../utils/MyUtils';
import './ClassElementTutor.css';
class ClassElementTutor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status:"",
            statusClass:""
        }
    }
    componentDidMount(){
        if(this.props.status == "1"){
            this.setState({
                status:"Đã chấp nhận",
                statusClass:"DaChapNhan"
            })
        }else if(this.props.status == "2"){
            this.setState({
                status:"Đang yêu cầu",
                statusClass:"DangYeuCau"
            })
        }
    }
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
                        <div className="info-class2 numberDay">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;{this.props.numberDay} buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee">
                    <div className="value-fee"><b>{MyUtils.currencyFormat(this.props.fee)}</b>đ/1 buổi</div>
                </div>
                <div className="class-offer">
                    <div className={this.state.statusClass}>
                        <p className="text-status">{this.state.status}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassElementTutor;