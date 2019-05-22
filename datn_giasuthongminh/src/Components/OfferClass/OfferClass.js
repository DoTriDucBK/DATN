import React, { Component } from 'react';
import './OfferClass.css';
import { Redirect } from 'react-router';
import ClassInfoApi from '../../API/ClassInfoAPI';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Modal, ModalBody } from 'reactstrap';
import '../css/ModalCustome.css';
import InfoMess from '../Nav/InfoMess';
class OfferClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sumSubject: "",
            subject: "",
            fee: "",
            address: "",
            phone: "",
            numberStudent: "",
            limitStudent:"",
            numberHour: "1",
            methodTeaching: new Set(),
            addressDetail: "",
            sexTutor: "Nam",
            isDoubleClass: "Không",
            redirectListClass: false,
            typeMethod: "", //0-online 1-offline 2-cả hai,
            idUser: 0,
            nameGrade: "",
            idPartHour: "",
            detailClass: "",
            modalErr: false,
        };
        this.toggleErr = this.toggleErr.bind(this);
    }
    toggleErr() {
        this.setState(prevState => ({
            modalErr: !prevState.modalErr
        }));
    }
    // Lấy dữ liệu thay đổi của text-input
    handleChangeInputTextForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }
    // Tạo mảng chứa phương thức học
    componentWillMount() {
        this.checkedCheckboxMethod = new Set();
    }
    // Kiểm tra xem phương thức học đã có trong Set chưa?
    checkMethodInSet = (method) => {
        if (this.checkedCheckboxMethod.has(method)) {
            this.checkedCheckboxMethod.delete(method);
        } else {
            this.checkedCheckboxMethod.add(method);
        }
        this.setState({
            methodTeaching: this.checkedCheckboxMethod
        });
        // Lưu hình thức học vào biến typeMethod
        if (this.checkedCheckboxMethod.has("Online") && this.checkedCheckboxMethod.has("Offline")) {
            this.setState({ typeMethod: "Cả Online và Offline" })
        } else if (this.checkedCheckboxMethod.has("Online") && !this.checkedCheckboxMethod.has("Offline")) {
            this.setState({ typeMethod: "Online" })
        } else if (this.checkedCheckboxMethod.has("Offline") && !this.checkedCheckboxMethod.has("Online")) {
            this.setState({ typeMethod: "Offline" })
        }
    }
    componentDidMount() {
        this.setState({
            subject: this.props.location.state.sub,
            address: this.props.location.state.address
        })


    }

    handleCreateClass = (e) => {
        if(this.state.sumSubject === "" || this.state.fee === "" || this.state.phone === "" || this.state.numberStudent === "" || this.state.addressDetail === "" || this.state.detailClass==="" || this.state.idPartHour === "" || this.state.nameGrade ===""){
            this.toggleErr();
        }else{
            e.preventDefault();
            var data = {
                idUser: reactLocalStorage.getObject("user.info").idUser,
                fee: this.state.fee,
                status: "Chưa nhận lớp",
                nameSubject: this.state.subject,
                nameCity: this.state.address,
                address: this.state.addressDetail,
                typeMethod: this.state.typeMethod,
                nameGrade: this.state.nameGrade,
                idPartHour: parseInt(this.state.idPartHour),
                description: this.state.sumSubject,
                detailClass: this.state.detailClass,
                numberStudent: parseInt(this.state.numberStudent),
                limitStudent:parseInt(this.state.limitStudent),
                numberDay: 2,
                shareClass: this.state.isDoubleClass
            }
            // console.log("1111111111  " , data);
            var classInfo = ClassInfoApi.createClassInfo(data).then(result => {
                if (result && result.code === "success") {
                    classInfo = result.data;
                } else if (result.code === "error") {
                    alert(result.message)
                }
            })
                .catch(err => console.log(err));
            this.setState({
                redirectListClass: true
            });
        }
        
    }

    render() {

        if (this.state.redirectListClass) {
            return <Redirect push to="/listclass" />
        }
        return (
            <div className="offerClass">
                <div className="title-offer">
                    <h1>Mô tả yêu cầu lớp học</h1>
                </div>
                <div className="summaryClass">
                    <div className="sum1">
                        <p>Tóm tắt ngắn gọn về lớp học</p>
                    </div>
                    <div className="sum2">
                        <input name="sumSubject" type="text" placeholder="Tìm lớp gia sư Toán 10, Hoàn Kiếm Hà Nội" onChange={this.handleChangeInputTextForm}></input>
                    </div>
                </div>
                <div className="info1">
                    <div className="info1-left">
                        <div className="info1-left-title">
                            <label className="info-title">Môn học <span className="notnull">*</span></label>
                        </div>
                        <div className="info1-left-content">
                            <select name="subject" required="" className="cruise-line1" onChange={this.handleChangeInputTextForm} value={this.state.subject}>
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
                    <div className="info1-right">
                        <div className="info1-right-title">
                            <label className="info-title">Lớp<span className="notnull">  *</span></label>
                        </div>
                        <div className="info3-right-content">
                            <input name="nameGrade" type="text" placeholder="9" className="input-content" onChange={this.handleChangeInputTextForm}></input>
                        </div>
                    </div>
                </div>
                <div className="info1">
                    <div className="info1-left">
                        <div className="info1-left-title">
                            <label className="info-title">Học phí dự kiến (vnđ/buổi)<span className="notnull">  *</span></label>
                        </div>
                        <div className="info1-left-content">
                            <input name="fee" type="text" placeholder="200.000" className="input-content" onChange={this.handleChangeInputTextForm}></input>
                        </div>
                    </div>
                    <div className="info1-right">
                        <div className="info1-right-title">
                            <label className="info-title">Số giờ học 1 buổi<span className="notnull">  *</span></label>
                        </div>
                        <div className="info1-right-content" >
                            <input type="radio" value="1" name="numberHour" checked={this.state.numberHour === "1"} onChange={this.handleChangeInputTextForm} /><label>1h</label>
                            <input type="radio" value="1.5" name="numberHour" checked={this.state.numberHour === "1.5"} onChange={this.handleChangeInputTextForm} /><label>1.5h</label>
                            <input type="radio" value="2" name="numberHour" checked={this.state.numberHour === "2"} onChange={this.handleChangeInputTextForm} /><label>2h</label>
                            <input type="radio" value="2.5" name="numberHour" checked={this.state.numberHour === "2.5"} onChange={this.handleChangeInputTextForm} /><label>2.5h</label>
                            <input type="radio" value="3" name="numberHour" checked={this.state.numberHour === "3"} onChange={this.handleChangeInputTextForm} /><label>3h</label>
                        </div>
                    </div>
                </div>
                <div className="info1">
                    <div className="info1-left">
                        <div className="info1-left-title">
                            <label className="info-title" >Số điện thoại liên hệ<span className="notnull">  *</span></label>
                        </div>
                        <div className="info1-left-content">
                            <input name="phone" type="text" placeholder="0965143540" className="input-content" onChange={this.handleChangeInputTextForm}></input>
                        </div>
                    </div>
                    <div className="info1-right">
                        <div className="info1-right-title">
                            <label className="info-title">Hình thức học<span className="notnull">  *</span></label>
                        </div>
                        <div className="info1-right-content" onChange={this.handleChangeCheckbox}>
                            <input type="checkbox" name="methodTeaching" value="Online" onChange={() => this.checkMethodInSet("Online")} checked={this.state.methodTeaching.has("Online")} /><label>Online</label>
                            <input type="checkbox" name="methodTeaching" value="Offline" onChange={() => this.checkMethodInSet("Offline")} checked={this.state.methodTeaching.has("Offline")} /><label>Offline(Tại nhà)</label>
                        </div>
                    </div>
                </div>
                <div className="info1">
                    <div className="info1-left">
                        <div className="info1-left-title">
                            <label className="info-title"  >Địa chỉ<span className="notnull">  *</span></label>
                        </div>
                        <div className="info1-left-content">
                            <select required="" className="cruise-line1" name="address" onChange={this.handleChangeInputTextForm} value={this.state.address}>
                                <option value="" className="opt-search">Lựa chọn tỉnh thành</option>
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
                    <div className="info1-right">
                        <div className="info1-right-title">
                            <label className="info-title">Địa chỉ chi tiết<span className="notnull">  *</span></label>
                        </div>
                        <div className="info3-right-content">
                            <input name="addressDetail" type="text" placeholder="Hiệp Hòa - Vũ Thư - Thái Bình" className="input-content" onChange={this.handleChangeInputTextForm}></input>
                        </div>
                    </div>
                </div>
                <div className="info1">
                    <div className="info1-left">
                        <div className="info1-left-title">
                            <label className="info-title"  >Số học viên hiện tại<span className="notnull">  *</span></label>
                        </div>
                        <div className="info1-left-content">
                            <input type="number" placeholder="1" className="input-content" name="numberStudent" min="1" onChange={this.handleChangeInputTextForm}></input>
                        </div>
                    </div>
                    <div className="info1-right">
                        <div className="info1-right-title">
                            <label className="info-title"  >Số học viên tối đa<span className="notnull">  *</span></label>
                        </div>
                        <div className="info1-left-content">
                            <input type="number" placeholder="1" className="input-content" name="limitStudent" min="1" max="3" onChange={this.handleChangeInputTextForm}></input>
                        </div>
                    </div>
                </div>
                <div className="info1">
                    <div className="info1-left">
                        <div className="info1-left-title">
                            <label className="info-title">Kíp học <span className="notnull">*</span></label>
                        </div>
                        <div className="info1-left-content">
                            <select name="idPartHour" required="" className="cruise-line1" onChange={this.handleChangeInputTextForm} value={this.state.idPartHour}>
                                <option value hidden className="opt1">Lựa chọn kíp học</option>
                                <option value="1">Kíp 1 (Sáng)</option>
                                <option value="2">Kíp 2 (Chiều)</option>
                                <option value="3">Kíp 3 (Tối)</option>
                            </select>
                        </div>
                    </div>
                    <div className="info1-right1">
                        <div className="info1-right-title">
                            <label className="info-title">Có muốn ghép lớp?<span className="notnull">  *</span></label>
                        </div>
                        <div className="info1-right-content">
                            <input type="radio" name="isDoubleClass" value="Có" checked={this.state.isDoubleClass === "Có"} onChange={this.handleChangeInputTextForm} /><label>Có</label>
                            <input type="radio" name="isDoubleClass" value="Không" checked={this.state.isDoubleClass === "Không"} onChange={this.handleChangeInputTextForm} /><label>Không</label>
                        </div>
                    </div>
                    <div className="info1-right2">
                        <div className="info1-right-title">
                            <label className="info-title">Giới tính gia sư<span className="notnull">  *</span></label>
                        </div>
                        <div className="info1-right-content">
                            <input type="radio" name="sexTutor" value="Nam" checked={this.state.sexTutor === "Nam"} onChange={this.handleChangeInputTextForm} /><label>Nam</label>
                            <input type="radio" name="sexTutor" value="Nữ" checked={this.state.sexTutor === "Nữ"} onChange={this.handleChangeInputTextForm} /><label>Nữ</label>
                        </div>
                    </div>
                </div>
                <div className="info1">
                    <div className="info1-left-title">
                        <label className="info-title">Mô tả chi tiết lớp học <span className="notnull">*</span></label>
                    </div>
                    <input className="input-detail" name="detailClass" placeholder="Mô tả chi tiết lớp học (dưới 500 từ)" onChange={this.handleChangeInputTextForm}></input>
                </div>
                <div className="offer-rule">
                    <input type="checkbox" /><label>Bạn đã đồng ý với chính sách của <b>Gia sư BK</b></label>
                </div>
                <div className="btn-offer">
                    <button type="button" className="btn-offer" onClick={this.handleCreateClass}>Đăng tin </button>
                </div>
                <Modal isOpen={this.state.modalErr} toggle={this.toggleErr} className={this.props.className}>

                    <ModalBody>
                        <InfoMess toggleSearch = {this.toggleErr}/>
                    </ModalBody>

                </Modal>
            </div>

        );
    }
}

export default OfferClass;