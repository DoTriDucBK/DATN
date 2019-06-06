import React, { Component } from 'react';
import './ManageClass.css';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import ClassItemOfUser from '../ClassItem/ClassItemOfUser';
import { reactLocalStorage } from "reactjs-localstorage";
import 'bootstrap/dist/css/bootstrap.min.css';
class ManageCLassOfUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClass: [],
            idUser: reactLocalStorage.getObject("user.info").idUser,
            activePage: 1,
            classPerPage: 3,
            status:"",
        }
    }
    handleChangeSearch = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
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
        var lastPage = Math.ceil(this.state.listClass.length / this.state.classPerPage);
        if(this.state.activePage < lastPage) {
            this.setState({
                activePage: this.state.activePage + 1
            })
        }
        
    }
    async componentDidMount() {
        let value = await ClassInfoAPI.getClassByIdUser(this.state.idUser);
        this.setState({
            listClass: value.data,
        });
    }
    searchClass = async () => {
        var options={
            status:this.state.status,
            idUser: this.state.idUser
        }
        var list = await ClassInfoAPI.searchClass(options).then(
            classInfo => {
                if(classInfo && classInfo.code === "success"){
                    list = classInfo.data
                    this.setState({ listClass:classInfo.data})
                }else if(classInfo && classInfo.code ==="error"){
                    alert(classInfo.message)
                }
            }
        ).catch(err => console.log(err)
        )
        console.log(list)
    }
    render() {
        const { listClass, activePage, classPerPage } = this.state;

        // Logic for displaying todos
        const indexOfLastClass = activePage * classPerPage;
        const indexOfFirstClass = indexOfLastClass - classPerPage;
        const currentClass = listClass.slice(indexOfFirstClass, indexOfLastClass);

        const renderTodos = currentClass.map((item,index) => {
            return <div className="result-element-class" key={index}>
            <ClassItemOfUser description={item.description}
                idClass={item.idClass}
                detailClass={item.detailClass}
                nameSubject={item.nameSubject}
                city={item.nameCity}
                typeMethod={item.typeMethod}
                numberDay={item.numberDay}
                fee={item.fee}
                status={item.status}
                idUser={this.state.idUser}
                comment={item.comment} />
        </div>
        });
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(listClass.length / classPerPage); i++) {
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
        // if (listClass.length == 0)
        //     return <div></div>

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
                        <select required="" name="status" className="select-searchClassOffer" onChange={this.handleChangeSearch}>
                            <option value="" className="opt-searchClassOffer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- Trạng thái --</option>
                            <option value="Chưa nhận lớp">Chưa nhận lớp</option>
                            <option value="Đã nhận lớp">Đã chấp nhận</option>
                            <option value="Đang yêu cầu">Đang yêu cầu gia sư</option>
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
                {renderTodos}
                {pageNumbers.length > 1?
                    <div className="rank-page">
                        <div className="page-number">
                            <div className="item-page" onClick={this.handlePageChangePre}><label ><i className="fas fa-angle-left"></i></label></div>
                            {renderPageNumbers}
                            <div className="item-page"><label onClick={this.handlePageChangeNext}><i className="fas fa-angle-right"></i></label></div>
                        </div>
                    </div>:<div></div>}
            </div>
        );
    }
}

export default ManageCLassOfUser;