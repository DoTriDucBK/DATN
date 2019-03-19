import React, { Component } from 'react';
import './TutorProfile.css';
import TutorApi from '../../API/TutorAPI';
class TutorProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameTutor:"",
            emailTutor:"",
            telTutor:""
        }
    }
    componentDidMount(){
        this.setState({
            nameTutor : this.props.location.state.nameTutor,
            emailTutor : this.props.location.state.emailTutor,
            telTutor: this.props.location.state.telTutor
        }) 
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        let tutor;
        // this.setState({ isSending: 1, redirectComplete:true })
        await TutorApi.createTutor()
            .then(result => {
                if (result && result.code === "success") {
                    tutor = result.data;
                } else if (result.code === "error") {
                    alert(result.message)
                }
            })
            .catch(err => console.log(err));
    };
    render() {
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
                                <input className="value-title2" placeholder="Nhập họ tên" defaultValue={this.state.nameTutor}></input>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Ngày sinh</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" placeholder="Nhập ngày sinh"></input>
                            </div>
                        </div>
                    </div>
                    <div className="value1-tutor">
                        <div className="value1-tutor-left">
                            <div className="value-title1">
                                <p className="value-title1">Số điện thoại</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" placeholder="Nhập số điện thoại" defaultValue={this.state.telTutor}></input>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Email</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" placeholder="Nhập email" defaultValue={this.state.emailTutor}></input>
                            </div>
                        </div>
                    </div>
                    <div className="value1-tutor">
                        <div className="value1-tutor-left">
                            <div className="value-title1">
                                <p className="value-title1">Địa chỉ (tỉnh thành)</p>
                            </div>
                            <div className="value-title2">
                                <select required="" className="value-title2">
                                    <option value hidden className="opt-search">Tỉnh thành</option>
                                    <optgroup label="Địa điểm phổ biến">
                                        <option value="1">Hà Nội</option>
                                        <option value="2">TP. Hồ Chí Minh</option>
                                        <option value="3">Hải Phòng</option>
                                        <option value="4">Đà Nẵng</option>
                                    </optgroup>
                                    <optgroup label="Tỉnh thành khác">
                                        <option value="5">An Giang</option>
                                        <option value="6">Bắc Giang</option>
                                        <option value="7">Bắc Kạn</option>
                                        <option value="8">Bạc Liêu</option>
                                        <option value="9">Bắc Ninh</option>
                                        <option value="10">Bến Tre</option>
                                        <option value="11">Bình Định</option>
                                        <option value="12">Bình Dương</option>
                                        <option value="13">Bình Phước</option>
                                        <option value="14">Bình Thuận</option>
                                        <option value="15">Cà Mau</option>
                                        <option value="16">Cao Bằng</option>
                                        <option value="17">Cần Thơ</option>
                                        <option value="18">Đắk Lắk</option>
                                        <option value="19">Đắc Nông</option>
                                        <option value="20">Điện Biên</option>
                                        <option value="21">Đồng Nai</option>
                                        <option value="22">Đồng Tháp</option>
                                        <option value="23">Gia Lai</option>
                                        <option value="24">Hà Giang</option>
                                        <option value="25">Hà Nam</option>
                                        <option value="26">Hà Tĩnh</option>
                                        <option value="27">Hải Dương</option>
                                        <option value="28">Hậu Giang</option>
                                        <option value="29">Hòa Bình</option>
                                        <option value="30">Hưng Yên</option>
                                        <option value="31">Khánh Hòa</option>
                                        <option value="32">Kiên Giang</option>
                                        <option value="33">Kon Tum</option>
                                        <option value="34">Lai Châu</option>
                                        <option value="35">Lâm Đồng</option>
                                        <option value="36">Lạng Sơn</option>
                                        <option value="37">Lào Cai</option>
                                        <option value="38">Long An</option>
                                        <option value="39">Nam Định</option>
                                        <option value="40">Nghệ An</option>
                                        <option value="41">Ninh Bình</option>
                                        <option value="42">Ninh Thuận</option>
                                        <option value="43">Phú Thọ</option>
                                        <option value="44">Quảng Bình</option>
                                        <option value="45">Quảng Nam</option>
                                        <option value="46">Quảng Ngãi</option>
                                        <option value="47">Quảng Ninh</option>
                                        <option value="48">Quảng Trị</option>
                                        <option value="49">Sóc Trăng</option>
                                        <option value="50">Sơn La</option>
                                        <option value="51">Tây Ninh</option>
                                        <option value="52">Thái Bình</option>
                                        <option value="53">Thái Nguyên</option>
                                        <option value="54">Thanh Hóa</option>
                                        <option value="55">Thừa Thiên Huế</option>
                                        <option value="56">Tiền Giang</option>
                                        <option value="57">Trà Vinh</option>
                                        <option value="58">Tuyên Quang</option>
                                        <option value="59">Vĩnh Long</option>
                                        <option value="60">Vĩnh Phúc</option>
                                        <option value="61">Yên Bái</option>
                                        <option value="62">Phú Yên</option>
                                        <option value="63">Vũng Tàu</option>
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Địa chỉ cụ thể</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" placeholder="Nhập địa chỉ"></input>
                            </div>
                        </div>
                    </div>
                    <div className="profile-detail">
                        <div className="profile-detail-title">
                            <p className="profile-detail-title">Mô tả bản thân, kinh nghiệm </p>
                        </div>
                        <div className="profile-detail-value">
                            <textarea className="profile-detail-value" />
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
                                <select required="" className="value-title2">
                                    <option value hidden className="opt-search">Lựa chọn nghề nghiệp</option>
                                    <option value="1">Sinh viên</option>
                                    <option value="2">Giáo viên cấp 1</option>
                                    <option value="3">Giáo viên cấp 2</option>
                                    <option value="4">Giáo viên cấp 3</option>
                                    <option value="5">Giảng viên</option>
                                    <option value="6">Chuyên viên</option>
                                </select>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Học phí một giờ</p>
                            </div>
                            <div className="value-title2">
                                <input className="value-title2" placeholder="Ví dụ: 200000"></input>
                            </div>
                        </div>
                    </div>
                    <div className="value1-tutor">
                        <div className="value1-tutor-left">
                            <div className="value-title1">
                                <p className="value-title1">Hình thức dạy</p>
                            </div>
                            <div className="value-title2">
                                <input type="checkbox" name="methodTeaching" value="Online" className="valueTitle" /><label className="valueTitle">Online</label>
                                <input type="checkbox" name="methodTeaching" value="Offline" className="valueTitle1" /><label className="valueTitle">Offline(Tại nhà)</label>
                            </div>
                        </div>
                        <div className="value1-tutor-right">
                            <div className="value-title1">
                                <p className="value-title1">Môn học đăng kí dạy</p>
                            </div>
                            <div className="value-title2">
                                <select name="subject" required="" className="value-title2" >
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
                            <img id="show_avatar" alt="ảnh đại diện"className="show_avatar_default" src="https://d1plicc6iqzi9y.cloudfront.net/sites/all/themes/blacasa/images/default/default_user.png" />
                            <div className="submit-image-info">
                                <label className="nameChooseImage"><input type="file" name="file" id="file" className="inputfile" /><i className="fas fa-upload"></i>&nbsp;&nbsp;Chọn ảnh</label>
                            </div>
                        </div>
                        <div className="image-info-tutor1">
                            <div className="title-image-info-tutor">
                                <p className="title-image-info">Thẻ sinh viên hoặc bằng cấp</p>
                            </div>
                            <img id="show-img-cert" alt="Thẻ sinh viên / Bằng cấp" className="show_avatar_default1" src="https://d1plicc6iqzi9y.cloudfront.net/sites/all/themes/blacasa/images/default/cert.png "></img>
                            <div className="submit-image-info">
                                <label className="nameChooseImage"> <input type="file" name="file" id="file" className="inputfile" /><i className="fas fa-upload"></i>&nbsp;&nbsp;Chọn ảnh</label>
                            </div>
                        </div>
                        <div className="image-info-tutor1">
                            <div className="title-image-info-tutor">
                                <p className="title-image-info">Ảnh đại diện (ảnh phải rõ mặt và chụp một mình)</p>
                            </div>
                            <img id="show_avatar" alt="Chứng minh thư" className="show_avatar_default1" src="https://d1plicc6iqzi9y.cloudfront.net/sites/all/themes/blacasa/images/default/passport_default.png" />
                            <div className="submit-image-info">
                                <label className="nameChooseImage"> <input type="file" name="file" id="file" className="inputfile" /><i className="fas fa-upload"></i>&nbsp;&nbsp;Chọn ảnh</label>
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