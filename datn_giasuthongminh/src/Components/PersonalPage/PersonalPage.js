import React, { Component } from 'react';
import './PersonalPage.css';
import MyUtils from '../../utils/MyUtils';
import TutorAPI from '../../API/TutorAPI'
class PersonalPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            idTutor:this.props.location.state.idTutor,
            tutor:[],
            methodTeaching:""
        }
    }
    async componentDidMount(){
        let listTutor = await TutorAPI.getTutorById(parseInt(this.props.location.state.idTutor));
        this.setState({
            tutor: listTutor.data
        })
        if(listTutor.data[0].methodTeaching === "0"){
            this.setState({methodTeaching:"Online"})
        }else if(listTutor.data[0].methodTeaching === "1"){
            this.setState({methodTeaching:"Offline"})
        }else if (listTutor.data[0].methodTeaching === "2"){
            this.setState({methodTeaching:"Cả Online và Offline"})
        }
        console.log(this.state)
    }
    render() {
        var {tutor} = this.state;
        if (tutor.length === 0) {
            return <div></div>
        }
        return (
            <div className="personal-container">
           <div className="main-personal">
                <div className="left-personal">
                    <div className="img-tutor">
                    </div>
                    <div className="infoTutor">
                        <div className="nameTutor">
                            <p><b>{tutor[0].nameTutor}</b></p>
                        </div>
                        <div className="birthdayTutor">
                            <p>Ngày sinh:&nbsp;{tutor[0].birthdayTutor}</p>
                        </div>
                        <div className="addressTutor">
                            <p> <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;{tutor[0].nameCity}</p>
                        </div>
                        <div className="subjectTutor">
                            <p><i className="fas fa-book-reader"></i>&nbsp;&nbsp; {tutor[0].nameSubject}</p>
                        </div>
                        <div className="feeTutor">
                            <p><i className="fas fa-hand-holding-usd"></i>&nbsp;&nbsp;Học phí:&nbsp;{MyUtils.currencyFormat(tutor[0].fee)}</p>
                        </div>
                        <div className="methodTutor">
                            <p><i className="fas fa-address-card"></i>&nbsp;&nbsp;Hình thức dạy: {this.state.methodTeaching}</p>
                        </div>
                    </div>
                </div>
                <div className ="right-personal">
                    <div className="title">
                        <h1>Thông tin cá nhân</h1>
                    </div>
                    <div className="thongtinchung">
                            <div className="title-ttc">
                                <p><b>Thông tin chung</b></p>
                            </div>
                            <div className="line-ttc">

                            </div>
                    </div>
                    <div className="ttc">
                        <div className="ttc1">
                            <p><i className="fas fa-user"></i>&nbsp;Họ và tên:&nbsp;<b> {tutor[0].nameTutor}</b></p>
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-phone-square"></i>&nbsp;Số điện thoại:&nbsp;<b>{tutor[0].telTutor}</b></p>
                        </div>
                        <div className="ttc2">
                            <p><i className="far fa-envelope"></i>&nbsp;Email:&nbsp;<b>{tutor[0].emailTutor}</b></p>
                            
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-map-marker-alt"></i>&nbsp;Địa chỉ hiện nay:&nbsp;<b>{tutor[0].nameAdress}</b></p>
        
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-address-card"></i>&nbsp;Nghề nghiệp hiện tại:&nbsp;<b> {tutor[0].job}</b></p>
                           
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-map-marked-alt"></i>&nbsp;Đơn vị công tác:&nbsp;<b>Trường Đại học Bách Khoa Hà Nội</b></p>
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-globe"></i>&nbsp;Hình thức dạy học:&nbsp;<b>{this.state.methodTeaching}</b></p>
                            
                        </div>
                    </div>
                    <div className="dangkilichday">
                        <div className="phantieude">
                            <div className="title-lichday">
                                <p><b>Đăng ký lịch dạy</b></p>
                            </div>
                            <div className="line-lichday">

                            </div>
                        </div>
                        
                        <div className="form-dklichday">
                            <div className="part-form one">
                                <div className="title-day">
                                    <p><b>Thứ 2</b></p>
                                </div>
                                <div className="check-day">
                                    <label className="containerlabel">Sáng
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="part-form one">
                                <div className="title-day">
                                    <p><b>Thứ 3</b></p>
                                </div>
                                <div className="check-day">
                                    <label className="containerlabel">Sáng
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="part-form one">
                                <div className="title-day">
                                    <p><b>Thứ 4</b></p>
                                </div>
                                <div className="check-day">
                                    <label className="containerlabel">Sáng
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="part-form one">
                                <div className="title-day">
                                    <p><b>Thứ 5</b></p>
                                </div>
                                <div className="check-day">
                                    <label className="containerlabel">Sáng
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="part-form one">
                                <div className="title-day">
                                    <p><b>Thứ 6</b></p>
                                </div>
                                <div className="check-day">
                                    <label className="containerlabel">Sáng
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="part-form one">
                                <div className="title-day">
                                    <p><b>Thứ 7</b></p>
                                </div>
                                <div className="check-day">
                                    <label className="containerlabel">Sáng
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="part-form one">
                                <div className="title-day">
                                    <p><b>Chủ nhật</b></p>
                                </div>
                                <div className="check-day">
                                    <label className="containerlabel">Sáng
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div> 
                        </div>
                        <div className="chuthich">
                            <div className="con-chuthich"><label className="checked"></label>
                            <label className="value-chuthich">Thời gian đăng kí nhận lớp</label>
                            </div> 
                        </div>
                    </div>
                    <div className="lichday">
                            <div className="title-lichday">
                                <p><b>Thông tin lớp đang dạy</b></p>
                            </div>
                            <div className="line-lichday">

                            </div>
                            
                    </div>
                    <div className="ttc">
                        <div className="ttc1">
                            <p><i className="fas fa-chalkboard-teacher"></i>&nbsp;Mã lớp:&nbsp;<b>T104</b></p>
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-book-reader"></i>&nbsp;Môn học:&nbsp;<b>Toán</b></p>
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-map-marker-alt"></i>&nbsp;Địa chỉ:&nbsp;<b>số 7, Tạ Quang Bửu, Hai Bà Trưng, Hà Nội</b></p>
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-calendar-alt"></i>&nbsp;Lịch dạy:&nbsp;<b>Thứ 4, 19h - 21h</b></p>
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-hand-holding-usd"></i>&nbsp;Học phí:&nbsp;<b>200000 vnđ/b</b></p>
                        </div>
                        <div className="ttc2">
                            <p><i className="fas fa-address-card"></i>&nbsp;Hình thức học:&nbsp;<b>Offline</b></p>
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
            
        );
    }
}

export default PersonalPage;