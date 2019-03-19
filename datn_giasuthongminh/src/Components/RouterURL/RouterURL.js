import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../Home/Home';
import TutorItem from '../TutorItem/TutorItem';
import PersonalPage from '../PersonalPage/PersonalPage';
import OfferClass from '../OfferClass/OfferClass';
import Login from '../Login/Login';
import ListTutor from '../ListTutor/ListTutor';
import Nav from '../Nav/Nav';
import Signin from '../Signin/Signin';
import SearchListTutor from '../SearchListTutor/SearchListTutor';
import ListClass from '../ListClass/ListClass';
import ClassItem from '../ClassItem/ClassItem';
import Footer from '../Footer/Footer';
class RouterURL extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = ({
    //         indexHome: 0
    //     })
    // }
    // handleScroll = (index) => {
    //     this.setState({ indexHome: index })

    //     // if (index === 1) {
    //     // 	scrollToComponent(this.sec1, { offset: 0, align: 'top', duration: 500 })
    //     // } else if (index === 2) {
    //     // 	scrollToComponent(this.sec2, { offset: 0, align: 'top', duration: 500 })
    //     // }
    // }
    render() {
        return (
         <div>
            
     
                <Switch>
                    <Route exact path="/" component={() => <Home indexHome={this.props.indexHome} />} />
                    <Route path="/tutor-item" component={TutorItem} />
                    <Route path="/personal-page" component={PersonalPage} />
                    <Route path="/offer-class" component={OfferClass} />
                    <Route path="/login" component={Login} />
                    <Route path="/list-tutor" component={ListTutor} />
                    <Route path="/nav" component={Nav} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/search-tutor" component={SearchListTutor} />
                    <Route path="/listclass" component={ListClass} />
                    <Route path="/classItem" component={ClassItem} />
                </Switch>
                </div>
        );
    }
}

export default RouterURL;