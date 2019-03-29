import React, { Component } from 'react';
import './PostNews.css';
import {Redirect} from 'react-router';

class PostNews extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectOfferClass: false,
            subject:"",
            address:"",
        }
    }
    // Thay đổi môn học
    handleSubjectChange = (event) => {
        this.setState({
            subject: event.target.value
        });
    }
    // Thay đổi input address
    handleAddressChange = (e) => {
        this.setState({
            address: e.target.value
        });
    }
    // submit
    handleSubmit = (e) => {
        if(this.state.subject === "" || this.state.address === ""){

        }else{
            e.preventDefault();
            this.setState({redirectOfferClass:true});
        }
       
    }

    render() {
        if(this.state.redirectOfferClass){
            return <Redirect to={{
                pathname: '/offer-class',
                state: { sub: [this.state.subject],
                         address: [this.state.address] }
            }}
            />
        }
        return (
            <div className="post-container">
                <div className="left">

                </div>
                <div className="right">
                    <p className="text-post"><b>Bạn muốn tìm gia sư?</b></p>
                    <div className="title">
                        <p>Môn học</p>
                    </div>
                    
                    <div className="input-subject">
                        <div className="icon1"></div>
                        <select required=""className="dropdown" onChange={this.handleSubjectChange}>
                            <option value hidden className="opt">Lựa chọn môn học</option>
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
                    <div className="title2">
                            <p>Tỉnh/Thành phố</p>
                    </div>
                    <div className="city">
                        <div className="icon3"></div>
                        <select required="" className="dropdown" onChange={this.handleAddressChange}>
                                <option value="" hidden className="opt-searchClass">Lựa chọn tỉnh thành phố</option>
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
                    <div className="btn-post">
                        <button className="btn-post" onClick={this.handleSubmit} >Đăng yêu cầu</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostNews;