import React, { Component } from 'react';
import './ListClass.css';
import ClassItem from '../../Components/ClassItem/ClassItem';
import ClassInfoAPI from '../../API/ClassInfoAPI';

class ListClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classInfo: [],
            city:"",
            subject:"",
            fee:"",
            doubleClass:"",
            method:""
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
    showClassInfo = () => {
        const listClass = this.state.classInfo.map((item, index) =>
            <div className="result-item-class" key={index}>
                <ClassItem description={item.description}
                    detailClass={item.detailClass}
                    nameSubject={item.nameSubject}
                    city={item.nameCity}
                    typeMethod={item.typeMethod}
                    numberDay={item.numberDay}
                    fee={item.fee} />
            </div>
        );
        return listClass;
    }
    render() {
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
                                <option value hidden className="opt-searchClass">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Tỉnh thành--</option>
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
                                <option value hidden className="opt-searchClass">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Môn học--</option>
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
                                <option value hidden className="opt-searchClass">&nbsp;&nbsp;&nbsp;&nbsp;--Hình thức dạy--</option>
                                <option value="Online">Online</option>
                                <option value="Offline">Offline (Tại nhà)</option>
                            </select>
                            <select required="" className="select-searchClass"name="doubleClass" onChange={this.handleChangeSearch}>
                                <option value hidden className="opt-searchClass">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--Học ghép--</option>
                                <option value="Có">Có</option>
                                <option value="Không">Không</option>
                            </select>
                            <select required="" className="select-searchClass" name="fee" onChange={this.handleChangeSearch}>
                                <option value hidden className="opt-searchClass">&nbsp;--Mức giá một buổi--</option>
                                <option value="1">Dưới 100000</option>
                                <option value="2">Từ 100000 - 200000</option>
                                <option value="3">Từ 200000 - 300000</option>
                                <option value="4">Trên 300000</option>
                            </select>
                            <button className="search-title-btnClass"> <i className="fas fa-search"></i> &nbsp;Tìm kiếm</button>
                        </div>
                        <div className="result-searchClass">
                            <p className="number-searchClass">Có <label>100</label> kết quả</p>
                        </div>
                    </div>
                    <div className="title-class-offer">
                        <div className="title-class-offer1">

                        </div>
                        <div className="title-class-offer2">
                            <p className="title-class-offer2">Nội dung lớp học</p>
                        </div>
                        <div className="title-class-offer3">
                            <p className="title-class-offer3">Học phí đề nghị</p>
                        </div>
                        <div className="title-class-offer4">
                            <p className="title-class-offer4">Phí nhận lớp</p>
                        </div>
                    </div>
                    <div>
                        {this.showClassInfo()}
                    </div>

                    {/* <div> */}
                    {/* <Pagination className="pagination-sm pull-right"
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={450}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
        /> */}
                    {/* <Pagination
				total={this.state.total}
				current={this.state.current}
				visiblePages={this.state.visiblePage}
				titles={{ first: '<|', last: '>|' }}
				className="pagination-sm pull-right"
				onPageChanged={this.handlePageChanged}
			/> */}
                    {/* </div> */}
                </div>
            </div>
        );
    }
}

export default ListClass;