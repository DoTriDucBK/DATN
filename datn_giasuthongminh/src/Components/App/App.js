import React, { Component } from 'react';
import './App.css';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import ListClass from '../ListClass/ListClass';
import { BrowserRouter as Router, Route} from "react-router-dom";
import TutorItem from '../TutorItem/TutorItem';
import PersonalPage from '../PersonalPage/PersonalPage';
import OfferClass from '../OfferClass/OfferClass';
import Login from '../Login/Login';
import ListTutor from '../ListTutor/ListTutor';
import Signin from '../Signin/Signin';
import SearchListTutor from '../SearchListTutor/SearchListTutor';
import ClassItem from '../ClassItem/ClassItem';
import InfoMess from '../Nav/InfoMess';
import ManageClassOffer from '../ManagePersonalInfo/ManageClassOffer';
import ClassElement from '../ClassItem/ClassElement';
import ManageInvitation from '../ManagePersonalInfo/ManageInvitation';
import TutorProfile from '../TutorProfile/TutorProfile';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = ({
			indexHome: 0
		})
	}
	render() {
		return (
			<Router>
				<div className="App">
					<Nav />
					<main>
						<Route exact path="/" component={() => <Home />} />
						<Route path="/become-tutor" component={Home} />
						<Route path="/guide" component={Home} />
						<Route path="/tutor-item" component={TutorItem} />
						<Route path="/personal-page" component={PersonalPage} />
						<Route path="/offer-class" component={OfferClass} />
						<Route path="/login" component={Login} />
						<Route path="/list-tutor" component={ListTutor} />
						<Route path="/nav" component={Nav} />
						<Route path="/signin" component={Signin} />
						<Route path="/searchTutor/:textSearch" component={SearchListTutor} />
						<Route path="/listclass" component={ListClass} />
						<Route path="/classItem" component={ClassItem} />
						<Route path="/info-mess" component={InfoMess} />
						<Route path="/manage-class" component={ManageClassOffer} />
						<Route path="/class-element" component={ClassElement}/>
						<Route path="/manage-invitation" component={ManageInvitation}/>
						<Route path="/tutor-profile" component={TutorProfile}/>
					</main>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
