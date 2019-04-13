import React, { Component } from 'react';
import './VoteTutor.css';
import ClassUserAPI from '../../API/ClassUserAPI';
import TutorApi from '../../API/TutorAPI';
import MyUtils from '../../utils/MyUtils';
class VoteTutor extends Component {
    constructor(props){
        super(props);
        this.state = {
            numberStar: 0,
            comment:"",
            listGoldStar:[],
            listDarkStar:[]
        }
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }
    cancelButton = ()=>{
        this.props.toggle();
    }
    show_star = (number)=>{
        var starGold = number;
        if(starGold == 0){
            return <div className="list-star">
                        <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
                        <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
                        <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
                        <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
                        <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
                   </div>
        }else if(starGold == 1){
            return <div className="list-star">
                        <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
                        <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
                        <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
                        <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
                        <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
                    </div>
        } else if(starGold == 2){
            return <div className="list-star">
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
            <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
            <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
       </div>
        } else if(starGold == 3){
            return <div className="list-star">
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
            <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
       </div>
        }else if(starGold == 4){
            return <div className="list-star">
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-dark"><label className="star-gray"><i className="fas fa-star"></i></label></div>
       </div>
        }else if(starGold == 5){
            return <div className="list-star">
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
            <div className="img-star-gold"><label className="star-gold"><i className="fas fa-star"></i></label></div>
       </div>
        }
    }
    submitVote = async (e) => {
        e.preventDefault();
        var data = {
            idUser:this.props.idUser,
            idClass:this.props.idClass,
            idTutor:this.props.idTutor,
            comment:this.state.comment,
            // status:this.props.status
            idClass_User:this.props.idClass_User
        }
        var classUser = await ClassUserAPI.editClassUser(data).then(result => {
            if (result && result.code === "success") {
                classUser = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
        .catch(err => console.log(err));
        var data2 = {
            idTutor:this.props.idTutor,
            star:parseFloat(MyUtils.calculateStar(this.state.numberStar, this.props.oldStar, this.props.timesVote)),
            times_vote: this.props.timesVote + 1
        }
        var tutor = await TutorApi.editTutor(data2).then(result2 => {
            if(result2 && result2.code === "success"){
                tutor = result2.data;
            } else if(result2.code ==="error"){
                alert(result2.message)
            }
        }).catch(err=>console.log(err));
        this.props.toggle();
    }
    render() {
        return (
            <div className="vote-tutor-container">
                <div className="title-contai">
                    <div className="title-contai-left">
                        <h3 className="title-left">Đánh giá gia sư</h3>
                    </div>
                    <div className="cancel-item">
                         <label className="cancel-item" onClick={this.cancelButton}>X</label>
                    </div>
                </div>
                <div className="tutor-name">
                    <p className="tutor-name"><label className="tutor-name"><i className="fas fa-user"></i></label>&nbsp;&nbsp;Gia sư: &nbsp;{this.props.nameTutor}</p>
                </div>
                <div className="comment-tutor">
                    <div className="title-comment">
                        <p className="title-comment"> Bình luận, phản hồi về gia sư</p>
                    </div>
                    <div className="value-comment">
                        <textarea className="textarea-custom" name="comment" value={this.state.comment} onChange={this.handleInputChange} />
                    </div>
                </div>
                <div className="score-tutor">
                    <div className="title-score">
                        <p className="title-score"> Vote điểm (tối đa 5 sao) </p>
                    </div>
                    <div className="value-score">
                        <input type="number" name="numberStar" className="number-star" min="0" max="5" placeholder="0" onChange={this.handleInputChange}></input>
                        {this.show_star(this.state.numberStar)}
                    </div>
                </div>
                <div className="btn-vote">
                    <button className="btn-vote" onClick={this.submitVote}>Gửi đánh giá</button>
                </div>
            </div>
        );
    }
}

export default VoteTutor;