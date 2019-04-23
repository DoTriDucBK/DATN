import React, { Component } from 'react';
import './PersonalPage.css';
import MyUtils from '../../utils/MyUtils';
import TutorAPI from '../../API/TutorAPI';
import StarRatings from 'react-star-ratings';
class PersonalPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            idTutor:this.props.location.state.idTutor,
            tutor:[],
            methodTeaching:"",
            monday: new Set(),
            tuesday: new Set(),
            wednesday:new Set(),
            thursday:new Set(),
            friday:new Set(),
            saturday:new Set(),
            sunday:new Set(),
            calMon:0,
            calTue:0,
            calWed:0,
            calThu:0,
            calFri:0,
            calSat:0,
            calSun:0,
        }
    }
    async componentDidMount(){
        let listTutor = await TutorAPI.getTutorById(parseInt(this.props.location.state.idTutor));
        this.setState({
            tutor: listTutor.data,
            calMon:listTutor.data[0].monday,
            calTue:listTutor.data[0].tuesday,
            calWed:listTutor.data[0].wednesday,
            calThu:listTutor.data[0].thursday,
            calFri:listTutor.data[0].friday,
            calSat:listTutor.data[0].saturday,
            calSun:listTutor.data[0].sunday
        })
        console.log(listTutor.data[0].methodTeaching)
        if(listTutor.data[0].methodTeaching === "0"){
            this.setState({methodTeaching:"Online"})
        }else if(listTutor.data[0].methodTeaching === "1"){
            this.setState({methodTeaching:"Offline"})
        }else if (listTutor.data[0].methodTeaching === "2"){
            this.setState({methodTeaching:"Cả Online và Offline"})
        }
        if(listTutor.data[0].monday === "1"){
            this.setState({
                monday:this.checkedMonday.add("Sáng")
            })
        }else if(listTutor.data[0].monday === "2"){
            this.setState({
                monday:this.checkedMonday.add("Chiều")
            })
        }else if(listTutor.data[0].monday === "3"){
            this.setState({
                monday:this.checkedMonday.add("Tối")
            })
        }else if (listTutor.data[0].monday === "4"){
            this.setState({
                monday:new Set (["Sáng", "Chiều"])
            })
        }else if(listTutor.data[0].monday === "5"){
            this.setState({
                monday:new Set (["Chiều", "Tối"])
            })
        }else if(listTutor.data[0].monday === "6"){
            this.setState({
                monday:new Set (["Sáng", "Tối"])
            })
        }else if(listTutor.data[0].monday === "7"){
            this.setState({
                monday:new Set (["Sáng","Chiều", "Tối"])
            })
        }
        if(listTutor.data[0].tuesday === "1"){
            this.setState({
                tuesday:this.checkedTuesday.add("Sáng")
            })
        }else if(listTutor.data[0].tuesday === "2"){
            this.setState({
                tuesday:this.checkedTuesday.add("Chiều")
            })
        }else if(listTutor.data[0].tuesday === "3"){
            this.setState({
                tuesday:this.checkedTuesday.add("Tối")
            })
        }else if (listTutor.data[0].tuesday === "4"){
            this.setState({
                tuesday:new Set (["Sáng", "Chiều"])
            })
        }else if(listTutor.data[0].tuesday === "5"){
            this.setState({
                tuesday:new Set (["Chiều", "Tối"])
            })
        }else if(listTutor.data[0].tuesday === "6"){
            this.setState({
                tuesday:new Set (["Sáng", "Tối"])
            })
        }else if(listTutor.data[0].tuesday === "7"){
            this.setState({
                tuesday:new Set (["Sáng","Chiều", "Tối"])
            })
        }
        if(listTutor.data[0].wednesday === "1"){
            this.setState({
                wednesday:this.checkedWednesday.add("Sáng")
            })
        }else if(listTutor.data[0].wednesday === "2"){
            this.setState({
                wednesday:this.checkedWednesday.add("Chiều")
            })
        }else if(listTutor.data[0].wednesday === "3"){
            this.setState({
                wednesday:this.checkedWednesday.add("Tối")
            })
        }else if (listTutor.data[0].wednesday === "4"){
            this.setState({
                wednesday:new Set (["Sáng", "Chiều"])
            })
        }else if(listTutor.data[0].wednesday === "5"){
            this.setState({
                wednesday:new Set (["Chiều", "Tối"])
            })
        }else if(listTutor.data[0].wednesday === "6"){
            this.setState({
                wednesday:new Set (["Sáng", "Tối"])
            })
        }else if(listTutor.data[0].wednesday === "7"){
            this.setState({
                wednesday:new Set (["Sáng","Chiều", "Tối"])
            })
        }
        if(listTutor.data[0].thursday === "1"){
            this.setState({
                thursday:this.checkedThursday.add("Sáng")
            })
        }else if(listTutor.data[0].thursday === "2"){
            this.setState({
                thursday:this.checkedThursday.add("Chiều")
            })
        }else if(listTutor.data[0].thursday === "3"){
            this.setState({
                thursday:this.checkedThursday.add("Tối")
            })
        }else if (listTutor.data[0].thursday === "4"){
            this.setState({
                thursday:new Set (["Sáng", "Chiều"])
            })
        }else if(listTutor.data[0].thursday === "5"){
            this.setState({
                thursday:new Set (["Chiều", "Tối"])
            })
        }else if(listTutor.data[0].thursday === "6"){
            this.setState({
                thursday:new Set (["Sáng", "Tối"])
            })
        }else if(listTutor.data[0].thursday === "7"){
            this.setState({
                thursday:new Set (["Sáng","Chiều", "Tối"])
            })
        }
        if(listTutor.data[0].friday === "1"){
            this.setState({
                friday:this.checkedFriday.add("Sáng")
            })
        }else if(listTutor.data[0].friday === "2"){
            this.setState({
                friday:this.checkedFriday.add("Chiều")
            })
        }else if(listTutor.data[0].friday === "3"){
            this.setState({
                friday:this.checkedFriday.add("Tối")
            })
        }else if (listTutor.data[0].friday === "4"){
            this.setState({
                friday:new Set (["Sáng", "Chiều"])
            })
        }else if(listTutor.data[0].friday === "5"){
            this.setState({
                friday:new Set (["Chiều", "Tối"])
            })
        }else if(listTutor.data[0].friday === "6"){
            this.setState({
                friday:new Set (["Sáng", "Tối"])
            })
        }else if(listTutor.data[0].friday === "7"){
            this.setState({
                friday:new Set (["Sáng","Chiều", "Tối"])
            })
        }
        if(listTutor.data[0].saturday === "1"){
            this.setState({
                saturday:this.checkedSaturday.add("Sáng")
            })
        }else if(listTutor.data[0].saturday === "2"){
            this.setState({
                saturday:this.checkedSaturday.add("Chiều")
            })
        }else if(listTutor.data[0].saturday === "3"){
            this.setState({
                saturday:this.checkedSaturday.add("Tối")
            })
        }else if (listTutor.data[0].saturday === "4"){
            this.setState({
                saturday:new Set (["Sáng", "Chiều"])
            })
        }else if(listTutor.data[0].saturday === "5"){
            this.setState({
                saturday:new Set (["Chiều", "Tối"])
            })
        }else if(listTutor.data[0].saturday === "6"){
            this.setState({
                saturday:new Set (["Sáng", "Tối"])
            })
        }else if(listTutor.data[0].saturday === "7"){
            this.setState({
                saturday:new Set (["Sáng","Chiều", "Tối"])
            })
        }
        if(listTutor.data[0].sunday === "1"){
            this.setState({
                sunday:this.checkedSunday.add("Sáng")
            })
        }else if(listTutor.data[0].sunday === "2"){
            this.setState({
                sunday:this.checkedSunday.add("Chiều")
            })
        }else if(listTutor.data[0].sunday === "3"){
            this.setState({
                sunday:this.checkedSunday.add("Tối")
            })
        }else if (listTutor.data[0].sunday === "4"){
            this.setState({
                sunday:new Set (["Sáng", "Chiều"])
            })
        }else if(listTutor.data[0].sunday === "5"){
            this.setState({
                sunday:new Set (["Chiều", "Tối"])
            })
        }else if(listTutor.data[0].sunday === "6"){
            this.setState({
                sunday:new Set (["Sáng", "Tối"])
            })
        }else if(listTutor.data[0].sunday === "7"){
            this.setState({
                sunday:new Set (["Sáng","Chiều", "Tối"])
            })
        }
        console.log(this.state)
    }
    componentWillMount () {
        this.checkedMonday = new Set();
        this.checkedTuesday = new Set();
        this.checkedWednesday = new Set();
        this.checkedThursday = new Set();
        this.checkedFriday = new Set();
        this.checkedSaturday = new Set();
        this.checkedSunday = new Set();
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
                    <img id="show_avatar" alt="ảnh đại diện" className="avatar1" src={tutor[0].link_image}/>
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
                        <div className="star-rating">
                    <StarRatings
        rating={tutor[0].star}
        starDimension="25px"
        starRatedColor="yellow"
        // starSpacing="5px"
      />
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
                            <p><i className="fas fa-address-card"></i>&nbsp;Nghề nghiệp hiện tại:&nbsp;<b> {tutor[0].jobTutor}</b></p>
                           
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
                                        <input type="checkbox" name="monday" value="Sáng" onChange={()=>this.checkMondayInSet("Sáng")} checked={this.state.monday.has("Sáng")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" name="monday" value="Chiều" onChange={()=>this.checkMondayInSet("Chiều")} checked={this.state.monday.has("Chiều")} />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" name="monday" value="Tối" onChange={()=>this.checkMondayInSet("Tối")} checked={this.state.monday.has("Tối")}/>
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
                                        <input type="checkbox" name="tuesday" value="Sáng" onChange={()=>this.checkTuesdayInSet("Sáng")} checked={this.state.tuesday.has("Sáng")} />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" name="tuesday" value="Chiều" onChange={()=>this.checkTuesdayInSet("Chiều")} checked={this.state.tuesday.has("Chiều")}  />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" name="tuesday" value="Tối" onChange={()=>this.checkTuesdayInSet("Tối")} checked={this.state.tuesday.has("Tối")}  />
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
                                        <input type="checkbox" name="wednesday" value="Sáng" onChange={()=>this.checkWednesdayInSet("Sáng")} checked={this.state.wednesday.has("Sáng")}  />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" name="wednesday" value="Chiều" onChange={()=>this.checkWednesdayInSet("Chiều")} checked={this.state.wednesday.has("Chiều")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" name="wednesday" value="Tối" onChange={()=>this.checkWednesdayInSet("Tối")} checked={this.state.wednesday.has("Tối")} />
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
                                        <input type="checkbox" name="thursday" value="Sáng" onChange={()=>this.checkThursdayInSet("Sáng")} checked={this.state.thursday.has("Sáng")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" name="thursday" value="Chiều" onChange={()=>this.checkThursdayInSet("Chiều")} checked={this.state.thursday.has("Chiều")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" name="thursday" value="Tối" onChange={()=>this.checkThursdayInSet("Tối")} checked={this.state.thursday.has("Tối")}/>
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
                                        <input type="checkbox" name="friday" value="Sáng" onChange={()=>this.checkFridayInSet("Sáng")} checked={this.state.friday.has("Sáng")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" name="friday" value="Chiều" onChange={()=>this.checkFridayInSet("Chiều")} checked={this.state.friday.has("Chiều")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" name="friday" value="Tối" onChange={()=>this.checkFridayInSet("Tối")} checked={this.state.friday.has("Tối")}/>
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
                                        <input type="checkbox" name="saturday" value="Sáng" onChange={()=>this.checkSaturdayInSet("Sáng")} checked={this.state.saturday.has("Sáng")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" name="saturday" value="Chiều" onChange={()=>this.checkSaturdayInSet("Chiều")} checked={this.state.saturday.has("Chiều")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" name="saturday" value="Tối" onChange={()=>this.checkSaturdayInSet("Tối")} checked={this.state.saturday.has("Tối")}/>
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
                                        <input type="checkbox" name="sunday" value="Sáng" onChange={()=>this.checkSundayInSet("Sáng")} checked={this.state.sunday.has("Sáng")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" name="sunday" value="Chiều" onChange={()=>this.checkSundayInSet("Chiều")} checked={this.state.sunday.has("Chiều")}/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" name="sunday" value="Tối" onChange={()=>this.checkSundayInSet("Tối")} checked={this.state.sunday.has("Tối")}/>
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