import React, {Component} from 'react';
import './App.scss';
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import logo from "./images/logo.png";
import ask from "./images/ask.gif";
import askUsed from "./images/askUsed.png";
import phone from "./images/phone.gif";
import phoneUsed from "./images/phoneUsed.png";
import half from "./images/half.gif";
import halfUsed from "./images/halfUsed.png";
import person from "./images/person.png";
import person2 from "./images/person2.png";
import person3 from "./images/person3.png";
import person4 from "./images/person4.png";
import winningBoard from "./images/winningBoard.jpg";
import {MainThemePlay, CorrectAnswerPlay, WrongAnswerPlay, FinalAnswerPlay, StartThemePlay, ClosingThemePlay, FiftyFiftyThemePlay} from "./player.js";
import {questions} from "./database/questions.json";

const Home = () => {
    const StartThemeAudio = StartThemePlay();
    StartThemeAudio.play();
    MainThemePlay().stop();

    function handleOnClick() {
        return StartThemeAudio.stop();
    }

    return (
        <div className="main">
            <div className="mainBg">
                <header className="mainHeader">
                    <img src={logo} alt="" className="mainLogo"/>
                </header>
                <section>
                        <NavLink style={{textDecoration: "none"}} to="/game">
                            <button onClick={handleOnClick} className="playBtn">Graj</button>
                        </NavLink>
                </section>
                <footer> </footer>
            </div>
        </div>
    )
};

class Game extends Component {
    state = {
        data: false,
        qNumber: 0,
        disable: false,
        wasUsed1: false,
        wasUsed2: false,
        wasUsed3: false,
        counter: 30,
        fiftyImage: half,
        phoneImage: phone,
        askImage: ask,
        friendImageTab: [person, person2, person3, person4],
        friendImage: "",
        hideAnswers: "",
        showBar: "",
        friendsAnswer: "",
        showAudience: "",
        percentageA: 0,
        percentageB: 0,
        percentageC: 0,
        percentageD: 0,
        currentQuestionData: null,
        showCounter: true


    };



    loadData() {
        this.setState({ data: questions, loading: false }, this.chooseCurrentQuestion);
        // this.setState({loading: true}, () => {
        //     fetch(`http://localhost:3001/questions`)
        //         .then(bigObj => bigObj.json())
        //         .then(dataFromJson => this.setState({ data: dataFromJson, loading: false }, this.chooseCurrentQuestion))
        //         .catch(error => console.log(error));
        // });

    }

    chooseCurrentQuestion = () => {
        const currentQuestionsSet = this.state.data[this.state.qNumber];
        this.setState({
            currentQuestionData: currentQuestionsSet[Math.floor(Math.random()*currentQuestionsSet.length)]
        });
    };


    handleOnClick = (e) => {
        const {data} = this.state;
        const FinalAnswerAudio = FinalAnswerPlay();
        const CorrectAnswerAudio = CorrectAnswerPlay();
        const WrongAnswerAudio = WrongAnswerPlay();


       { this.setState({disable: true});
           MainThemePlay().stop();
           FinalAnswerAudio.play();

           if (e.target.name === this.state.currentQuestionData.correctAnswer) {

            console.log("OK");
           e.target.classList.add("selected");
           e.persist(this.timeoutId = setTimeout(() => {
               e.target.classList.remove("selected");
               e.target.classList.add("correct");
               MainThemePlay().stop();
               FinalAnswerAudio.stop();
               CorrectAnswerAudio.play();
           }, 3500));
           e.persist(this.timeoutId = setTimeout(() => {
              this.setState(prevState => {
                  if (prevState.qNumber + 1 === 12) {
                     return this.props.history.push("/result/1 000 000zł");
                  }

                  return {qNumber: prevState.qNumber + 1, counter: 30, showCounter: false};
              }, () => {
                  this.chooseCurrentQuestion();
                  this.setState({ showCounter: true });
              });
               e.target.classList.remove("correct");
               this.setState({disable: false});
               this.setState({hideAnswers: ""});
               this.setState({showBar: ""});
               this.setState({showAudience: ""});
               CorrectAnswerAudio.stop();
               // this.setState({counter: 30});



           }, 7200));





        } else {
           console.log("jesteś frajerem");
           e.target.classList.add("selected");
           e.persist(this.timeoutId = setTimeout(() => {
               e.target.classList.remove("selected");
               e.target.classList.add("wrong");
               MainThemePlay().stop();
               FinalAnswerAudio.stop();
               WrongAnswerAudio.play();

               const buttons = document.querySelectorAll(".answerBox");

               buttons.forEach(el => {
                   if (el.name === this.state.currentQuestionData.correctAnswer) {
                       el.classList.add("correct")
                   }
               })


           }, 3500));
           this.timeoutId = setTimeout(() => {
               this.setState({disable: false});
               const amounts = ["0zł", "0zł", "1 000zł", "1 000zł", "1 000zł", "1 000zł", "1 000zł", "40 000zł", "40 000zł", "40 000zł", "40 000zł", "40 000zł"];
               this.props.history.push(`/result/${amounts[this.state.qNumber]}`)
               WrongAnswerAudio.stop();
               MainThemePlay().stop();

           }, 7200)

       }

       }

    };


    fiftyFiftyClick = () => {
        FiftyFiftyThemePlay().play();
        this.setState({wasUsed1: true});
        this.setState({fiftyImage: halfUsed});

        const {correctAnswer, answers} = this.state.currentQuestionData;
        const answerCopy = {...answers};

        delete answerCopy[correctAnswer];
        const onlyBadAnswers = Object.keys(answerCopy);
        onlyBadAnswers.splice(Math.floor(Math.random() * onlyBadAnswers.length), 1);
        console.log(onlyBadAnswers);
        this.setState({hideAnswers: onlyBadAnswers});

    };


    componentDidMount() {
        this.loadData();
        this.setState({friendImage: this.state.friendImageTab[Math.floor(Math.random()* this.state.friendImageTab.length)]})
        this.Timer();
    }

    callFriendClick = () => {
        this.setState({showBar: "open"});
        this.setState({showAudience: ""});
        this.setState({phoneImage: phoneUsed});
        this.setState({wasUsed2: true});

        const {correctAnswer, answers} = this.state.currentQuestionData;
        const answerCopy = {...answers};

        delete answerCopy[correctAnswer];

        if (this.state.hideAnswers !== "") {
            this.state.hideAnswers.forEach(function (el) {
                delete answerCopy[el];
            });
        }

        const onlyBadAnswers = Object.keys(answerCopy);

        const foo = Math.random() * 100;
        if (foo < 80) // 0-79
            this.setState({friendsAnswer: this.state.currentQuestionData.correctAnswer});
        else // 80-99
            this.setState({friendsAnswer: onlyBadAnswers[Math.floor(Math.random() * onlyBadAnswers.length)]});

    };

    askAudienceClick = () => {
        this.setState({showAudience: "open"});
        this.setState({showBar: ""});
        this.setState({askImage: askUsed});
        this.setState({wasUsed3: true});

        // const foo = Math.random() * 100;


        if (this.state.currentQuestionData.correctAnswer === "A") {

            this.setState({percentageA: Math.floor(Math.random() * (51)) + 50});
            this.setState({percentageB: Math.floor(Math.random() * (51))});
            this.setState({percentageC: Math.floor(Math.random() * (51))});
            this.setState({percentageD: Math.floor(Math.random() * (51))});
            if (this.state.qNumber > 5) {
                this.setState({percentageA: Math.floor(Math.random() * (41)) + 50});
            }


        } else if (this.state.currentQuestionData.correctAnswer === "B") {

            this.setState({percentageB: Math.floor(Math.random() * (51)) + 50});
            this.setState({percentageA: Math.floor(Math.random() * 51)});
            this.setState({percentageC: Math.floor(Math.random() * 51)});
            this.setState({percentageD: Math.floor(Math.random() * 51)});
            if (this.state.qNumber > 5) {
                this.setState({percentageB: Math.floor(Math.random() * (41)) + 50});
            }

        } else if (this.state.currentQuestionData.correctAnswer === "C") {

            this.setState({percentageC: Math.floor(Math.random() * (51)) + 50});
            this.setState({percentageB: Math.floor(Math.random() * 51)});
            this.setState({percentageA: Math.floor(Math.random() * 51)});
            this.setState({percentageD: Math.floor(Math.random() * 51)});
            if (this.state.qNumber > 5) {
                this.setState({percentageC: Math.floor(Math.random() * (41)) + 50});
            }

        } else if (this.state.currentQuestionData.correctAnswer === "D") {

            this.setState({percentageD: Math.floor(Math.random() * (51)) + 50});
            this.setState({percentageB: Math.floor(Math.random() * 51)});
            this.setState({percentageC: Math.floor(Math.random() * 51)});
            this.setState({percentageA: Math.floor(Math.random() * 51)});
            if (this.state.qNumber > 5) {
                this.setState({percentageD: Math.floor(Math.random() * (41)) + 50});
            }

        }

        if (this.state.hideAnswers !== "") {
            if (this.state.hideAnswers.includes("A")) {
                this.setState({percentageA: 0});
            }
            if (this.state.hideAnswers.includes("B")) {
                this.setState({percentageB: 0});
            }
            if (this.state.hideAnswers.includes("C")) {
                this.setState({percentageC: 0});
            }
            if (this.state.hideAnswers.includes("D")) {
                this.setState({percentageD: 0});
            }
        }


    };

    Timer = () => {
            setInterval(() => {
                this.setState((prevState) => {
                    return {counter: prevState.counter - 1}
                }, () => {
                    if (this.state.counter < 0) {
                        const amounts = ["0zł", "0zł", "1 000zł", "1 000zł", "1 000zł", "1 000zł", "1 000zł", "40 000zł", "40 000zł", "40 000zł", "40 000zł", "40 000zł"];
                        this.props.history.push(`/result/${amounts[this.state.qNumber]}`)
                    }
                });
            }, 1000);

    };



    render() {
        MainThemePlay().play();
        ClosingThemePlay().stop();

        if (!this.state.currentQuestionData) {
            return null;
        }

        const { data } = this.state;
        if (!data) return null;
        return (
            <div className="game">

                <section className="lifelines">
                    <button style={{backgroundColor: "transparent", border: "none", outline: "none"}} onClick={this.askAudienceClick} disabled={this.state.wasUsed3}><img src={this.state.askImage}alt="" className="lifelineIco"/></button>
                    <button style={{backgroundColor: "transparent", border: "none", outline: "none"}} onClick={this.callFriendClick} disabled={this.state.wasUsed2}><img src={this.state.phoneImage} alt="" className="lifelineIco"/></button>
                    <button style={{backgroundColor: "transparent", border: "none", outline: "none"}} onClick={this.fiftyFiftyClick} disabled={this.state.wasUsed1}><img src={this.state.fiftyImage} alt="" className="lifelineIco"/></button>
                    <div className={["friendBubble", this.state.showBar].join(" ")}><img src={this.state.friendImage} alt="" className="friendIco"/><p>Wydaje mi się, że poprawna odpowiedź to...</p><p className="frAns">{this.state.friendsAnswer}</p></div>
                    <div className={["publicBubble", this.state.showAudience].join(" ")}>
                        <div className="container">
                            <div className="barContainer" style={{marginLeft: "0"}}>
                                <div className="bar" style={{height: this.state.percentageA + "%"}}>
                                </div>
                            </div>
                            <div className="barContainer">
                                <div className="bar" style={{height: this.state.percentageB + "%"}}>
                                </div>
                            </div>
                            <div className="barContainer">
                                <div className="bar" style={{height: this.state.percentageC + "%"}}>
                                </div>
                            </div>
                            <div className="barContainer">
                                <div className="bar" style={{height: this.state.percentageD + "%"}}>
                                </div>
                            </div>
                        </div>
                        <div className="publicAnswers">
                            <div>A</div>
                            <div>B</div>
                            <div>C</div>
                            <div>D</div>
                        </div>
                    </div>
                </section>
                <section className="gameSection">
                    <div className="logoTimer">
                        <div className="gameHeader">
                            <img src={logo} alt="" className="gameLogo"/>
                        </div>
                        <div className="timer">
                            { this.state.showCounter ? <div className="circle center">
                                <div className="count">{this.state.counter}</div>
                                <div className="l-half"> </div>
                                <div className="r-half"> </div>
                            </div> : null }
                        </div>
                    </div>
                    <div className="questionBox">
                        {this.state.currentQuestionData.question}
                    </div>
                    <div className="answerBoxes">


                        <button className="answerBox" name="A" onClick={this.handleOnClick} disabled={this.state.disable}> A. { this.state.hideAnswers.includes("A") ? "" : this.state.currentQuestionData.answers.A}  </button>
                        <button className="answerBox" name="B" onClick={this.handleOnClick} disabled={this.state.disable}> B. { this.state.hideAnswers.includes("B") ? "" : this.state.currentQuestionData.answers.B}</button>
                        <button className="answerBox" name="C" onClick={this.handleOnClick} disabled={this.state.disable}> C. { this.state.hideAnswers.includes("C") ? "" : this.state.currentQuestionData.answers.C}</button>
                        <button className="answerBox" name="D" onClick={this.handleOnClick} disabled={this.state.disable}> D. { this.state.hideAnswers.includes("D") ? "" : this.state.currentQuestionData.answers.D}</button>
                    </div>
                </section>
                <section className="progressSection">

                    <ul className="progressBar">
                        <li className={this.state.qNumber >= 12 && "successBar"} style={{color: "gold"}}>1 000 000zł</li>
                        <li className={this.state.qNumber >= 11 && "successBar"}>500 000zł</li>
                        <li className={this.state.qNumber >= 10 && "successBar"}>250 000zł</li>
                        <li className={this.state.qNumber >= 9 && "successBar"}>125 000zł</li>
                        <li className={this.state.qNumber >= 8 && "successBar"}>75 000zł</li>
                        <li className={this.state.qNumber >= 7 && "successBar"} style={{color: "gold"}}>40 000zł</li>
                        <li className={this.state.qNumber >= 6 && "successBar"}>20 000zł</li>
                        <li className={this.state.qNumber >= 5 && "successBar"}>10 000zł</li>
                        <li className={this.state.qNumber >= 4 && "successBar"}>5 000zł</li>
                        <li className={this.state.qNumber >= 3 && "successBar"}>2 000zł</li>
                        <li className={this.state.qNumber >= 2 && "successBar"} style={{color: "gold"}}>1 000zł</li>
                        <li className={this.state.qNumber >= 1 && "successBar"}>500zł</li>
                    </ul>
                </section>
                <footer> </footer>

            </div>
        )
    }
}

const Result = (props) => {
    setTimeout(function () {
        ClosingThemePlay().play();
        ClosingThemePlay().fade(0.0, 0.5, 12000);
    },500);


    return (
        <div className="endGame">

            <div className="prizeBoard">
                <img className="endImage" src={winningBoard} alt=""/>
                <div className="prizeBar">
                    <div className="prize">{props.match.params.amount}</div>
                </div>
                <div className="endBar">
                    <NavLink style={{textDecoration: "none", display: "flex", justifyContent: "center"}} to="/game">
                         <button className="nextGameBtn">Zagraj ponownie</button>
                    </NavLink>
                </div>

            </div>



        </div>
    )

};

class App extends Component {

    render() {
    return (
        <Router>
          <>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/game" component={Game}/>
              <Route path="/result/:amount" component={Result}/>
            </Switch>
          </>
        </Router>
    )
  }
}

export default App;

