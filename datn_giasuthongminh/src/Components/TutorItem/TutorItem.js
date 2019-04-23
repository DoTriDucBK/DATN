import React, { Component } from 'react';
import './TutorItem.css';
import { Redirect } from 'react-router';
import MyUtil from '../../utils/MyUtils';
import { reactLocalStorage } from "reactjs-localstorage";
import StarRatings from 'react-star-ratings';
import { Modal, ModalBody } from 'reactstrap';
import '../css/ModalCustome.css';
import InfoNotLogin from '../Nav/InfoNotLogin';
class TutorItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectPersonalPage: false,
            nameTutor: "",
            addTutor: "",
            subjectTutor: "",
            fee: "",
            redirectListClassUser: false,
            idTutor: [this.props.idTutor],
            star:[this.props.star],
            modalErr1:false,
        }
        this.toggleErr1 = this.toggleErr1.bind(this);
    }
    toggleErr1() {
        this.setState(prevState => ({
            modalErr1: !prevState.modalErr1
        }));
    }
    redirectPersonalPage = () => {
        this.setState({
            redirectPersonalPage: true,
            nameTutor: [this.props.name],
            addTutor: [this.props.address],
            fee: [this.props.fee],
            subjectTutor: [this.props.subject],
            birthday: [this.props.birthday],
            idTutor: [this.props.idTutor]
        });
    }
    redirectListClassUser = () => {
        if(!reactLocalStorage.getObject("home.is_login")){
            this.toggleErr1();
        }else{
        this.setState({
            redirectListClassUser: true
        })}
    }
    render() {
        var userInfo = reactLocalStorage.getObject("user.info", null);
        var idUser = userInfo ? userInfo.idUser : "";
        // var is_login = reactLocalStorage.get("home.is_login");
        console.log(idUser);

        if (this.state.redirectPersonalPage) {
            return <Redirect to={{
                pathname: '/personal-page',
                state: {
                    idTutor: [this.state.idTutor]
                }
            }}>
            </Redirect>
        }
        if (this.state.redirectListClassUser) {
            return <Redirect to={{
                pathname: "/class-user",
                state: {
                    idTutor: [this.state.idTutor]
                }
            }}>

            </Redirect>
        }
        return (
            <div className="contentTutor">
                <div className="image-tutor">
                <img id="show_avatar" alt="ảnh đại diện" className="avatar" src={this.props.image}/>
                </div>
                <div className="infoTutor">
                    <div className="name">
                        <p><b>{this.props.name}</b></p>
                    </div>
                    <div className="address">
                        <p> <i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;{this.props.address}</p>
                    </div>
                    <div className="subject">
                        <p><i className="fas fa-book-reader"></i>&nbsp;&nbsp;{this.props.subject}</p>
                    </div>
                    <div className="fee">
                        <p><i className="fas fa-hand-holding-usd"></i>&nbsp;&nbsp; {MyUtil.currencyFormat(this.props.fee)} vnđ/h</p>
                    </div>
                    <div className="addInfo">
                        <p><i className="fas fa-info-circle"></i>&nbsp;&nbsp;{this.props.detail}</p>
                    </div>
                    {/* <br/> */}
                    <div className="star-rating">
                    <StarRatings
        rating={this.props.star}
        starDimension="25px"
        starRatedColor="yellow"
        // starSpacing="5px"
      />
                    </div>
                    
                    <div className="btn">
                        <button className="btn btn1" onClick={this.redirectPersonalPage}>Xem chi tiết</button>&nbsp;&nbsp;
                        <button className="btn btn2" onClick={this.redirectListClassUser}>Mời dạy</button>
                    </div>
                </div>
                <Modal isOpen={this.state.modalErr1} toggle={this.toggleErr1} className={this.props.className}>

                    <ModalBody>
                        <InfoNotLogin />
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

export default TutorItem;