import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import PostNews from '../PostNews/PostNews';
import Footer from '../Footer/Footer';
import ListTutor from '../ListTutor/ListTutor';
import SigninTutor from '../SigninTutor/SigninTutor';
import Guide from '../Guide/Guide';
import scrollToComponent from 'react-scroll-to-component';
import Benifit from '../Benifit/Benifit';
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            index: 0
        })
    }
    componentDidMount(){
      var url = window.location.href;
       if(url.includes("/become-tutor")){
           this.handleScroll(2)
       }else if(url.includes("/guide")){
           this.handleScroll(1)
       }
       
    }

    handleScroll = (index) => {
        console.log("aaaaaaaa")
        if (index === 1) {
            scrollToComponent(this.sec1, { offset: 0, align: 'margin-top:100px', duration: 500 })
        } else if (index === 2) {
            scrollToComponent(this.sec2, { offset: 0, align: 'margin-top:100px', duration: 500 })
        }
    }
    render() {
    
        return (
            <div>
                {/* <Nav handleScroll ={this.handleScroll}/> */}
                <section ref={(section) => { this.sec0 = section }}>
                    <PostNews />
                </section>
                <Benifit />
                <section ref={(section) => { this.sec2 = section }}><SigninTutor /></section>
                <section ref={(section) => { this.sec1 = section }}><Guide /></section>


                <ListTutor />
                {/* <Footer /> */}

            </div>
        );
    }
}

export default Home;