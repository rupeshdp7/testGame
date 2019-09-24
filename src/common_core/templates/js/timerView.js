import $ from 'jquery';
import "latest-createjs";
export class TimerView {
    constructor() {
        this.htmlStr="";
        this.ShellRef = "";
        this.interval;
    }
    initialize(ShellRef) {
        this.ShellRef = ShellRef;
        this.buildDom(ShellRef);
    }
    buildDom(){
        const self = this;
        const attrName = self.ShellRef.targetContainer + "_timer";
        this.htmlStr += `<div class='timer' id='${attrName}'>${self.ShellRef.gameView["gameData"].gameParams.timer}</div>`;
        $("#"+self.ShellRef.targetContainer +" .timer").html(this.htmlStr);
        this.countTime(self.ShellRef.gameView["gameData"].gameParams.timer);
    }
    countTime(timer){
        const self = this;
        var  start = (parseInt(timer.split(":")[0]*60*60) + parseInt(timer.split(":")[1] * 60)+parseInt(timer.split(":")[2]))*1000;
        var interval=setInterval(function(){
            start = (start-1000);
            var hours = Math.floor((start % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((start % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((start % (1000 * 60)) / 1000);
            let timeVal = hours+":"+minutes+":"+seconds;
            $("#"+self.ShellRef.targetContainer +" .timer").html(timeVal);
            if(start==0){
                clearInterval(interval);
            }
        },1000);
    }
}