import React, { Component } from 'react';
import './OfferClass.css';
import {Redirect} from 'react-router';
import ClassInfoApi from '../../API/ClassInfoAPI';
class OfferClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sumSubject: "",
            subject: "",
            fee: "",
            address: "",
            phone:"",
            numberStudent:"",
            numberHour:"1",
            methodTeaching: new Set(),
            addressDetail:"",
            sexTutor:"Nam",
            isDoubleClass:"Không",
            redirectListClass:false,
            typeMethod:0 //0-online 1-offline 2-cả hai
        };
    }
    // Lấy dữ liệu thay đổi của text-input
    handleChangeInputTextForm = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    // Tạo mảng chứa phương thức học
    componentWillMount () {
        this.checkedCheckboxMethod = new Set();
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
    componentDidMount(){
        this.setState({
            subject : this.props.location.state.sub,
            address : this.props.location.state.address
        })
        
        
    }
    // Submit form
    onSubmitForm = (event) => {
        if(this.state.subject === "" || this.state.fee === "" ||this.state.address === ""||this.state.addressDetail===""||this.state.methodTeaching === ""||this.state.numberHour===""
            || this.state.sexTutor === "" || this.state.isDoubleClass ===""|| this.state.addressDetail===""||this.state.numberStudent===""){

            }else{
                event.preventDefault();
                var data = {
                    idClass: this.state.fee+"1",
                    fee:this.state.fee,
                    idUser:this.state.fee+"2",
                    status:1,
                    idPartHour:3,
                    nameGrade:"8",
                    address:this.state.address,
                    typeMethod:this.state.typeMethod,
                    numberDay: parseInt("2"),
                    nameSubject:this.state.subject,
                    nameCity:this.state.address
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
                    redirectListClass:true
                });
                //  console.log(this.state);
            }
        
        
    }
   
    render() {
        
        if(this.state.redirectListClass){
            return <Redirect push to="/listclass"/>
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
                            <input name ="sumSubject" type="text" placeholder="Tìm lớp gia sư Toán 10, Hoàn Kiếm Hà Nội" onChange={this.handleChangeInputTextForm}></input>
                        </div>
                    </div>
                    <div className="subjectInfo">
                        <div className="sub1">
                            <p className="title-subject">Môn học <span className="notnull">*</span></p>
                        </div>
                        <div className="sub2">
                            <select  name="subject" required="" className="cruise-line1" onChange={this.handleChangeInputTextForm} value={this.state.subject}>
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
                            <div  className="info1-right-content" >
                                <input type="radio" value="1" name = "numberHour" checked={this.state.numberHour === "1"} onChange={this.handleChangeInputTextForm}/><label>1h</label>
                                <input type="radio" value="1.5" name = "numberHour" checked={this.state.numberHour === "1.5"} onChange={this.handleChangeInputTextForm}/><label>1.5h</label>
                                <input type="radio" value="2" name = "numberHour"checked={this.state.numberHour === "2"} onChange={this.handleChangeInputTextForm}/><label>2h</label>
                                <input type="radio" value="2.5" name = "numberHour"checked={this.state.numberHour === "2.5"} onChange={this.handleChangeInputTextForm}/><label>2.5h</label>
                                <input type="radio" value="3" name = "numberHour"checked={this.state.numberHour === "3"} onChange={this.handleChangeInputTextForm}/><label>3h</label>
                            </div>
                        </div>
                    </div>
                    <div className="info1">
                        <div className="info1-left">
                            <div className="info1-left-title">
                                <label className="info-title" >Số điện thoại liên hệ<span className="notnull">  *</span></label> 
                            </div>
                            <div className="info1-left-content">
                                <input name ="phone" type="text" placeholder="0965143540" className="input-content" onChange={this.handleChangeInputTextForm}></input>
                            </div>
                        </div>
                        <div className="info1-right">
                            <div className="info1-right-title">
                                <label className="info-title">Hình thức học<span className="notnull">  *</span></label>
                            </div>
                            <div className="info1-right-content" onChange={this.handleChangeCheckbox}>
                                <input type="checkbox" name="methodTeaching" value="Online" onChange={()=>this.checkMethodInSet("Online")} checked={this.state.methodTeaching.has("Online")}/><label>Online</label>
                                <input type="checkbox" name="methodTeaching" value = "Offline" onChange={()=>this.checkMethodInSet("Offline")} checked={this.state.methodTeaching.has("Offline")}/><label>Offline(Tại nhà)</label>
                            </div>
                        </div>
                    </div>
                    <div className="info1">
                        <div className="info1-left">
                            <div className="info1-left-title">
                                <label className="info-title"  >Địa chỉ<span className="notnull">  *</span></label> 
                            </div>
                            <div className="info1-left-content">
                                <input type="text" placeholder="Thái Bình" className="input-content" value={this.state.address} name ="address" onChange={this.handleChangeInputTextForm}></input>
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
                                <label className="info-title"  >Số học viên<span className="notnull">  *</span></label> 
                            </div>
                            <div className="info1-left-content">
                                <input type="number" placeholder="1" className="input-content" name ="address" onChange={this.handleChangeForm}></input>
                            </div>
                        </div>
                        <div className="info1-right">
                            <div className="info1-right-title">
                                <label className="info-title">Giới tính gia sư<span className="notnull">  *</span></label>
                            </div>
                            <div className="info1-right-content">
                                <input type="radio" name="sexTutor"  value = "Nam" checked={this.state.sexTutor === "Nam"} onChange={this.handleChangeInputTextForm}/><label>Nam</label>
                                <input type="radio" name="sexTutor" value = "Nữ" checked={this.state.sexTutor === "Nữ"} onChange={this.handleChangeInputTextForm}/><label>Nữ</label>
                            </div>
                        </div>
                    </div>
                    <div className="info1">
                        <div className="info1-left">
                            
                        </div>
                        <div className="info1-right">
                            <div className="info1-right-title">
                                <label className="info-title">Có muốn ghép lớp?<span className="notnull">  *</span></label>
                            </div>
                            <div className="info1-right-content">
                                <input type="radio" name="isDoubleClass" value="Có" checked={this.state.isDoubleClass === "Có"} onChange={this.handleChangeInputTextForm}/><label>Có</label>
                                <input type="radio" name="isDoubleClass" value="Không" checked={this.state.isDoubleClass === "Không"} onChange={this.handleChangeInputTextForm}/><label>Không</label>
                            </div>
                        </div>
                    </div>
                    <div className="offer-rule">
                        <input type="checkbox"/><label>Bạn đã đồng ý với chính sách của <b>Gia sư BK</b></label>
                    </div>
                    <div className="btn-offer">
                        <button type="button" className="btn-offer" onClick={this.onSubmitForm}>Đăng tin </button>
                    </div>
            </div>
            
        );
    }
}

export default OfferClass;