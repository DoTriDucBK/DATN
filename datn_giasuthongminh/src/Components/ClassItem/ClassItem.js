import React, { Component } from 'react';
import './ClassItem.css';
import MyUtils from '../../utils/MyUtils';
import {Redirect} from "react-router-dom";
class ClassItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectDetailClass:false,
            status: "",
        }
    }
    componentDidMount(){
        var s= parseInt(this.props.status);
        if( s === 0){
            this.setState({status:"Còn lớp"})
        }else if(s === 1){
            this.setState({status:"Hết lớp"})
        }else if (s === 2){
            this.setState({status:"Đang yêu cầu"})
        }
    }
    onClickOffer = () => {
        this.setState({
            redirectDetailClass:true
        })
    }
    render() {
        if(this.state.redirectDetailClass){
            return <Redirect push to="/detail-class"/>
        }
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
                        <div className="status-offer"><label className="status-offer">{this.state.status}</label></div>
                    </div>
                    <div className="button-offer">
                        <button className="button-offer" onClick={this.onClickOffer}>Đề nghị dạy</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassItem;