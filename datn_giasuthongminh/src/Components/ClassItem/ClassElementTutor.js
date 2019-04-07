import React, { Component } from 'react';
import './ClassElement.css';
import MyUtils from '../../utils/MyUtils';
import TutorAPI from '../../API/TutorAPI';
import ClassUserAPI from '../../API/ClassUserAPI';
import { reactLocalStorage } from "reactjs-localstorage";
import { Redirect } from 'react-router-dom';
class ClassElementTutor extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
        // var s = parseInt(this.props.status);
        // if (s === 0) {
        //     this.setState({ status: "Còn lớp" })
        // } else if (s === 1) {
        //     this.setState({ status: "Hết lớp" })
        // } else if (s === 2) {
        //     this.setState({ status: "Đang yêu cầu" })
        // }
        // var listTutor = await TutorAPI.getTutorById(parseInt(this.props.idTutor));

        // console.log(listTutor)
        // this.setState({
        //     idTutor: this.props.idTutor,
        //     tutor: listTutor,
        // })


    }
    
    render() {
        // console.log(this.state.tutor)
        // const { tutor, redirectManageInvitation } = this.state;
        // if (redirectManageInvitation) {
        //     return <Redirect push to="/manage-invitation" />
        // }
        // if (!tutor || tutor.length == 0) {
        //     return <div></div>
        // }
        return (
            <div className="classItem-con">
                <div className="img-logoBK">

                </div>
                <div className="Class-detail">
                    <div className="name-class">
                        <p className="name-class"><label className="name-class"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b></b></p>
                    </div>
                    <div className="detail-class">
                        <p className="detail-class"></p>
                    </div>
                    <div className="info-class">
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;</p>
                        </div>
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;</p>
                        </div>
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;}</p>
                        </div>
                        <div className="info-class2">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp; buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee">
                    <div className="value-fee"><b></b>đ/1 buổi</div>
                </div>
                <div className="class-offer">
                    <div className="fee-offer">
                        <div className="status-offer"><label className="status-offer"></label></div>
                    </div>
                    <div className="button-offer">
                        <button className="button-offer">Mời dạy</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassElementTutor;