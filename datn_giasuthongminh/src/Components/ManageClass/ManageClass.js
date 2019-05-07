import React, { Component } from 'react';
import './ManageClass.css';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import ClassItem from '../ClassItem/ClassItem';
import ClassElement from '../ClassItem/ClassElement';
import { reactLocalStorage } from "reactjs-localstorage";
import ClassUserApi from '../../API/ClassUserAPI';
class ManageClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idTutor: parseInt(this.props.location.state.idTutor),
            listClass: [],
            idUser: reactLocalStorage.getObject("user.info").idUser,
            status:0,
            classUser:[]
        }
    }
    async componentDidMount() {
        let value = await ClassInfoAPI.getClassByIdUser(this.state.idUser);
        this.setState({
            listClass: value.data,
        });
    }
    onClick = () => {
        console.log(this.state);

    }
    showClassInfo = () => {
        if(this.state.classUser.length === 0 && this.state.listClass.length >0){
        const listClass = this.state.listClass.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassElement description={item.description}
                    idClass={item.idClass}
                    detailClass={item.detailClass}
                    nameSubject={item.nameSubject}
                    city={item.nameCity}
                    typeMethod={item.typeMethod}
                    numberDay={item.numberDay}
                    fee={item.fee}
                    status={item.status}
                    idTutor={this.state.idTutor} />
            </div>
        );
        return listClass;
    }else{
            const listClass = this.state.classUser.map((item, index) =>
            <div className="result-element-class" key={index}>
                <ClassElement description={item.classInfo[0].description}
                    idClass={item.classInfo[0].idClass}
                    detailClass={item.classInfo[0].detailClass}
                    nameSubject={item.classInfo[0].nameSubject}
                    city={item.classInfo[0].nameCity}
                    typeMethod={item.classInfo[0].typeMethod}
                    numberDay={item.classInfo[0].numberDay}
                    fee={item.classInfo[0].fee}
                    status={item.classInfo[0].status}
                    idTutor={this.state.idTutor} />
            </div>
        );
        return listClass;
        }
        
    }
    handleChangeSearch = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    searchClass = async () => {
        console.log(this.state);
        var options={
            status:parseInt(this.state.status),
            idUser:reactLocalStorage.getObject("user.info").idUser
        }
        var list = await ClassUserApi.getClassAndTutorByIdAndStatus(options).then(
            classUser => {
                if(classUser && classUser.code === "success"){
                    list = classUser.data
                    this.setState({ classUser:classUser.data})
                }else if(classUser && classUser.code ==="error"){
                    alert(classUser.message)
                }
            }
        ).catch(err => console.log(err)
        )
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
                        <select required="" className="select-searchClassOffer" name="status" onChange={this.handleChangeSearch}>
                            <option value="" className="opt-searchClassOffer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- Trạng thái --</option>
                            <option value="2">Đang gửi yêu cầu gia sư</option>
                            <option value="1">Đã chấp nhận</option>
                        </select>
                        <button className="manage-btnClass" onClick={this.searchClass}> &nbsp;Áp dụng</button>
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

export default ManageClass;