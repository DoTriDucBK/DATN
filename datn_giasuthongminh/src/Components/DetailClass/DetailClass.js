import React, { Component } from 'react';
import './DetailClass.css';
import ClassInfoAPI from '../../API/ClassInfoAPI';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { reactLocalStorage } from "reactjs-localstorage";
import UserShareClassAPI from '../../API/UserShareClassAPI';
class DetailClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idClass: this.props.idClass,
            classInfo: [],
            status: "",
            is_button: false,
            limitStudent: 0,
            numberStudent: 0,
            open: false
        }
    }
    async componentDidMount() {

        let value = await ClassInfoAPI.getClassByIdClass(this.props.idClass);
        this.setState({
            classInfo: value.data,
            status: value.data[0].status,
            numberStudent: value.data[0].numberStudent
        });
        if (value.data[0].limitStudent) {
            this.setState({
                limitStudent: value.data[0].limitStudent
            })
        } else {
            this.setState({
                limitStudent: 3
            })
        }
        console.log(value.data[0].shareClass === "Có");
    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleYes = () => {
        var data = {
            idUser: reactLocalStorage.getObject("user.info").idUser,
            idUserOfClass: this.state.classInfo[0].idUser,
            idClass: this.state.idClass,
            notification: 0,
            is_seen: 0
        }
        console.log("1111111111  ", data);
        var classTutor = UserShareClassAPI.createClassUser(data).then(result => {
            if (result && result.code === "success") {
                classTutor = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
            .catch(err => console.log(err));
        this.setState({
            open: false,
            // redirectManageOffer: true
        });
    }
    onClickShareClass = () => {

        this.setState({

            open: true
        })

    }
    render() {
        var { classInfo, status } = this.state;
        if (classInfo.length === 0)
            return <div></div>
        return (
            <div className="detailClass-container">
                <h1 className="detailClass-title">Thông tin lớp học</h1>
                <div className="info-detail1">
                    <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-info-circle"></i> &nbsp;Thông tin lớp:</label> &nbsp;{classInfo[0].detailClass}</p>
                </div>
                <div className="info-detail">
                    <div className="info-detail-left">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-book-open"></i> &nbsp;Môn học:</label>&nbsp;{classInfo[0].nameSubject}</p>
                    </div>
                    <div className="info-detail-right">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-map-marker-alt"></i> &nbsp;Tỉnh thành:</label>&nbsp;{classInfo[0].nameCity}</p>
                    </div>
                </div>
                <div className="info-detail">
                    <div className="info-detail-left">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-chalkboard-teacher"></i> &nbsp;Hình thức:</label>&nbsp;{classInfo[0].typeMethod}</p>
                    </div>
                    <div className="info-detail-right">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-hand-holding-usd"></i> &nbsp;Học phí:</label>&nbsp;{classInfo[0].fee}</p>
                    </div>

                </div>
                <div className="info-detail">
                    <div className="info-detail-left">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-users"></i> &nbsp;Số lượng HV:</label>&nbsp;{classInfo[0].numberStudent}</p>
                    </div>
                    <div className="info-detail-right">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="far fa-clock"></i> &nbsp;Kíp học:</label>&nbsp;{classInfo[0].idPartHour}</p>
                    </div>
                </div>
                <div className="info-detail detail-city">
                    
                    <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-map-marked-alt"></i> &nbsp;Địa chỉ chi tiết:</label>&nbsp;{classInfo[0].address}</p>

                </div>
                <div className="info-detail">
                    <div className="info-detail-left">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fab fa-accusoft"></i> &nbsp;Trạng thái:</label>&nbsp;{classInfo[0].status}</p>
                    </div>
                    <div className="info-detail-right">
                        <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-toggle-off"></i> &nbsp;Học ghép:</label>&nbsp;{classInfo[0].shareClass}</p>
                    </div>

                </div>
                <div className="info-detail">

                    <p className="info-detail-value"><label className="info-detail-value"><i className="fas fa-phone-square"></i> &nbsp;Số điện thoại liên hệ:</label>&nbsp;0965143540</p>

                </div>
                {(classInfo[0].shareClass === "Có" && (this.state.status === "Đang yêu cầu" || this.state.status === "Chưa nhận lớp") && this.state.limitStudent <= 3) ? <button className="btn-hocghep" onClick={this.onClickShareClass}>Đề nghị học ghép</button> : <div></div>}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn học ghép lớp?"}</DialogTitle>
                    <DialogContent id="alert-dialog-description">
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
            </div>
        );
    }
}

export default DetailClass;