import React, { Component } from 'react';
import './VoteTutor.css';
import ClassUserAPI from '../../API/ClassUserAPI';
import TutorApi from '../../API/TutorAPI';
import MyUtils from '../../utils/MyUtils';
import StarRatings from 'react-star-ratings';
import ClassInfoApi from '../../API/ClassInfoAPI';
class VoteTutor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            rating: 0
        }
    }
    changeRating = (newRating, name) => {
        this.setState({
            rating: newRating
        });
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    cancelButton = () => {
        this.props.toggle();
    }
    submitVote = async (e) => {
        e.preventDefault();
        var data = {
            idClass: this.props.idClass,
            comment: this.state.comment
        }
        var classInfo = await ClassInfoApi.editClassInfo(data).then(result => {
            if (result && result.code === "success") {
                classInfo = result.data;
            } else if (result.code === "error") {
                alert(result.message)
            }
        })
            .catch(err => console.log(err));
        var data2 = {
            idTutor: this.props.idTutor,
            star: parseFloat(MyUtils.calculateStar(this.state.rating, this.props.oldStar, this.props.timesVote)),
            times_vote: this.props.timesVote + 1
        }
        var tutor = await TutorApi.editTutor(data2).then(result2 => {
            if (result2 && result2.code === "success") {
                tutor = result2.data;
            } else if (result2.code === "error") {
                alert(result2.message)
            }
        }).catch(err => console.log(err));
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
                        <StarRatings
                            rating={this.state.rating}
                            starDimension="35px"
                            starRatedColor="yellow"
                            starHoverColor="yellow"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                        />
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