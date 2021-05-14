import React from 'react'


class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            breakMinute: 5,
            breakSecond: 0,
            breakMin: 5,
            sessionMinute: 25,
            sessionMin: 25,
            sessionSecond: 0,
            timeRunning: false,
            timerLable : 'Session',
        }
        this.breakIncrementClick = this.breakIncrementClick.bind(this)
        this.breakDecrementClick = this.breakDecrementClick.bind(this)
        this.sessionIncrementClick = this.sessionIncrementClick.bind(this)
        this.sessionDecrementClick = this.sessionDecrementClick.bind(this)
        this.resetClick = this.resetClick.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.intervalfunc = null;
        // this.intervalfunc2 = null;
    }


    
    breakIncrementClick() {
        if (this.state.breakMinute <= 59) {
            this.setState(state => ({
                breakMinute : state.breakMinute+1,
                breakMin : state.breakMin+1
            }))
        }
        
    }

    breakDecrementClick() {
        if (this.state.breakMinute >= 2) {
            this.setState(state => ({
                breakMinute : state.breakMinute-1,
                breakMin : state.breakMin-1
            }))
        }        
    }

    sessionIncrementClick() {
        if (this.state.sessionMinute <= 59) {
            this.setState(state => ({
                sessionMinute : state.sessionMinute+1,
                sessionMin : state.sessionMin+1
            }))
        }
    }

    sessionDecrementClick() {
        if (this.state.sessionMinute >= 2) {
            this.setState(state => ({
                sessionMinute : state.sessionMinute-1,
                sessionMin : state.sessionMin-1
            }))
        }        
    }

    resetClick() {
        document.getElementById("beep").pause()
        document.getElementById("beep").currentTime = 0
        if (this.state.timerLable == "Session"){
            clearInterval(this.intervalfunc)
        }
        else{
            clearInterval(this.intervalfunc)
        }
        // clearInterval(this.intervalfunc1)
        // clearInterval(this.intervalfunc2)
        this.setState(state =>({
            breakMinute: 5,
            breakSecond: 0,
            breakMin: 5,
            sessionMinute: 25,
            sessionMin: 25,
            sessionSecond: 0,
            timeRunning: false,
            timerLable : 'Session'
        }))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.timerLable != this.state.timerLable && ((this.state.sessionSecond == -1 && this.state.breakSecond == 0) || (this.state.sessionSecond == 0 && this.state.breakSecond == -1)) ) {
            console.log(prevState.timerLable,this.state.timerLable,this.state.sessionSecond,this.state.breakSecond)
            this.startTimer()
            document.getElementById("beep").play()
            // document.getElementById("start_stop")
        }

        if (prevState.sessionSecond!=this.state.sessionSecond && this.state.sessionMinute == -0 && this.state.sessionSecond == -1) {
            console.log(" Session minute second both zero")
            this.setState(state =>({
                timerLable : "Break",
                // sessionMinute: state.sessionMin,
                // sessionSecond: 0,
                breakMinute: state.breakMin,
                breakSecond: 0,
                timeRunning: false
            }))
            clearInterval(this.intervalfunc)
        }

        if (prevState.breakSecond!=this.state.breakSecond && this.state.breakMinute == -0 && this.state.breakSecond == -1) {
            console.log(" Break minute second both zero")
            
            this.setState(state => ({
                timerLable : "Session",
                // breakMinute: state.breakMin,
                // breakSecond: 0,
                sessionMinute: state.sessionMin,
                sessionSecond: 0,
                timeRunning: false
            }))
            
            clearInterval(this.intervalfunc)
            
        }
        
    }

    // state.x = setInterval
    // when pausing or stopping / refresh => clearinterval(state.x) 
    startTimer() {
        console.log(123)
        console.log(typeof(this.state.breakMin),this.state.breakMin)
        console.log(typeof(this.state.breakMinute),this.state.breakMinute)
        console.log(typeof(this.state.sessionMin),this.state.sessionMin)
        console.log(typeof(this.state.sessionMinute),this.state.sessionMinute)
        if (this.state.timerLable == "Session") {
            if (this.state.timeRunning===false) {
                console.log("session if")
                console.log(this.state.sessionMinute)
                var seconds = this.state.sessionSecond
                var minutes = this.state.sessionMinute
                var timer = minutes*60+seconds;
                
                this.intervalfunc = setInterval((a) => {

                    --timer
                    console.log(timer)
                    this.setState ({
                        sessionMinute : parseInt(timer/60),
                        sessionSecond : parseInt(timer%60),
                        timeRunning : true
                    })        

                    console.log(this.state.sessionMinute,this.state.sessionSecond)
                    
                    
                }, 1000);
                // this.intervalfunc1 = setInterval(this.intervalfunc1,1000)

                
            } else {
                console.log("session else")
                clearInterval(this.intervalfunc)            
                this.setState(state => ({
                    sessionMinute : state.sessionMinute,
                    sessionSecond : state.sessionSecond,
                    timeRunning : false
                }))            
            }
        }
        else {
            console.log("break",this.state.timerLable, this.state.timeRunning)
            if (this.state.timeRunning==false) {
            console.log("break if")

                var seconds = this.state.breakSecond
                var minutes = this.state.breakMinute
                var timer = minutes*60+seconds;
                console.log(timer)
                
                this.intervalfunc = setInterval((a) => {
                    --timer
                    console.log(timer)

                    this.setState ({
                        breakMinute : parseInt(timer/60),
                        breakSecond : parseInt(timer%60),
                        timeRunning : true
                    })        
                    console.log(this.state.breakMinute,this.state.breakSecond)
                    
                    
                }, 1000);

                console.log("set interval not working")
                // this.intervalfunc2 = setInterval(this.intervalfunc2,1000)

                
            } else {
                console.log("break else")
                clearInterval(this.intervalfunc)            
                this.setState(state => ({
                    breakMinute : state.breakMinute,
                    breakSecond : state.breakSecond,
                    timeRunning : false
                }))            
            }
        }
        
        

    }

    render() {
        return (
            <div className="container">
                <div className="heading">25+5 Clock</div>
                <div className="flex-container">
                    <div style={{ marginBottom: "1rem" }}>
                        <div id="break-label">Break_Length</div>
                        <div className="flex-container">
                            <button id="break-increment" className="increment" style={{ marginLeft: "-30%" }} disabled= {this.state.timeRunning} onClick={this.breakIncrementClick}>
                                <i class="fa fa-arrow-up" aria-hidden="true"></i>
                            </button>
                            <div id="break-length" style={{ marginLeft: "12%" }}>
                                {this.state.breakMin}
                            </div>
                            <button id="break-decrement" className="decrement" style={{ marginLeft: "12%" }} disabled= {this.state.timeRunning} onClick={this.breakDecrementClick}>
                                <i class="fa fa-arrow-down" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <div id="session-label" style={{ marginLeft: "30%" }}>Session_Length</div>
                        <div className="flex-container">
                            <button id="session-increment" className="increment" style={{ marginLeft: "90%" }} disabled= {this.state.timeRunning} onClick={this.sessionIncrementClick}>
                                <i class="fa fa-arrow-up" aria-hidden="true"></i>
                            </button>
                            <div id="session-length" style={{ marginLeft: "12%" }}>
                                {this.state.sessionMin}
                            </div>
                            <button id="session-decrement" className="decrement" style={{ marginLeft: "12%" }} disabled= {this.state.timeRunning} onClick={this.sessionDecrementClick}>
                                <i class="fa fa-arrow-down" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="timing">

                    <div id="timer-label" style={{ margin: "8%" }}>
                        {this.state.timerLable}
                    </div>
                    <div id="time-left" style={{ fontSize: "4rem" }} >
                        {this.state.timerLable == "Session" ? (this.state.sessionMinute<10 ?  "0"+this.state.sessionMinute : this.state.sessionMinute) :    (this.state.breakMinute<10 ? "0"+this.state.breakMinute : this.state.breakMinute)    }:{this.state.timerLable == "Session" ? (this.state.sessionSecond<10 ? "0"+this.state.sessionSecond : this.state.sessionSecond) :    (this.state.breakSecond<10 ? "0"+this.state.breakSecond : this.state.breakSecond)}
                    </div>
                </div>
                <br />
                <button id="start_stop" className="timmer" onClick={this.startTimer}>
                    <i class="fa fa-play" aria-hidden="true"></i>
                    <i class="fa fa-pause" aria-hidden="true"></i>
                </button>
                <button id="reset" className="timmer" style={{ marginLeft: "1%" }} onClick= {this.resetClick}>
                    <i class="fa fa-refresh" aria-hidden="true"></i>
                </button>
                <audio id="beep" src="https://www.soundjay.com/button/sounds/button-2.mp3"></audio>
            </div>
        )
    }
}

export default Timer