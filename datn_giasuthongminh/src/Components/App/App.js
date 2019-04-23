import React, { Component } from 'react';
import './App.css';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import ListClass from '../ListClass/ListClass';
import { BrowserRouter as Router, Route} from "react-router-dom";
import TutorItem from '../TutorItem/TutorItem';
import PersonalPage from '../PersonalPage/PersonalPage';
import OfferClass from '../OfferClass/OfferClass';
import Login from '../Login/Login';
import ListTutor from '../ListTutor/ListTutor';
import Signin from '../Signin/Signin';
import SearchListTutor from '../SearchListTutor/SearchListTutor';
import ClassItem from '../ClassItem/ClassItem';
import InfoMess from '../Nav/InfoMess';
import ManageClassOffer from '../ManagePersonalInfo/ManageClassOffer';
import ClassElement from '../ClassItem/ClassElement';
import ManageInvitation from '../ManagePersonalInfo/ManageInvitation';
import TutorProfile from '../TutorProfile/TutorProfile';
import DetailClassOffer from '../DetailClassOffer/DetailClassOffer';
import ManageClass from '../ManageClass/ManageClass';
import DetailClass from '../DetailClass/DetailClass';
import { reactLocalStorage } from 'reactjs-localstorage';
import ManageClassOfUser from '../ManageClass/ManageClassOfUser';
import InfoTutor from '../TutorProfile/InfoTutor';
import ManageInvite from '../ManageInvite/ManageInvite';
import ManageOffer from '../ManageInvite/ManageOffer';
class App extends Component {
	constructor(props) {
		super(props)
		this.state = ({
			indexHome: 0,
			
		})
	
	}
	render() {
		return (
			<Router>
				<div className="App">
					<Nav />
					<main>
						<Route exact path="/" component={() => <Home />} />
						{/* Đăng kí làm gia sư */}
						<Route path="/become-tutor" component={Home} />
						{/* Hướng dẫn dùng */}
						<Route path="/guide" component={Home} />
						{/* Thông tin chi tiết 1 gia sư */}
						<Route path="/tutor-item" component={TutorItem} />
						{/* Trang cá nhân gia sư */}
						<Route path="/personal-page" component={PersonalPage} />
						{/* Thông tin chi tiết để đăng yêu cầu mở lớp */}
						<Route path="/offer-class" component={OfferClass} />
						{/* Đăng nhập */}
						<Route path="/login" component={Login} />
						{/* Danh sách gia sư nổi bật */}
						<Route path="/list-tutor" component={ListTutor} />
						{/* Thanh điều hướng navbar */}
						<Route path="/nav" component={Nav} />
						{/* Đăng kí tài khoản */}
						<Route path="/signin" component={Signin} />
						{/* Tìm kiếm gia sư theo môn học */}
						<Route path="/searchTutor/:textSearch" component={SearchListTutor} />
						{/* Danh sách tất cả các lớp của tất cả người dùng đăng lên */}
						<Route path="/listclass" component={ListClass} />
						{/* Class chi tiết chung cho tất cả các class mà người dùng đăng lên */}
						<Route path="/classItem" component={ClassItem} />
						{/* Modal thông tin lỗi yêu cầu nhập xong mới tìm kiếm */}
						<Route path="/info-mess" component={InfoMess} />
						{/* Danh sách các lớp mà một gia sư đã đề nghị dạy  */}
						<Route path="/manage-class" component={ManageClassOffer} />
						{/* Class chi tiết khi user mời gia sư */}
						<Route path="/class-element" component={ClassElement}/>
						{/* Danh sách những lớp mà người dùng đã mời gia sư */}
						<Route path="/manage-invitation" component={ManageInvitation}/>
						{/* Cập nhật hồ sơ */}
						<Route path="/tutor-profile" component={TutorProfile}/>
						{/* Danh sách các lớp mà user đăng lên, dùng để chọn lớp mời gia sư dạy */}
						<Route path="/class-user" component={ManageClass}/>
						{/* Hiển thị chi tiết thông tin của class */}
						<Route path="/detail-class" component={DetailClass}/>
						{/* Quản lí danh sách các class của user đăng lên */}
						<Route path="/manage-class-of-user" component={ManageClassOfUser}/>
						{/* Hồ sơ sau khi đăng kí */}
						<Route path="/info-tutor" component={InfoTutor}/>
						{/* Quản lý lời mời người dùng mời gia sư */}
						<Route path="/manage-invite" component={ManageInvite}/>
						{/* Quản lý lời đề nghị của gia sư dạy lớp */}
						<Route path="/manage-offer" component={ManageOffer}/>
					</main>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
