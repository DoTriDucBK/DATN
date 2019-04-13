import React, { Component } from 'react';
import './ManageClass.css';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import ClassItemOfUser from '../ClassItem/ClassItemOfUser';
import { reactLocalStorage } from "reactjs-localstorage";
class ManageCLassOfUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClass: [],
            idUser: reactLocalStorage.getObject("user.info").idUser
        }
    }
    async componentDidMount() {
        let value = await ClassInfoAPI.getClassByIdUser(this.state.idUser);
        this.setState({
            listClass: value.data,
        });
    }
    showClassInfo = () => {
        const listClass = this.state.listClass.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassItemOfUser description={item.description}
                    idClass={item.idClass}
                    detailClass={item.detailClass}
                    nameSubject={item.nameSubject}
                    city={item.nameCity}
                    typeMethod={item.typeMethod}
                    numberDay={item.numberDay}
                    fee={item.fee}
                    status={item.status}
                    idUser={this.state.idUser} />
            </div>
        );
        return listClass;
    }
    render() {
        const { listClass } = this.state;
        console.log()
        if (listClass.length == 0)
            return <div></div>

        return (
            <div className="manage-class-container">
                <div className="manage-class-title">
                    <div className="titleClass-manage1">
                        <p className="titleClass-manage">Các lớp đã đăng</p>
                    </div>
                    <div className="titleClass-manage2">

                    </div>
                </div>
                <div className="select-manage-class">
                    <div className="select-container">
                        <select required="" className="select-searchClassOffer">
                            <option value className="opt-searchClassOffer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- Trạng thái --</option>
                            <option value="2">Đang tìm gia sư</option>
                            <option value="1">Đã chấp nhận</option>
                            <option value="0">Đã gửi yêu cầu</option>
                        </select>
                        <button className="manage-btnClass" onClick={this.onClick}> &nbsp;Áp dụng</button>
                    </div>

                </div>
                <div className="title-class-tutor-manage">
                    <div className="manage-tutor">

                    </div>
                    <div className="manage2-tutor">
                        <p className="manage2-tutor">Nội dung lớp học</p>
                    </div>
                    <div className="manage3-tutor">
                        <p className="manage3-tutor">Học phí</p>
                    </div>
                    <div className="manage4-tutor">
                        <p className="manage4-tutor">Trạng thái</p>
                    </div>
                </div>
                {this.showClassInfo()}
            </div>
        );
    }
}

export default ManageCLassOfUser;