const vm = new Vue({
    el: "#vm",
    data: {
        stateIndex: undefined,
        states: ["work", "break"],
        time: 0,
        pomodoroCounter: 0,
        workTime: 1500,
        breakTime: 300,
        soundState: true,
        alarm: document.getElementById("alarm")
    },
    methods: {
        
        uploadState: function(){
            if (this.stateIndex === undefined){
                this.stateIndex = 0
            }
            else {
                this.stateIndex = this.stateIndex  === this.states.length - 1 ? 0 : this.stateIndex + 1
            }
            
            this.handleChangeState(this.states[this.stateIndex])
        },
        
        startTime: function(seconds) {
            this.time = seconds
            let work = setInterval(() => {
                this.time--
                document.title = `${ this.stateIndex === 0 ? "Work" : "Break" } ${ this.minuteTime }`
                if (this.time <= 0){
                    clearInterval(work)
                    this.time = 0
                    if (this.soundState) this.alarm.play()
                    document.title = `${ this.stateIndex === 0 ? "Work" : "Break" } ends`
                }
            }, 1000)
            
        },
        
        handleChangeState: function(state) {
            if (state === "work"){
                this.startTime(this.workTime)
            }
            else if (state === "break") {
                this.startTime(this.breakTime)
                this.pomodoroCounter++
            }
        },
        
        changeSound: function (){
            this.soundState = !this.soundState
        }
    },
    
    computed: {
        minuteTime: function() {
            const sec = `${this.time % 60 ? this.time % 60 : '00'}`.length === 2 ? `${this.time % 60 ? this.time % 60 : '00'}` : "0" + `${this.time % 60 ? this.time % 60 : '00'}`
            const min = `${Math.floor(this.time / 60)}`.length === 2 ? `${Math.floor(this.time / 60)}` : "0" + `${Math.floor(this.time / 60)}`
            return  min + ":" + sec
        },
        backColor: function() {
            return ["work"].includes(this.states[this.stateIndex]) ?  "#7fb06913" : "#62b6cb10"
        },
        divWidth: function() {
            if (this.stateIndex === undefined) {
                return "0%"
            }
            
            else {
                const timeState = this.stateIndex === 1 ? this.breakTime : this.workTime
                return`${ (100 - (this.time * 100) / timeState) }%`
            }
        }
    }
})



