import React, { Component } from 'react';
import './Footer.css';
class Footer extends Component {
    render() {
        return (
            <div className="footer-con">
                <div className="value-footer">
                    <div className="img-footer">

                    </div>
                    <div className="contact-footer">
                        <h5 className="title-footer">Liên lạc</h5>
                        <p className="title-footer"><i className="fas fa-phone"></i>&nbsp;Điện thoại: 0965143540</p>
                        <p className="title-footer"><i className="fas fa-map-marker-alt"></i>&nbsp;Địa chỉ: 7, Tạ Quang Bửu, Hà Nội.</p>
                        <p className="title-footer email"><i className="fas fa-envelope"></i>&nbsp;Email: dotriduc26071996@gmail.com</p>
                    </div>
                    <div className="value-footer1">
                        <h5 className="title-footer">Dịch vụ</h5>
                        <ul className="value-footer">
                            <li className="value-footer">
                                Bạn muốn trở thành gia sư?
                            </li>
                            <li className="value-footer">
                                Đăng lớp tìm gia sư
                            </li>
                            <li className="value-footer">
                                Tìm kiếm gia sư
                            </li>
                            <li className="value-footer">
                                Hướng dẫn sử dụng
                            </li>
                        </ul>
                    </div>
            
                </div>
                <div className="value2-footer">
                <div className="end-footer">
                     <p className="value2-footer">© 2018 Copyright:<b className="value2-footer">&nbsp;Gia sư BK</b></p>
                </div>
                    
                        
                </div>


                
            </div>

        );
    }
}

export default Footer;