import React, { Component } from 'react';
import './DetailClass.css';
import ClassInfoAPI from '../../API/ClassInfoAPI';
class DetailClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            idClass: this.props.idClass,
            classInfo:[],
            status:"",
            is_button:false
        }
    }
    async componentDidMount(){
        
        let value = await ClassInfoAPI.getClassByIdClass(this.props.idClass);
        this.setState({
            classInfo: value.data
        })
        console.log(value.data[0].shareClass === "Có");
    }
    render() {
        var {classInfo,status} = this.state;
        if(classInfo.length === 0)
        return <div></div>
        return (
            <div className="detailClass-container">
                <h1 className="detailClass-title">Thông tin lớp học</h1>
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
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-hand-holding-usd"></i> &nbsp;Học phí:</label>&nbsp;{classInfo[0].fee}</p>
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
                <div className="info-detail">
                    
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-map-marked-alt"></i> &nbsp;Địa chỉ chi tiết:</label>&nbsp;{classInfo[0].address}</p>
                    
                </div>
                <div className="info-detail">
                    <div className="info-detail-left">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fab fa-accusoft"></i> &nbsp;Trạng thái:</label>&nbsp;{classInfo[0].status === 0?"Còn lớp":classInfo[0].status === 1?"Hết lớp":"Đang yêu cầu"}</p>
                    </div>
                    <div className="info-detail-right">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-toggle-off"></i> &nbsp;Học ghép:</label>&nbsp;{classInfo[0].shareClass}</p>
                    </div>
                
                </div>
                <div className="info-detail">
                    
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-phone-square"></i> &nbsp;Số điện thoại liên hệ:</label>&nbsp;0965143540</p>
                    
                </div>
                {(classInfo[0].shareClass === "Có")?<button className="btn-hocghep">Đề nghị học ghép</button>:<div></div>}
            </div>
        );
    }
}

export default DetailClass;