import React, { Component } from 'react';
import './Nav.css';
// import { Redirect } from 'react-router';
import { Link, Redirect } from 'react-router-dom'
import Login from '../Login/Login';
import Signin from '../Signin/Signin';
import { Modal, ModalBody } from 'reactstrap';
import '../css/ModalCustome.css';
import InfoMess from './InfoMess';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectHome: false,
            redirectGuide: false,
            redirectLogin: false,
            redirectListClass: false,
            redirectSearchTutor: false,
            textSearch: "",
            modal: false,
            modalSignin: false,
            modalErr:false
        }
        this.toggle = this.toggle.bind(this);
        this.toggleSignin = this.toggleSignin.bind(this);
        this.toggleErr = this.toggleErr.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggleSignin() {
        this.setState(prevState => ({
            modalSignin: !prevState.modalSignin
        }));
    }
    toggleErr() {
        this.setState(prevState => ({
            modalErr: !prevState.modalErr
        }));
    }
    // Lấy nội dung ô search khi thay đổi
    handleSearchChange = (e) => {
        var value = e.target.value;
        this.setState({
            textSearch: value,
            redirectSearchTutor: value ? true : false
        })

    };
    // Bắt sự kiện cho button search
    // searchTutor = (e) => {
    //     e.preventDefault();
    // }
    // Điều hướng trang Home
    redirectHome = () => {
        this.setState({
            redirectHome: true
        });
    }
    // Điều hướng trang login
    redirectLogin = () => {
        this.setState({ redirectLogin: true });
    }
    // Điều hướng trang listclass
    redirectListClass = () => {
        this.setState({ redirectListClass: true });
    }
    // Điều hướng trang serachTutor 
    redirectSearchTutor = () => {
        this.setState({ redirectSearchTutor: true });
    }
    alertInfo = () => {
        alert("Nhập dữ liệu tìm kiếm đi ĐỒ NGỐC! Ahihi");
    }

    render() {
        if (this.state.redirectLogin) {
            return <Redirect push to="/login" />;
        } else if (this.state.redirectHome) {
            return <Redirect push to="/" />;
        } else if (this.state.redirectListClass) {
            return <Redirect push to="/listclass" />;
        }
        // else if(this.state.redirectSearchTutor){
        //     var textSearch = this.state.textSearch;
        //     return <Redirect  to={"/searchTutor/" + textSearch + ""}/>
        // }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light nav-header">
                    <a className="navbar-brand" href="#">
                        <div
                            className="d-inline-block align-top image-logo" alt="" />
                        {/* <label className="nameLogo">Gia sư BK</label> */}
                    </a>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0 search">
                            <input className=" search mr-sm-2" type="search"
                                placeholder="Tìm kiếm gia sư theo môn học" aria-label="Search"
                                onChange={this.handleSearchChange}
                            />
                            <div className="nav-btn-search" >
                                {/* <i className="fas fa-search"></i> */}
                                {this.state.redirectSearchTutor ? <Link to={"/searchTutor/" + this.state.textSearch} className="nav-link custom-link">Tìm kiếm</Link> : <div className="notChange" onClick={this.toggleErr}>Tìm kiếm</div>}
                            </div>
                            {/*   onClick={this.redirectSearchTutor} className="nav-link" */}
                        </form>
                        <ul className="navbar-nav mr-4 ul-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" ><i className="fas fa-home"></i>  Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/listclass" className="nav-link">Lớp học</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/become-tutor" className="nav-link">Trở thành gia sư</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/guide" className="nav-link">Xem hướng dẫn</Link>
                            </li>
                            <li className="nav-item" onClick={this.toggle}>
                                <a className="nav-link ">Đăng nhập</a>
                            </li>
                            <li className="nav-item" onClick={this.toggleSignin}>
                                <button type="button" className="nav-btn-dangki">Đăng ký</button>
                            </li>
                        </ul>

                    </div>
                </nav>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                    <ModalBody>
                        <Login />
                    </ModalBody>

                </Modal>
                <Modal isOpen={this.state.modalSignin} toggle={this.toggleSignin} className={this.props.className}>

                    <ModalBody>
                        <Signin />
                    </ModalBody>

                </Modal>
                <Modal isOpen={this.state.modalErr} toggle={this.toggleErr} className={this.props.className}>

                    <ModalBody>
                        <InfoMess />
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

export default Nav;