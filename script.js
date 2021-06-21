const vm = new Vue({
    el: "#vm",
    data: {
        stateIndex: 0,
        states: ["startWork", "work", "startBreak", "break"]
    },
    methods: {
        uploadState: function(){
            this.stateIndex = this.stateIndex === 3 ? 0 : this.stateIndex++
            console.log(this.stateIndex === 3 ? 0 : this.stateIndex++)
        }
    }
})

vm.$watch("stateIndex", (newV, oldV) => console.log({newV, oldV}))