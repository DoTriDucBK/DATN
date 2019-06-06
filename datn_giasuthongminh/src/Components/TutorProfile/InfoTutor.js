import React, { Component } from 'react';
import './TutorProfile.css';
import TutorApi from '../../API/TutorAPI';
import {reactLocalStorage} from 'reactjs-localstorage';
import ImageApi from '../../API/ImageAPI';
import {Redirect} from 'react-router-dom';
class InfoTutor extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameTutor:this.props.location.state.nameTutor,
            tutor:[],
            birthdayTutor:"",
            telTutor:this.props.location.state.telTutor,
            emailTutor:this.props.location.state.emailTutor,
            nameCity:"",
            nameAdress:"",
            jobTutor:"",
            infoTutor:"",
            fee:"",
            nameSubject:"",
            methodTeaching: new Set(),
            typeMethod:"",
            idTutor:0,
            redirectHome:false,
            image_personal:"",
            img_personal_local:"https://d1plicc6iqzi9y.cloudfront.net/sites/all/themes/blacasa/images/default/default_user.png",
            monday: new Set(),
            tuesday: new Set(),
            wednesday:new Set(),
            thursday:new Set(),
            friday:new Set(),
            saturday:new Set(),
            sunday:new Set(),
            calMon:"",
            calTue:"",
            calWed:"",
            calThu:"",
            calFri:"",
            calSat:"",
            calSun:"",

        }
    }
    onChange1 = async(e) => {
        if(e.target.files && e.target.files[0]){
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    img_personal_local:e.target.result, image_personal:""
                });
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        this.setState({file:e.target.files[0]});
        
    }
    
    handleChangeInputTextForm = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
        console.log(this.state)
    }
    // Tạo mảng chứa phương thức học
    componentWillMount () {
        this.checkedCheckboxMethod = new Set();
        this.checkedMonday = new Set();
        this.checkedTuesday = new Set();
        this.checkedWednesday = new Set();
        this.checkedThursday = new Set();
        this.checkedFriday = new Set();
        this.checkedSaturday = new Set();
        this.checkedSunday = new Set();
    }
    defaultChecked = () => {
        
    }
    // Kiểm tra xem phương thức học đã có trong Set chưa?
    checkMethodInSet = (method) => {
        
        if(this.checkedCheckboxMethod.has(method)){
            this.checkedCheckboxMethod.delete(method);
        }else{
            this.checkedCheckboxMethod.add(method);
        }
        this.setState({
            methodTeaching: this.checkedCheckboxMethod
        });
        // Lưu hình thức học vào biến typeMethod
        if(this.state.methodTeaching.has("Online") && this.state.methodTeaching.has("Offline")){
            this.setState({typeMethod:2})
        }else if(this.state.methodTeaching.has("Online")){
            this.setState({typeMethod:0})
        }else if(this.state.methodTeaching.has("Offline")){
            this.setState({typeMethod:1})
        }
    }
    checkMondayInSet = (method) => {
        
        if(this.checkedMonday.has(method)){
            this.checkedMonday.delete(method);
        }else{
            this.checkedMonday.add(method);
        }
        this.setState({
            monday: this.checkedMonday
        });
        // Lưu hình thức học vào biến typeMethod
        if(this.state.monday.has("Sáng") && this.state.monday.has("Chiều") && this.state.monday.has("Tối")){
            this.setState({calMon:"7"})
        }else if(this.state.monday.has("Sáng") && this.state.monday.has("Chiều")){
            this.setState({calMon:"4"})
        }else if(this.state.monday.has("Sáng") && this.state.monday.has("Tối")){
            this.setState({calMon:"6"})
        }else if (this.state.monday.has("Chiều") && this.state.monday.has("Tối")){
            this.setState({calMon:"5"})
        }else if(this.state.monday.has("Sáng")){
            this.setState({calMon:"1"})
        }else if(this.state.monday.has("Chiều")){
            this.setState({calMon:"2"})
        }else if(this.state.monday.has("Tối")){
            this.setState({calMon:"3"})
        }
    }
    checkTuesdayInSet = (method) => {
        
        if(this.checkedTuesday.has(method)){
            this.checkedTuesday.delete(method);
        }else{
            this.checkedTuesday.add(method);
        }
        this.setState({
            tuesday: this.checkedTuesday
        });
        // Lưu hình thức học vào biến typeMethod
        if(this.state.tuesday.has("Sáng") && this.state.tuesday.has("Chiều") && this.state.tuesday.has("Tối")){
            this.setState({calTue:"7"})
        }else if(this.state.tuesday.has("Sáng") && this.state.tuesday.has("Chiều")){
            this.setState({calTue:"4"})
        }else if(this.state.tuesday.has("Sáng") && this.state.tuesday.has("Tối")){
            this.setState({calTue:"6"})
        }else if (this.state.tuesday.has("Chiều") && this.state.tuesday.has("Tối")){
            this.setState({calTue:"5"})
        }else if(this.state.tuesday.has("Sáng")){
            this.setState({calTue:"1"})
        }else if(this.state.tuesday.has("Chiều")){
            this.setState({calTue:"2"})
        }else if(this.state.tuesday.has("Tối")){
            this.setState({calTue:"3"})
        }
    }
    checkWednesdayInSet = (method) => {
        
        if(this.checkedWednesday.has(method)){
            this.checkedWednesday.delete(method);
        }else{
            this.checkedWednesday.add(method);
        }
        this.setState({
            wednesday: this.checkedWednesday
        });
        // Lưu hình thức học vào biến typeMethod
        if(this.state.wednesday.has("Sáng") && this.state.wednesday.has("Chiều") && this.state.wednesday.has("Tối")){
            this.setState({calWed:"7"})
        }else if(this.state.wednesday.has("Sáng") && this.state.wednesday.has("Chiều")){
            this.setState({calWed:"4"})
        }else if(this.state.wednesday.has("Sáng") && this.state.wednesday.has("Tối")){
            this.setState({calWed:"6"})
        }else if (this.state.wednesday.has("Chiều") && this.state.wednesday.has("Tối")){
            this.setState({calWed:"5"})
        }else if(this.state.wednesday.has("Sáng")){
            this.setState({calWed:"1"})
        }else if(this.state.wednesday.has("Chiều")){
            this.setState({calWed:"2"})
        }else if(this.state.wednesday.has("Tối")){
            this.setState({calWed:"3"})
        }
    }
    checkThursdayInSet = (method) => {
        
        if(this.checkedThursday.has(method)){
            this.checkedThursday.delete(method);
        }else{
            this.checkedThursday.add(method);
        }
        this.setState({
            thursday: this.checkedThursday
        });
        // Lưu hình thức học vào biến typeMethod
        if(this.state.thursday.has("Sáng") && this.state.thursday.has("Chiều") && this.state.thursday.has("Tối")){
            this.setState({calThu:"7"})
        }else if(this.state.thursday.has("Sáng") && this.state.thursday.has("Chiều")){
            this.setState({calThu:"4"})
        }else if(this.state.thursday.has("Sáng") && this.state.thursday.has("Tối")){
            this.setState({calThu:"6"})
        }else if (this.state.thursday.has("Chiều") && this.state.thursday.has("Tối")){
            this.setState({calThu:"5"})
        }else if(this.state.thursday.has("Sáng")){
            this.setState({calThu:"1"})
        }else if(this.state.thursday.has("Chiều")){
            this.setState({calThu:"2"})
        }else if(this.state.thursday.has("Tối")){
            this.setState({calThu:"3"})
        }
    }
    checkFridayInSet = (method) => {
        
        if(this.checkedFriday.has(method)){
            this.checkedFriday.delete(method);
        }else{
            this.checkedFriday.add(method);
        }
        this.setState({
            friday: this.checkedFriday
        });
        // Lưu hình thức học vào biến typeMethod
        if(this.state.friday.has("Sáng") && this.state.friday.has("Chiều") && this.state.friday.has("Tối")){
            this.setState({calFri:"7"})
        }else if(this.state.friday.has("Sáng") && this.state.friday.has("Chiều")){
            this.setState({calFri:"4"})
        }else if(this.state.friday.has("Sáng") && this.state.friday.has("Tối")){
            this.setState({calFri:"6"})
        }else if (this.state.friday.has("Chiều") && this.state.friday.has("Tối")){
            this.setState({calFri:"5"})
        }else if(this.state.friday.has("Sáng")){
            this.setState({calFri:"1"})
        }else if(this.state.friday.has("Chiều")){
            this.setState({calFri:"2"})
        }else if(this.state.friday.has("Tối")){
            this.setState({calFri:"3"})
        }
    }
    checkSaturdayInSet = (method) => {
        
        if(this.checkedSaturday.has(method)){
            this.checkedSaturday.delete(method);
        }else{
            this.checkedSaturday.add(method);
        }
        this.setState({
            saturday: this.checkedSaturday
        });
        // Lưu hình thức học vào biến typeMethod
        if(this.state.saturday.has("Sáng") && this.state.saturday.has("Chiều") && this.state.saturday.has("Tối")){
            this.setState({calSat:"7"})
        }else if(this.state.saturday.has("Sáng") && this.state.saturday.has("Chiều")){
            this.setState({calSat:"4"})
        }else if(this.state.saturday.has("Sáng") && this.state.saturday.has("Tối")){
            this.setState({calSat:"6"})
        }else if (this.state.saturday.has("Chiều") && this.state.saturday.has("Tối")){
            this.setState({calSat:"5"})
        }else if(this.state.saturday.has("Sáng")){
            this.setState({calSat:"1"})
        }else if(this.state.saturday.has("Chiều")){
            this.setState({calSat:"2"})
        }else if(this.state.saturday.has("Tối")){
            this.setState({calSat:"3"})
        }
    }
    checkSundayInSet = (method) => {
        
        if(this.checkedSunday.has(method)){
            this.checkedSunday.delete(method);
        }else{
            this.checkedSunday.add(method);
        }
        this.setState({
            sunday: this.checkedSunday
        });
        // Lưu hình thức học vào biến typeMethod
        if(this.state.sunday.has("Sáng") && this.state.sunday.has("Chiều") && this.state.sunday.has("Tối")){
            this.setState({calSun:"7"})
        }else if(this.state.sunday.has("Sáng") && this.state.sunday.has("Chiều")){
            this.setState({calSun:"4"})
        }else if(this.state.sunday.has("Sáng") && this.state.sunday.has("Tối")){
            this.setState({calSun:"6"})
        }else if (this.state.sunday.has("Chiều") && this.state.sunday.has("Tối")){
            this.setState({calSun:"5"})
        }else if(this.state.sunday.has("Sáng")){
            this.setState({calSun:"1"})
        }else if(this.state.sunday.has("Chiều")){
            this.setState({calSun:"2"})
        }else if(this.state.sunday.has("Tối")){
            this.setState({calSun:"3"})
        }
    }
    checkNullSelect = (method) => {
        if(this.state.methodTeaching.has(method)){
            return true
        } else {
            return false
        }
    }
    checkNullSelectMonday = (method) => {
        if(this.state.monday.has(method)){
            return true
        } else {
            return false
        }
    }
    checkNullSelectTuesday = (method) => {
        if(this.state.tuesday.has(method)){
            return true
        } else {
            return false
        }
    }
    checkNullSelectWednesday = (method) => {
        if(this.state.wednesday.has(method)){
            return true
        } else {
            return false
        }
    }
    checkNullSelectThurdday = (method) => {
        if(this.state.thursday.has(method)){
            return true
        } else {
            return false
        }
    }
    checkNullSelectFriday = (method) => {
        if(this.state.friday.has(method)){
            return true
        } else {
            return false
        }
    }
    checkNullSelectSaturday = (method) => {
        if(this.state.saturday.has(method)){
            return true
        } else {
            return false
        }
    }
    checkNullSelectSunday = (method) => {
        if(this.state.sunday.has(method)){
            return true
        } else {
            return false
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        var data = {
            idTutor:this.state.idTutor,
            nameTutor:this.state.nameTutor,
            telTutor:this.state.telTutor,
            emailTutor:this.state.emailTutor,
            nameCity:this.state.nameCity,
            nameAdress:this.state.nameAdress,
            methodTeaching:this.state.typeMethod,
            monday:this.state.calMon,
            tuesday:this.state.calTue,
            wednesday:this.state.calWed,
            thursday:this.state.calThu,
            friday:this.state.calFri,
            saturday:this.state.calSat,
            sunday:this.state.calSun,
            fee:this.state.fee,
            nameSubject:this.state.nameSubject,
            jobTutor:this.state.jobTutor,
            infoTutor:this.state.infoTutor,
            birthdayTutor:this.state.birthdayTutor,
            addressTutor:this.state.nameCity,
            link_image:"http://localhost:8081/uploads/"+this.state.file.name,
            star:0,
            authentication:0
        }
        // console.log("1111111111  " , data);
        var tutor = await TutorApi.createTutor(data).then(result => {
            if (result && result.code === "success") {
                tutor = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
        .catch(err => console.log(err));
        let image1 = this.state.image_personal;
        if(!image1){
           image1 = await ImageApi.uploadHandler(this.state.file)
        }
        this.setState({image_personal:image1,
        redirectHome:true
        })
    };
    render() {
        
        if (this.state.redirectHome) {
            return <Redirect push to="/" />
        }
        return (
            <div className="tutor-profile-con">
                <div className="tutor-profile-container">
                    <div className="title-tutor-profile">
                        <p className="title-profile">Hồ sơ gia sư</p>
                    </div>
                    <div className="title-tutor-profile1">
                        <div className="title-tutor-profile1-left">
                            <p className="title-tutor-profile1-left">Thông tin chung</p>
                        </div>
                        <div className="title-tutor-profile1-right">

                        </div>
                    </div>
                    <div className="value1-tutor">
                        <div className="value1-tutor-left">
                            <div className="value-title1">
                                <p className="value-title1">Họ tên đầy đủ</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" name="nameTutor" placeholder="Nhập họ tên" 
                                    onChange={this.handleChangeInputTextForm} defaultValue={this.state.nameTutor}></input>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Ngày sinh</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" name="birthdayTutor" placeholder="Nhập ngày sinh"
                                 onChange={this.handleChangeInputTextForm}  ></input>
                            </div>
                        </div>
                    </div>
                    <div className="value1-tutor">
                        <div className="value1-tutor-left">
                            <div className="value-title1">
                                <p className="value-title1">Số điện thoại</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" name="telTutor" placeholder="Nhập số điện thoại"
                                onChange={this.handleChangeInputTextForm} defaultValue={this.state.telTutor} ></input>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Email</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" name="emailTutor" placeholder="Nhập email"
                                onChange={this.handleChangeInputTextForm} defaultValue={this.state.emailTutor} ></input>
                            </div>
                        </div>
                    </div>
                    <div className="value1-tutor">
                        <div className="value1-tutor-left">
                            <div className="value-title1">
                                <p className="value-title1">Địa chỉ (tỉnh thành)</p>
                            </div>
                            <div className="value-title2">
                                <select required="" name="nameCity" className="value-title2"  onChange={this.handleChangeInputTextForm}>
                                    <option value hidden className="opt-search">Tỉnh thành</option>
                                    <optgroup label="Địa điểm phổ biến">
                                        <option value="Hà Nội">Hà Nội</option>
                                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                        <option value="Hải Phòng">Hải Phòng</option>
                                        <option value="Đà Nẵng">Đà Nẵng</option>
                                    </optgroup>
                                    <optgroup label="Tỉnh thành khác">
                                        <option value="An Giang">An Giang</option>
                                        <option value="Bắc Giang">Bắc Giang</option>
                                        <option value="Bắc Kạn">Bắc Kạn</option>
                                        <option value="Bạc Liêu">Bạc Liêu</option>
                                        <option value="Bắc Ninh">Bắc Ninh</option>
                                        <option value="Bến Tre">Bến Tre</option>
                                        <option value="Bình Định">Bình Định</option>
                                        <option value="Bình Dương">Bình Dương</option>
                                        <option value="Bình Phước">Bình Phước</option>
                                        <option value="Bình Thuận">Bình Thuận</option>
                                        <option value="Cà Mau">Cà Mau</option>
                                        <option value="Cao Bằng">Cao Bằng</option>
                                        <option value="Cần Thơ">Cần Thơ</option>
                                        <option value="Đắk Lắk">Đắk Lắk</option>
                                        <option value="Đắc Nông">Đắc Nông</option>
                                        <option value="Điện Biên">Điện Biên</option>
                                        <option value="Đồng Nai">Đồng Nai</option>
                                        <option value="Đồng Tháp">Đồng Tháp</option>
                                        <option value="Gia Lai">Gia Lai</option>
                                        <option value="Hà Giang">Hà Giang</option>
                                        <option value="Hà Nam">Hà Nam</option>
                                        <option value="Hà Tĩnh">Hà Tĩnh</option>
                                        <option value="Hải Dương">Hải Dương</option>
                                        <option value="Hậu Giang">Hậu Giang</option>
                                        <option value="Hòa Bình">Hòa Bình</option>
                                        <option value="Hưng Yên">Hưng Yên</option>
                                        <option value="Khánh Hòa">Khánh Hòa</option>
                                        <option value="Kiên Giang">Kiên Giang</option>
                                        <option value="Kon Tum">Kon Tum</option>
                                        <option value="Lai Châu">Lai Châu</option>
                                        <option value="Lâm Đồng">Lâm Đồng</option>
                                        <option value="Lạng Sơn">Lạng Sơn</option>
                                        <option value="Lào Cai">Lào Cai</option>
                                        <option value="Long An">Long An</option>
                                        <option value="Nam Định">Nam Định</option>
                                        <option value="Nghệ An">Nghệ An</option>
                                        <option value="Ninh Bình">Ninh Bình</option>
                                        <option value="Ninh Thuận">Ninh Thuận</option>
                                        <option value="Phú Thọ">Phú Thọ</option>
                                        <option value="Quảng Bình">Quảng Bình</option>
                                        <option value="Quảng Nam">Quảng Nam</option>
                                        <option value="Quảng Ngãi">Quảng Ngãi</option>
                                        <option value="Quảng Ninh">Quảng Ninh</option>
                                        <option value="Quảng Trị">Quảng Trị</option>
                                        <option value="Sóc Trăng">Sóc Trăng</option>
                                        <option value="Sơn La">Sơn La</option>
                                        <option value="Tây Ninh">Tây Ninh</option>
                                        <option value="Thái Bình">Thái Bình</option>
                                        <option value="Thái Nguyên">Thái Nguyên</option>
                                        <option value="Thanh Hóa">Thanh Hóa</option>
                                        <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                        <option value="Tiền Giang">Tiền Giang</option>
                                        <option value="Trà Vinh">Trà Vinh</option>
                                        <option value="Tuyên Quang">Tuyên Quang</option>
                                        <option value="Vĩnh Long">Vĩnh Long</option>
                                        <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                        <option value="Yên Bái">Yên Bái</option>
                                        <option value="Phú Yên">Phú Yên</option>
                                        <option value="Vũng Tàu">Vũng Tàu</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Địa chỉ cụ thể</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" name="nameAdress" placeholder="Nhập địa chỉ" 
                                onChange={this.handleChangeInputTextForm} ></input>
                            </div>
                        </div>
                    </div>
                    <div className="profile-detail">
                        <div className="profile-detail-title">
                            <p className="profile-detail-title">Mô tả bản thân, kinh nghiệm </p>
                        </div>
                        <div className="profile-detail-value">
                            <textarea className="profile-detail-value" name="infoTutor"
                            onChange={this.handleChangeInputTextForm} />
                        </div>
                    </div>
                    <div className="title-tutor-profile2">
                        <div className="title-tutor-profile1-left">
                            <p className="title-tutor-profile1-left">Thông tin chi tiết</p>
                        </div>
                        <div className="title-tutor-profile1-right">

                        </div>
                    </div>
                    <div className="value1-tutor">
                        <div className="value1-tutor-left">
                            <div className="value-title1">
                                <p className="value-title1">Bạn đang là?</p>
                            </div>
                            <div className="value-title2">
                                <select required="" name="jobTutor"className="value-title2"  onChange={this.handleChangeInputTextForm}>
                                    <option value hidden className="opt-search">Lựa chọn nghề nghiệp</option>
                                    <option value="Sinh viên">Sinh viên</option>
                                    <option value="Giáo viên">Giáo viên</option>
                                    <option value="Giảng viên">Giảng viên</option>
                                    <option value="Chuyên viên">Chuyên viên</option>
                                </select>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Học phí một giờ</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" name="fee" placeholder="Ví dụ: 200000"
                                onChange={this.handleChangeInputTextForm} ></input>
                            </div>
                        </div>
                    </div>
                    <div className="value1-tutor">
                        <div className="value1-tutor-left">
                            <div className="value-title1">
                                <p className="value-title1">Hình thức dạy</p>
                            </div>
                            {/* checked={() => this.checkNullSelect("Online")} */}
                            <div className="value-title2" >
                                <input type="checkbox" name="methodTeaching" value="Online" className="valueTitle"  onChange={()=>this.checkMethodInSet("Online")} checked={this.state.methodTeaching.has("Online")} /><label className="valueTitle">Online</label>
                                <input type="checkbox" name="methodTeaching" value="Offline" className="valueTitle1"  onChange={()=>this.checkMethodInSet("Offline")} checked={this.state.methodTeaching.has("Offline")} /><label className="valueTitle">Offline(Tại nhà)</label>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Môn học đăng kí dạy</p>
                            </div>
                            <div className="value-title2">
                                <select name="nameSubject" required="" className="value-title2" onChange={this.handleChangeInputTextForm} >
                                    <option value hidden className="opt1">Lựa chọn môn học</option>
                                    <optgroup label="Môn học phổ thông">
                                        <option value="Toán">Toán</option>
                                        <option value="Vật lí">Vật lí</option>
                                        <option value="Hóa học">Hóa học</option>
                                        <option value="Sinh học">Sinh học</option>
                                        <option value="Ngữ văn">Ngữ văn</option>
                                        <option value="Lịch sử">Lịch sử</option>
                                        <option value="Địa lí">Địa lí</option>
                                        <option value="Môn học phổ thông khác">Môn học phổ thông khác</option>
                                    </optgroup>
                                    <optgroup label="Ngoại ngữ">
                                        <option value="Tiếng Anh">Tiếng Anh</option>
                                        <option value="Tiếng Nhật">Tiếng Nhật</option>
                                        <option value="Tiếng Trung">Tiếng Trung</option>
                                        <option value="Tiếng Pháp">Tiếng Pháp</option>
                                        <option value="Tiếng Hàn">Tiếng Hàn</option>
                                        <option value="Ngoại ngữ khác">Ngoại ngữ khác</option>
                                    </optgroup>
                                    <optgroup label="Ngành nghề">
                                        <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                                        <option value="Âm nhạc">Âm nhạc</option>
                                        <option value="Mỹ thuật">Mỹ thuật</option>
                                        <option value="Kỹ năng mềm">Kỹ năng mềm</option>
                                        <option value="Ngành nghề khác">Ngành nghề khác</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="profile-detail">
                        <div className="profile-detail-title">
                            <p className="profile-detail-title">Lịch có thể dạy </p>
                        </div>
                        <div className="profile-detail-value">
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
                    </div>
                    <div className="chuthich">
                        <div className="con-chuthich"><label className="checked"></label>
                            <label className="value-chuthich">Thời gian đăng kí nhận lớp</label>
                        </div>
                    </div>
                    <div className="title-tutor-profile1">
                        <div className="title-tutor-profile1-left1">
                            <p className="title-tutor-profile1-left">Ảnh xác nhận thông tin</p>
                        </div>
                        <div className="title-tutor-profile1-right1">
                        </div>
                    </div>
                    <div className="image-info-tutor">
                        <div className="image-info-tutor1">
                            <div className="title-image-info-tutor">
                                <p className="title-image-info">Ảnh đại diện (ảnh phải rõ mặt và chụp một mình)</p>
                            </div>
                            <img id="show_avatar" alt="ảnh đại diện"className="show_avatar_default" src={this.state.image_personal ? this.state.image_personal:this.state.img_personal_local1?this.state.img_personal_local1:this.state.img_personal_local} />
                            <div className="submit-image-info">
                                <label className="nameChooseImage"><input type="file" name="file" id="file" className="inputfile" onChange={(e) => this.onChange1(e)} /><i className="fas fa-upload"></i>&nbsp;&nbsp;Chọn ảnh</label>
                            </div>
                        </div>
                    </div>
                    <div className="btn-submit-info">
                        <button className="btn-submit-info" onClick={this.handleSubmit}>Cập nhật hồ sơ</button>
                    </div>
                </div>
            </div>
        );
    } 
}

export default InfoTutor;