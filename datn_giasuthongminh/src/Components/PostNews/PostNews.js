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
                        <input type="text" placeholder="Nhập tỉnh/thành phố" onChange={this.handleAddressChange}></input>
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