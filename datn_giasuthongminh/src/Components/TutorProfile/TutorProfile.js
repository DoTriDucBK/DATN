import React, { Component } from 'react';
import './TutorProfile.css';
import TutorApi from '../../API/TutorAPI';
import {reactLocalStorage} from 'reactjs-localstorage';
import ImageApi from '../../API/ImageAPI';
import {Redirect} from 'react-router-dom';
class TutorProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameTutor: reactLocalStorage.getObject("user.info").userName,
            tutor:[],
            birthdayTutor:"",
            telTutor:"",
            emailTutor:"",
            nameCity:"",
            nameAdress:"",
            jobTutor:"",
            infoTutor:"",
            fee:"",
            nameSubject:"",
            methodTeaching: new Set(),
            typeMethod:"",
            idTutor:0,
            redirectPersonalPage:false,
            image_personal:"",
            img_personal_local:"https://d1plicc6iqzi9y.cloudfront.net/sites/all/themes/blacasa/images/default/default_user.png"
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
    async componentDidMount(){
        let value = await TutorApi.getTutorByName(reactLocalStorage.getObject("user.info").userName);
        this.setState({
            tutor: value.data,
            nameSubject:value.data[0].nameSubject,
            nameTutor:value.data[0].nameTutor,
            birthdayTutor:value.data[0].birthdayTutor,
            telTutor:value.data[0].telTutor,
            emailTutor:value.data[0].emailTutor,
            infoTutor:value.data[0].infoTutor,
            typeMethod:value.data[0].methodTeaching,
            nameCity:value.data[0].nameCity,
            nameAdress:value.data[0].nameAdress,
            fee:value.data[0].fee,
            jobTutor:value.data[0].jobTutor,
            idTutor:value.data[0].idTutor,
            img_personal_local1:value.data[0].link_image,
        }) 
        if(value.data[0].methodTeaching === "0"){
            this.setState({
                methodTeaching: this.checkedCheckboxMethod.add("Offline")
            })
        }else if(value.data[0].methodTeaching === "1"){
            this.setState({
                methodTeaching: this.checkedCheckboxMethod.add("Online")
            })
        }else if(value.data[0].methodTeaching === "2"){
            this.setState({
                methodTeaching: new Set (["Online", "Offline"])
            })
        }
        console.log(this.state.methodTeaching)
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
    checkNullSelect = (method) => {
        if(this.state.methodTeaching.has(method)){
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
            fee:this.state.fee,
            nameSubject:this.state.nameSubject,
            jobTutor:this.state.jobTutor,
            infoTutor:this.state.infoTutor,
            birthdayTutor:this.state.birthdayTutor,
            addressTutor:this.state.nameCity,
            link_image:"http://localhost:8081/uploads/"+this.state.file.name
        }
        // console.log("1111111111  " , data);
        var tutor = await TutorApi.editTutor(data).then(result => {
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
        redirectPersonalPage:true
        })
    };
    render() {
        
        if (this.state.redirectPersonalPage) {
            return <Redirect to={{
                pathname: '/personal-page',
                state: {
                    idTutor: [this.state.idTutor]
                }
            }}>
            </Redirect>
        }
        var {tutor} = this.state;
        if(tutor.length === 0){
            return <div></div>
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
                                <input className="value-title2" name="nameTutor" placeholder="Nhập họ tên" defaultValue={this.state.nameTutor}
                                    onChange={this.handleChangeInputTextForm}></input>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Ngày sinh</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" name="birthdayTutor" placeholder="Nhập ngày sinh"
                                 onChange={this.handleChangeInputTextForm} defaultValue={this.state.birthdayTutor} ></input>
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
                                onChange={this.handleChangeInputTextForm} defaultValue={this.state.emailTutor}></input>
                            </div>
                        </div>
                    </div>
                    <div className="value1-tutor">
                        <div className="value1-tutor-left">
                            <div className="value-title1">
                                <p className="value-title1">Địa chỉ (tỉnh thành)</p>
                            </div>
                            <div className="value-title2">
                                <select required="" name="nameCity" className="value-title2" value={this.state.nameCity} onChange={this.handleChangeInputTextForm}>
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
                                onChange={this.handleChangeInputTextForm} defaultValue={this.state.nameAdress}></input>
                            </div>
                        </div>
                    </div>
                    <div className="profile-detail">
                        <div className="profile-detail-title">
                            <p className="profile-detail-title">Mô tả bản thân, kinh nghiệm </p>
                        </div>
                        <div className="profile-detail-value">
                            <textarea className="profile-detail-value" name="infoTutor"
                            onChange={this.handleChangeInputTextForm} defaultValue={this.state.infoTutor} />
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
                                <select required="" name="jobTutor"className="value-title2" value={this.state.jobTutor} onChange={this.handleChangeInputTextForm}>
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
                                onChange={this.handleChangeInputTextForm} defaultValue={this.state.fee}></input>
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
                                <select name="nameSubject" required="" className="value-title2" onChange={this.handleChangeInputTextForm} value={this.state.nameSubject}>
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
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" />
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
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" />
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
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" />
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
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" />
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
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" />
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
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" />
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
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Chiều
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                    <label className="containerlabel">Tối
                                        <input type="checkbox" />
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

export default TutorProfile;