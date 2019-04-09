import React, { Component } from 'react';
import './ClassItem.css';
import MyUtils from '../../utils/MyUtils';
import {Redirect} from "react-router-dom";
import TutorAPI from '../../API/TutorAPI';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import ClassTutorAPI from '../../API/ClassTutorAPI';
import { Modal, ModalBody } from 'reactstrap';
import '../css/ModalCustome.css';
import DetailClass from '../../Components/DetailClass/DetailClass'
class ClassItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirectDetailClass:false,
            status: "",
            nameTutor:this.props.nameTutor,
            tutor:[],
            open:false,
            redirectManageOffer:false,
            modal: false
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleYes = () => {
        var data = {
            idUser: this.props.idUser,
            idTutor: this.state.tutor[0].idTutor,
            idClass:this.props.idClass,
            status:2
        }
        console.log("1111111111  " , data);
        var classTutor = ClassTutorAPI.createClassTutor(data).then(result => {
            if (result && result.code === "success") {
                classTutor = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
            .catch(err => console.log(err));
        this.setState({
            open: false,
            redirectManageOffer: true
        });
    }
    onClickOfferTutor = () => {

        this.setState({

            open: true
        })

    }
    async componentDidMount(){
        var s= parseInt(this.props.status);
        if( s === 0){
            this.setState({status:"Còn lớp"})
        }else if(s === 1){
            this.setState({status:"Hết lớp"})
        }else if (s === 2){
            this.setState({status:"Đang yêu cầu"})
        }
        let tutor = await TutorAPI.getTutorByName(this.state.nameTutor);
        this.setState({
            tutor: tutor.data
        })
        console.log(this.state);
    }
    render() {
        if(this.state.redirectManageOffer){
            return <Redirect to={{
                pathname:"/manage-class",
                state:{
                    idTutor:[this.state.tutor[0].idTutor]
                }
            }}>

            </Redirect>
        }
        return (
            <div className="classItem-con">
                <div className="img-logoBK">

                </div>
                <div className="Class-detail">
                    <div className="name-class">
                        <p className="name-class"><label className="name-class"><i className="fas fa-graduation-cap"></i></label>&nbsp;&nbsp;<b>{this.props.description}</b></p>
                    </div>
                    <div className="detail-class">
                        <p className="detail-class">{this.props.detailClass}</p>
                    </div>
                    <div className="info-class">
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-book-open"></i></label>&nbsp;&nbsp;{this.props.nameSubject}</p>
                        </div>
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-briefcase"></i></label>&nbsp;&nbsp;{this.props.typeMethod}</p>
                        </div> 
                        <div className="info-class1">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-map-marker-alt"></i></label>&nbsp;&nbsp;{this.props.city}</p>
                        </div>
                        <div className="info-class2">
                            <p className="info-class1"><label className="name-class"><i className="fas fa-calendar-check"></i></label>&nbsp;&nbsp;{this.props.numberDay} buổi/1 tuần</p>
                        </div>
                    </div>
                </div>
                <div className="class-fee">
                    <div className="value-fee"><b className="value-fee">{MyUtils.currencyFormat(this.props.fee)}đ</b></div>
                    <div className="view-detail"><p className="view-detail"  onClick={this.toggle}><u><i>Xem chi tiết lớp</i></u></p></div>
                </div>
                <div className="class-offer">
                    <div className="fee-offer">
                        <div className="status-offer"><label className="status-offer">{this.state.status}</label></div>
                    </div>
                    <div className="button-offer">
                        <button className="button-offer" onClick={this.onClickOfferTutor}>Đề nghị dạy</button>
                    </div>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn dạy lớp?"}</DialogTitle>
                    <DialogContent id="alert-dialog-description">
                        {/* <div className="tutor-offer-custom" >
                            <div className="info-profile-tutor-custom">
                                <div className="user-birthday">
                                    <div className="user-dialog-custom">
                                        <p><label className="dialog-text"><i className="fas fa-user"></i></label> &nbsp;</p>
                                        {/* {this.state.tutor.data[0].nameTutor} */}

                                    {/* </div>
                                    <div className="birthday-dialog-custom">
                                        <p><label className="dialog-text"><i className="fas fa-birthday-cake"></i></label>&nbsp;</p> */}
                                        {/* {this.state.tutor.data[0].birthdayTutor} */}

                                    {/* </div> */}
                                {/* </div> */}
                                {/* <div className="user-birthday"> */}
                                    {/* <div className="user-dialog-custom"> */}
                                        {/* <p><label className="dialog-text"><i className="fas fa-map-marker-alt"></i></label>&nbsp;</p> */}
                                        {/* {this.state.tutor.data[0].nameCity} */}

                                    {/* </div> */}
                                    {/* <div className="birthday-dialog-custom"> */}
                                        {/* <p><label className="dialog-text"><i className="fas fa-phone-square"></i></label>&nbsp;</p> */}
                                        {/* {this.state.tutor.data[0].telTutor} */}

                                    {/* </div> */}
                                {/* </div> */}
                            {/* </div> */}
                        {/* </div>  */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Không
            </Button>
                        <Button onClick={this.handleYes} color="primary" autoFocus>
                            Có
            </Button>
                    </DialogActions>
                </Dialog>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                    <ModalBody>
                        <DetailClass idClass={this.props.idClass}/>
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

export default ClassItem;