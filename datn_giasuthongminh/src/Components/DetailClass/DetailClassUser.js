import React, { Component } from 'react';
import './DetailClass.css';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import { reactLocalStorage } from "reactjs-localstorage";
import UserShareClassAPI from '../../API/UserShareClassAPI';
import UserAPI from '../../API/UserAPI';
import Service from '../../utils/Service';
import Utils from '../../utils/MyUtils';
class DetailClassUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idClass: this.props.idClass,
            classInfo: [],
            status: "",
            is_button: false,
            limitStudent: 0,
            numberStudent: 0,
            open: false,
            userOfClass:[],
            user:[]
        }
    }
    async componentDidMount() {

        let value = await ClassInfoAPI.getClassByIdClass(this.props.idClass);
        this.setState({
            classInfo: value.data,
            status: value.data[0].status,
            numberStudent: value.data[0].numberStudent
        });
        if (value.data[0].limitStudent) {
            this.setState({
                limitStudent: value.data[0].limitStudent
            })
        } else {
            this.setState({
                limitStudent: 3
            })
        }
        let userOfClassInfo = await UserAPI.getUserByIdUser(this.props.idUserOfClass);
        this.setState({
            userOfClass:userOfClassInfo.data
        })
    }
    onClickCancel = ()=> {
        this.props.toggleDetail();
    }
    render() {
        var { classInfo, status } = this.state;
        if (classInfo.length === 0)
            return <div></div>
        return (
            <div className="detailClass-container">
                <div className="detailClass-title">
                    <div className="detailClass-title-left">
                    <h1 className="detailClass-title">Thông tin lớp học</h1>
                    </div>
                    <div className="detailClass-title-cancel">
                        <label className="detailClass-title-cancel" onClick={this.onClickCancel}><i className="far fa-times-circle"></i></label>
                    </div>
                </div>
                
                <div className="info-detail1">
                    <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-info-circle"></i> &nbsp;Thông tin lớp:</label> &nbsp;{classInfo[0].detailClass}</p>
                </div>
                <div className="info-detail">
                    <div className="info-detail-left">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-book-open"></i> &nbsp;Môn học:</label>&nbsp;{classInfo[0].nameSubject}</p>
                    </div>
                    <div className="info-detail-right">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-map-marker-alt"></i> &nbsp;Tỉnh thành:</label>&nbsp;{classInfo[0].nameCity}</p>
                    </div>
                </div>
                <div className="info-detail">
                    <div className="info-detail-left">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-chalkboard-teacher"></i> &nbsp;Hình thức:</label>&nbsp;{classInfo[0].typeMethod}</p>
                    </div>
                    <div className="info-detail-right">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-hand-holding-usd"></i> &nbsp;Học phí:</label>&nbsp;{Utils.currencyFormat(classInfo[0].fee)}</p>
                    </div>

                </div>
                <div className="info-detail">
                    <div className="info-detail-left">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-users"></i> &nbsp;Số lượng HV:</label>&nbsp;{classInfo[0].numberStudent}</p>
                    </div>
                    <div className="info-detail-right">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="far fa-clock"></i> &nbsp;Kíp học:</label>&nbsp;{classInfo[0].idPartHour}</p>
                    </div>
                </div>
                <div className="info-detail detail-city">
                    
                    <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-map-marked-alt"></i> &nbsp;Địa chỉ chi tiết:</label>&nbsp;{classInfo[0].address}</p>

                </div>
                <div className="info-detail">
                    <div className="info-detail-left">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fab fa-accusoft"></i> &nbsp;Trạng thái:</label>&nbsp;{classInfo[0].status}</p>
                    </div>
                    <div className="info-detail-right">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-toggle-off"></i> &nbsp;Học ghép:</label>&nbsp;{classInfo[0].shareClass}</p>
                    </div>

                </div>
                <div className="info-detail">

                    <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-phone-square"></i> &nbsp;Số điện thoại liên hệ:</label>&nbsp;0965143540</p>

                </div>
            </div>
        );
    }
}

export default DetailClassUser;