import React, { Component } from 'react';
import './Nav.css';
// import { Redirect } from 'react-router';
import { Link, Redirect } from 'react-router-dom'
import Login from '../Login/Login';
import Signin from '../Signin/Signin';
import { Modal, ModalBody } from 'reactstrap';
import '../css/ModalCustome.css';
import InfoMess from './InfoMess';
import { reactLocalStorage } from "reactjs-localstorage";
import UserApi from '../../API/UserAPI';
import TutorApi from '../../API/TutorAPI';
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
            modalErr: false,
            userinfo: reactLocalStorage.getObject("user.info"),
            is_login: false,
            redirectManageClassOffer:false
        }
        this.toggle = this.toggle.bind(this);
        this.toggleSignin = this.toggleSignin.bind(this);
        this.toggleErr = this.toggleErr.bind(this);
    }
    componentDidMount() {
        this.setState({ is_login: false })
        // reactLocalStorage.get("home.is_login")
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
    handleLogin = (userinfo, is_login) => {
        this.setState({ userinfo: userinfo, is_login: is_login })
    }
    handleLogin2 = (tutorinfo, is_login) => {
        this.setState({tutorinfo:tutorinfo, is_login:is_login})
    }
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
    redirectManageClassOffer = () => {
        this.setState({redirectManageClassOffer:true});
    }
    alertInfo = () => {
        alert("Nhập dữ liệu tìm kiếm đi ĐỒ NGỐC! Ahihi");
    }
    handleLogout = async () => {
        var result = await UserApi.logout();
        console.log(result)
        if (result) {
            reactLocalStorage.setObject("user.info", null);
            reactLocalStorage.setObject("home.is_login", false);
            this.setState({
                userinfo: null,
                is_login: false
            })
        } else console.log("Lỗi kết nối mạng")
        // reactLocalStorage.set("home.is_login", true);
        // this.setState({
        //     redirectHome: true, 
        // })
    }
    render() {
        var user_name = this.state.userinfo ? this.state.userinfo.userName : "";
        console.log(this.state.is_login);
        if (this.state.redirectLogin) {
            return <Redirect push to="/login" />;
        } else if (this.state.redirectHome) {
            return <Redirect push to="/" />;
        } else if (this.state.redirectListClass) {
            return <Redirect push to="/listclass" />;
        } else if (this.state.redirectManageClassOffer){
            return <Redirect push to="/manage-offer"/>
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
                        <form className="form-inline my-2 my-lg-0 search form-search">
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
                        <ul className="navbar-nav mr-4 ul-nav ul-custom">
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
                            {
                                this.state.is_login ?
                                    <div>
                                        <li className="nav-item li-item-user ">
                                            <div className="profile-user">
                                                <div className="img-profile">
                                                <img id="show_avatar" alt="ảnh đại diện" className="avatar2" src="https://d1plicc6iqzi9y.cloudfront.net/sites/all/themes/blacasa/images/default/default_user.png" />
                                                </div>
                                                <div className="user-profile">
                                                    <p className="user-profile">{user_name}</p>

                                                </div>
                                            </div>
                                        </li>
                                        <li className="nav-item nav-item2 dropdown">
                                            <label className="menu-dropdown dropbtn"><i className="fas fa-bars"></i></label>
                                            <div className="dropdown-content">
                                                <ul className="dropdown-content-info">
                                                    <li className="dropdown-item-title1">Chức năng gia sư</li>
                                                    <li className="dropdown-content-item"><Link to="/listclass"> <label><i className="fas fa-school"></i>&nbsp;&nbsp;Xem danh sách lớp học</label></Link></li>
                                                    <li className="dropdown-content-item"><Link to="/manage-offer"><label><i className="fas fa-graduation-cap"></i>&nbsp;Các đề nghị dạy đã gửi</label></Link></li>
                                                    <li className="dropdown-content-item"> <Link to = "/tutor-profile"><label><i className="fas fa-tools"></i>&nbsp;&nbsp;Cập nhật hồ sơ gia sư</label></Link></li>
                                                    <li className="dropdown-item-title">Chức năng học viên</li>
                                                    <li className="dropdown-content-item"> <Link to="/manage-invitation"><label><i className="fas fa-tasks"></i>&nbsp;&nbsp;Quản lý các yêu cầu gia sư</label></Link></li>
                                                    <li className="dropdown-content-item"> <Link to="/manage-class-of-user"><label><i className="fas fa-plus-circle"></i>&nbsp;Danh sách lớp đã đăng</label></Link></li>
                                                    <li className="dropdown-item-title">Chức năng cá nhân</li>
                                                    <li className="dropdown-content-item"> <label><i className="fas fa-unlock-alt"></i>&nbsp;Đổi mật khẩu</label></li>
                                                    <li className="dropdown-content-item" onClick={this.handleLogout}> <label><i className="fas fa-sign-out-alt"></i>&nbsp;Đăng xuất</label></li>
                                                </ul>

                                            </div>
                                        </li>
                                    </div>
                                    :
                                    <div className="login-logout">
                                        <li className="nav-item nav-item-login" onClick={this.toggle}>
                                            <a className="nav-link ">Đăng nhập</a>
                                        </li>
                                        <li className="nav-item nav-item-signin" onClick={this.toggleSignin}>
                                            <button type="button" className="nav-btn-dangki">Đăng ký</button>
                                        </li>
                                    </div>

                            }

                            {/*  */}
                        </ul>

                    </div>
                </nav>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                    <ModalBody>
                        <Login toggle={this.toggle} handleLogin={this.handleLogin} handleLogin2 = {this.handleLogin2}/>
                    </ModalBody>

                </Modal>
                <Modal isOpen={this.state.modalSignin} toggle={this.toggleSignin} className={this.props.className}>

                    <ModalBody>
                        <Signin toggleSignin = {this.toggleSignin}/>
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