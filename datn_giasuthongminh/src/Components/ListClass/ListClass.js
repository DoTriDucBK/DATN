import React, { Component } from 'react';
import './ListClass.css';
import ClassItem from '../../Components/ClassItem/ClassItem';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import { reactLocalStorage } from "reactjs-localstorage";

class ListClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classInfo: [],
            city:"",
            subject:"",
            fee:"",
            doubleClass:"",
            method:"",
            activePage: 1,
            classPerPage: 4,
            nameTutor: reactLocalStorage.getObject("tutor.login.info").userNameTutor,
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    handlePageChange = (e) => {

        this.setState({ activePage: Number(e.target.id) });
    }
    handlePageChangePre = () => {
        if(this.state.activePage > 1){
            this.setState({
                activePage: this.state.activePage - 1
            })
        }
        
    }
    handlePageChangeNext = () => {
        var lastPage = Math.ceil(this.state.classInfo.length / this.state.classPerPage);
        if(this.state.activePage < lastPage) {
            this.setState({
                activePage: this.state.activePage + 1
            })
        }
        
    }
    async componentDidMount() {
        let value = await ClassInfoAPI.getAll();
        this.setState({
            classInfo: value.data
        });
        console.log(this.state)
    }
    handleChangeSearch = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    // showClassInfo = () => {
    //     const listClass = this.state.classInfo.map((item, index) =>
    //         <div className="result-item-class" key={index}>
    //             <ClassItem description={item.description}
    //                 detailClass={item.detailClass}
    //                 nameSubject={item.nameSubject}
    //                 city={item.nameCity}
    //                 typeMethod={item.typeMethod}
    //                 numberDay={item.numberDay}
    //                 fee={item.fee}
    //                 status={item.status} />
    //         </div>
    //     );
    //     return listClass;
    // }
    searchClass = async () => {
        if(this.state.methodTeaching==="Online"){
            this.setState({typeMethod:"0"})
        }else if(this.state.methodTeaching ==="Offline"){
            this.setState({typeMethod:"1"})
        }else if(this.state.methodTeaching ==="both"){
            this.setState({typeMethod:"2"})
        }
        var options={
            nameSubject : this.state.subject,
            nameCity: this.state.city,
            typeMethod:this.state.method
            // jobTutor:this.state.jobTutor

        }

        var list = await ClassInfoAPI.searchClass(options).then(
            classInfo => {
                if(classInfo && classInfo.code === "success"){
                    list = classInfo.data
                    this.setState({ classInfo:classInfo.data})
                }else if(classInfo && classInfo.code ==="error"){
                    alert(classInfo.message)
                }
            }
        ).catch(err => console.log(err)
        )
    }
    render() {
        const { classInfo, activePage, classPerPage } = this.state;

        // Logic for displaying todos
        const indexOfLastClass = activePage * classPerPage;
        const indexOfFirstClass = indexOfLastClass - classPerPage;
        const currentClass = classInfo.slice(indexOfFirstClass, indexOfLastClass);

        const renderTodos = currentClass.map((item,index) => {
            return <div className="result-item-class" key={index}  > 
            <ClassItem
            description={item.description}
                idClass={item.idClass}
                idUser={item.idUser}
                detailClass={item.detailClass}
                nameSubject={item.nameSubject}
                city={item.nameCity}
                typeMethod={item.typeMethod}
                numberDay={item.numberDay}
                fee={item.fee} 
                status={item.status}
                nameTutor={this.state.nameTutor}/>
        </div>
        });
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(classInfo.length / classPerPage); i++) {
            pageNumbers.push(i);
        }
        const divStyle = {
            background:'#069D86',
          };
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <div className="item-page" value={number} key={number}><label key={number}
                    id={number}
                    onClick={this.handlePageChange}>{number}</label></div>
            );
        });
        return (
            <div className="listClass-container">
                <div className="listClass-con">
                    <div className="titleClass-container">
                        <div className="titleClass-container1">
                            <p className="titleClass-container">Danh sách lớp học</p>
                        </div>
                        <div className="titleClass-container2">

                        </div>
                    </div>
                    <div className="select-result-searchClass">
                        <div className="select-searchClass">
                            <select required="" className="select-searchClass" name="city" onChange={this.handleChangeSearch}>
                                <option value="" className="opt-searchClass">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Tỉnh thành--</option>
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
                            <select required="" className="select-searchClass" name="subject" onChange={this.handleChangeSearch}>
                                <option value="" className="opt-searchClass">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Môn học--</option>
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
                            <select required="" className="select-searchClass" name="method" onChange={this.handleChangeSearch}>
                                <option value="" className="opt-searchClass">&nbsp;&nbsp;&nbsp;&nbsp;--Hình thức dạy--</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline (Tại nhà)</option>
                                <option value="both">Cả 2 hình thức</option>
                            </select>
                            <select required="" className="select-searchClass"name="doubleClass" onChange={this.handleChangeSearch}>
                                <option value="" className="opt-searchClass">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Học ghép--</option>
                                <option value="Có">Có</option>
                                <option value="Không">Không</option>
                            </select>
                            <select required="" className="select-searchClass" name="fee" onChange={this.handleChangeSearch}>
                                <option value="" className="opt-searchClass">&nbsp;--Mức giá một buổi--</option>
                                <option value="1">Dưới 100000</option>
                                <option value="2">Từ 100000 - 200000</option>
                                <option value="3">Từ 200000 - 300000</option>
                                <option value="4">Trên 300000</option>
                            </select>
                            <button className="search-title-btnClass" onClick={this.searchClass}> <i className="fas fa-search"></i> &nbsp;Tìm kiếm</button>
                        </div>
                        <div className="result-searchClass">
                            <p className="number-searchClass">Có <label>{this.state.classInfo.length}</label> kết quả</p>
                        </div>
                    </div>
                    <div className="title-class-offer">
                        <div className="title-class-offer1">

                        </div>
                        <div className="title-class-offer2">
                            <p className="title-class-offer2">Nội dung lớp học</p>
                        </div>
                        <div className="title-class-offer3">
                            <p className="title-class-offer3">Học phí 1 buổi</p>
                        </div>
                        <div className="title-class-offer4">
                            <p className="title-class-offer4">Trạng thái</p>
                        </div>
                    </div>
                    <div>
                     {renderTodos}
                    </div>
                    <div className="rank-page">
                        <div className="page-number">
                            <div className="item-page" onClick={this.handlePageChangePre}><label ><i className="fas fa-angle-left"></i></label></div>
                            {renderPageNumbers}
                            <div className="item-page"><label onClick={this.handlePageChangeNext}><i className="fas fa-angle-right"></i></label></div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ListClass;