import React, { Component } from 'react';
import './Guide.css'
class Guide extends Component {
    render() {
        return (
            <div className="guide-con">
                <div className="guide-123">
                    <div className="guide-name">
                        <h1>Hướng dẫn đăng kí lớp</h1>
                    </div>
                    <div className="guide-top">
                        <div className="guide-part">
                            <div className="img-guide1">
                                
                            </div>
                            <div className="title-guide">
                                <p><b>Đăng kí lớp</b></p>
                            </div>
                        </div>
                        <div className="guide-part">
                            <div className="img-guide2">
                                
                            </div>
                            <div className="title-guide">
                            <p><b>Lựa chọn các đề nghị dạy</b></p>
                            </div>
                        </div>
                        <div className="guide-part">
                            <div className="img-guide3">
                                
                            </div>
                            <div className="title-guide">
                            <p><b>Kết nối và học</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Guide;