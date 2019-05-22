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
import ClassUserAPI from '../../API/ClassUserAPI';
import ClassTutorAPI from '../../API/ClassTutorAPI';
import UserShareClassAPI from '../../API/UserShareClassAPI';
import ChangePassword from '../ChangePassword/ChangePassword';
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
            modalChangePass:false,
            userinfo: reactLocalStorage.getObject("user.info"),
            is_login: reactLocalStorage.getObject("home.is_login"),
            type: reactLocalStorage.get("type"),
            redirectManageClassOffer: false,
            listInvite: [],
            listShare: []
        }
        this.toggle = this.toggle.bind(this);
        this.toggleSignin = this.toggleSignin.bind(this);
        this.toggleErr = this.toggleErr.bind(this);
        this.toggleChangePass = this.toggleChangePass.bind(this);
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
    toggleChangePass(){
        this.setState(prevState => ({
            modalChangePass: !prevState.modalChangePass
        }));
    }
    async componentDidMount() {
        if (this.state.type == "1") {
            var tutor = await TutorApi.getTutorByName(reactLocalStorage.getObject("user.info").userName);
            var options = {
                idTutor: tutor.data[0].idTutor,
                notification: 0,
                is_seen: 0
            }

            var list = await ClassUserAPI.searchClassUser(options).then(
                listInvite => {
                    if (listInvite && listInvite.code === "success") {
                        list = listInvite.data
                        this.setState({ listInvite: listInvite.data })
                    } else if (listInvite && listInvite.code === "error") {
                        alert(listInvite.message)
                    }
                }
            ).catch(err => console.log(err)
            )
        } else if (this.state.type == "2") {
            var options = {
                idUser: reactLocalStorage.getObject("user.info").idUser,
                notification: 0,
                is_seen: 0
            }
            var list = await ClassTutorAPI.searchClassUser(options).then(
                listInvite => {
                    if (listInvite && listInvite.code === "success") {
                        list = listInvite.data
                        this.setState({ listInvite: listInvite.data })
                    } else if (listInvite && listInvite.code === "error") {
                        alert(listInvite.message)
                    }
                }
            ).catch(err => console.log(err)
            )
            var option1 = {
                idUserOfClass: reactLocalStorage.getObject("user.info").idUser,
                notification: 0,
                is_seen: 0
            }
            var listClass = await UserShareClassAPI.searchClassUser(option1).then(
                listShareClass => {
                    if (listShareClass && listShareClass.code === "success") {
                        listClass = listShareClass.data;
                        this.setState({
                            listShare: listShareClass.data
                        })
                    } else if (listShareClass && listShareClass.code === "error") {
                        alert(listShareClass.message)
                    }
                }
            ).catch(err => console.log(err))
        }
    }
    // Lấy nội dung ô search khi thay đổi
    handleSearchChange = (e) => {
        var value = e.target.value;
        this.setState({
            textSearch: value,
            redirectSearchTutor: value ? true : false
        })

    };
    handleLogin = (userinfo, is_login, type) => {
        this.setState({ userinfo: userinfo, is_login: is_login, type: type })
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
        this.setState({ redirectManageClassOffer: true });
    }
    alertInfo = () => {
        alert("Nhập dữ liệu tìm kiếm đi ĐỒ NGỐC! Ahihi");
    }
    handleLogout = async () => {
        console.log("Đưc");
        var result = await UserApi.logout();
        console.log(result)
        if (result) {
            reactLocalStorage.setObject("user.info", null);
            reactLocalStorage.setObject("home.is_login", false);
            reactLocalStorage.set("type", 0);
            this.setState({
                userinfo: null,
                is_login: false,
                type: 0
            })
        } else console.log("Lỗi kết nối mạng")
        // reactLocalStorage.set("home.is_login", true);
        // this.setState({
        //     redirectHome: true, 
        // })
    }
    calNumberShare = (a, b) => {
        console.log(this.state.listShare.length)
        return parseInt(a) + parseInt(b);
    }
    handleChangePassword = () => {
        this.toggleChangePass();
    }
    render() {
        var user_name = this.state.userinfo ? this.state.userinfo.userName : "";
        console.log(typeof(reactLocalStorage.getObject("home.is_login")));
        if (this.state.redirectLogin) {
            return <Redirect push to="/login" />;
        } else if (this.state.redirectHome) {
            return <Redirect push to="/" />;
        } else if (this.state.redirectListClass) {
            return <Redirect push to="/listclass" />;
        } else if (this.state.redirectManageClassOffer) {
            return <Redirect push to="/manage-offer" />
        }
        // else if(this.state.redirectSearchTutor){
        //     var textSearch = this.state.textSearch;
        //     return <Redirect  to={"/searchTutor/" + textSearch + ""}/>
        // }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light nav-header">
                    <a className="navbar-brand brand-custom" href="#">
                        <div
                            className="d-inline-block align-top image-logo" alt="" />
                    </a>
                    <div className="collapse navbar-collapse navbar-collapse-custom" id="navbarSupportedContent">
                        <form className="form-inline my-2 my-lg-0 search form-search">
                            <input className=" search mr-sm-2" type="search"
                                placeholder="Tìm kiếm gia sư theo môn học" aria-label="Search"
                                onChange={this.handleSearchChange}
                            />
                            <div className="nav-btn-search" >
                                {this.state.redirectSearchTutor ? <Link to={"/searchTutor/" + this.state.textSearch} className="nav-link custom-link">Tìm kiếm</Link> : <div className="notChange" onClick={this.toggleErr}>Tìm kiếm</div>}
                            </div>
                        </form>
                        <ul className="navbar-nav mr-4 ul-nav ul-custom">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" ><i className="fas fa-home"></i>  Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/listclass" className="nav-link">Lớp học</Link>
                            </li>
                            <li className="nav-item become-tutor">
                                <Link to="/become-tutor" className="nav-link">Trở thành gia sư</Link>
                            </li>
                            <li className="nav-item guide">
                                <Link to="/guide" className="nav-link">Xem hướng dẫn</Link>
                            </li>
                            {
                                this.state.is_login ?
                                    <div className="yes-login">
                                        <li className="nav-item">
                                            {reactLocalStorage.get("type") == "1" ?
                                                <Link to="/manage-invite" className="nav-link loimoi">Lời mời<sup className="number-invite">&nbsp;{this.state.listInvite.length}</sup></Link>
                                                : <Link to="/manage-offer" className="nav-link loimoi">Lời mời<sup className="number-invite">&nbsp;{this.calNumberShare(this.state.listInvite.length, this.state.listShare.length)}</sup></Link>}
                                        </li>
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
                                                    {reactLocalStorage.get("type") == "1" ?
                                                        <div>
                                                            <li className="dropdown-item-title1">Chức năng gia sư</li>
                                                            <li className="dropdown-content-item"><Link to="/listclass"> <label><i className="fas fa-school"></i>&nbsp;&nbsp;Xem danh sách lớp học</label></Link></li>
                                                            <li className="dropdown-content-item"><Link to="/manage-class"><label><i className="fas fa-graduation-cap"></i>&nbsp;Các đề nghị dạy đã gửi</label></Link></li>
                                                            <li className="dropdown-content-item"> <Link to="/personal"><label><i className="fas fa-user-shield"></i>&nbsp;&nbsp;Trang cá nhân</label></Link></li>
                                                            <li className="dropdown-content-item"> <Link to="/tutor-profile"><label><i className="fas fa-tools"></i>&nbsp;&nbsp;Cập nhật hồ sơ gia sư</label></Link></li>
                                                        </div> : <div>
                                                            <li className="dropdown-item-title">Chức năng học viên</li>
                                                            <li className="dropdown-content-item"> <Link to="/manage-invitation"><label><i className="fas fa-tasks"></i>&nbsp;&nbsp;Quản lý các yêu cầu gia sư</label></Link></li>
                                                            <li className="dropdown-content-item"> <Link to="/manage-class-of-user"><label><i className="fas fa-plus-circle"></i>&nbsp;Danh sách lớp đã đăng</label></Link></li>
                                                        </div>}
                                                    <li className="dropdown-item-title">Chức năng cá nhân</li>
                                                    <li className="dropdown-content-item"><label onClick={this.handleChangePassword}><i className="fas fa-unlock-alt"></i>&nbsp;Đổi mật khẩu</label></li>
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
                    <div className="small-menu-dropdown">
                            <label className="menu-dropdown dropbtn"><i className="fas fa-bars"></i></label>
                            <div className="dropdown-content-small">
                            <ul className="dropdown-content-info-small">
                                    <li className="dropdown-content-item-small"><Link to="/"> <label><i className="fas fa-school"></i>&nbsp;&nbsp;Trang chủ</label></Link></li>
                                    <li className="dropdown-content-item-small"><Link to="/listclass"><label><i className="fas fa-graduation-cap"></i>&nbsp;Danh sách lớp học</label></Link></li>
                                    <li className="dropdown-content-item-small" onClick={this.toggle}> <Link to=""><label><i className="fas fa-user-shield"></i>&nbsp;&nbsp;Đăng nhập</label></Link></li>
                                    {reactLocalStorage.get("type") == "1" ?
                                     <li className="dropdown-content-item-small"><Link to="/personal"><label><i className="fas fa-graduation-cap"></i>&nbsp;Trang cá nhân</label></Link></li>:<div></div>}
                                    <li className="dropdown-content-item-small"><label onClick={this.handleChangePassword}><i className="fas fa-unlock-alt"></i>&nbsp;&nbsp;Đổi mật khẩu</label></li>
                                    <li className="dropdown-content-item-small"><label onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Đăng xuất</label></li>
                                    </ul>
                            </div>
                        </div>
                </nav>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                    <ModalBody>
                        <Login toggle={this.toggle} handleLogin={this.handleLogin} handleLogin2={this.handleLogin2} />
                    </ModalBody>

                </Modal>
                <Modal isOpen={this.state.modalSignin} toggle={this.toggleSignin} className={this.props.className}>

                    <ModalBody>
                        <Signin toggleSignin={this.toggleSignin} />
                    </ModalBody>

                </Modal>
                <Modal isOpen={this.state.modalErr} toggle={this.toggleErr} className={this.props.className}>

                    <ModalBody>
                        <InfoMess toggleSearch = {this.toggleErr}/>
                    </ModalBody>

                </Modal>
                <Modal isOpen={this.state.modalChangePass} toggle={this.toggleChangePass} className={this.props.className}>

                    <ModalBody>
                        <ChangePassword togglePass={this.toggleChangePass}/>
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

export default Nav;