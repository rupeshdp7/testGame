import $ from 'jquery';
import "latest-createjs";
import "../css/cross_over_the_bridge.scss";
import {animationView} from "../js/animationView";
export class cross_over_the_bridge {
    constructor() {
        this.correctCount = 0;
        this.questionNum = 0;
        this.gameCase = '';
        this.animationsView = new animationView();
        this.answerInputs=[];
        this.plotIdentifier="";
        this.boyIdentifier="";
        this.gameFinish = false;
        this.questionPending = "";
        this.clickInput = false;
        this.ShellRef = "";
        this.bgAnimeIdentifier="";
    }
    initialize(ShellRef) {
        const self = this;
        self.ShellRef = ShellRef;
        self.ShellRef.shellController["bgAudioController"].bindGameAudioEvent(self.ShellRef.bgAudioContainer);
        self.ShellRef.shellController["bgAudioController"].setVolume("game_1_BgAudio", 0.1);
        self.buildDom();
    }

    playIntro() {
        const self = this;
        self.animationsView.animBoy.gotoAndPlay("entry_loop_1");
        // self.animationsView.aliens.gotoAndPlay("Entry_dargon");
        $("#"+this.plotIdentifier+" .topSection .letters").animate({ opacity: 1}, 0);

    }
    buildDom() {
        const self = this;
        let htmlStr = "";
        self.plotIdentifier = self.ShellRef.targetContainer + "_gameView";
        self.boyIdentifier = self.ShellRef.targetContainer + "_spriteCanvas";
        self.bgAnimeIdentifier = self.ShellRef.targetContainer + "_bgAnime";
        let answersArray=[];
        let gameParams = self.ShellRef.gameView.gameData.gameParams;
        if(gameParams.singleQuestion){
            let elem = self.ShellRef.gameView["gameData"].gameParams.answers[0];
            for(let i=0,j=gameParams.correctWordCount;i<j;i++){
                /* if(Math.random()<0.5)
                    answersArray.push(elem.toUpperCase());
                else */
                answersArray.push(elem);
            }
        }else{
            answersArray = self.ShellRef.gameView["gameData"].gameParams.answers;
        }
        const distArray = self.ShellRef.gameView["gameData"].gameParams.distractorArray;
        const btn_img = self.ShellRef.gameView["gameData"].coin_btn;
        let TotalArray = self.shuffle(answersArray.concat(distArray));/* .map(function(elem){
            if (self.ShellRef.targetContainer == "game_1" && Math.random() < 0.5)
                return elem;
            else
                return elem;
        }); */
        htmlStr += `<div class='gamePlot' id='${self.plotIdentifier}' data_attr='${self.plotIdentifier}' >
        <!--<div class="timer"></div> -->
        <div class="buttonsPannel"></div>
         <div class='bgAnime'><canvas width='1024' height ='698'  id='${self.bgAnimeIdentifier}' data_attr='${self.bgAnimeIdentifier}'></canvas></div>
         <div class='boyAnim'> <canvas width='1024' height ='698'  id='${self.boyIdentifier}' data_attr='${self.boyIdentifier}'></canvas></div>
        <div class='topSection'>
        <div class="topSectionPatch"></div>
        ${Object.keys(TotalArray).map(function (key, index) {
        return "<div id='coin_" + index + "' class='letters letterOver' data_attr='letter_" + TotalArray[key] + "'><canvas id='letter_" + index + "'></canvas><img src='" + btn_img + "' ><span>" + TotalArray[key] + "</span><div class='highlight_ring'></div>"  + "</div>";}).join("")}
        </div>
        <div class='bottomSection'>
        ${Object.keys(answersArray).map(function () {
        return "<div class='letters_bottom'>&nbsp;</div>";}).join("")}
        </div>
        </div>`;
        $("#"+self.ShellRef.targetContainer).append(htmlStr);
        self.ShellRef.shellController.ButtonsPannelView.initialize(this.ShellRef);
        self.events();
        self.animationsView.loadBgAnime(self.ShellRef, self.bgAnimeIdentifier, function(nameOfCurrentAnim){
            self.animationComplete(nameOfCurrentAnim);
        });
        self.animationsView.animateCoin(self.ShellRef);


    }

    animationComplete(nameOfCurrentAnim){
        const self = this;
        const audioLoadContainer = self.ShellRef.targetContainer + self.ShellRef.audioContainer;
        const alienSFX = self.ShellRef.gameView.gameData.alien_sfx;
        if (nameOfCurrentAnim == "entry_loop_2" || nameOfCurrentAnim == "only_run_cycle_2"){
            if(self.gameFinish == false){
                self.animationsView.aliens.gotoAndPlay("Entry_dargon");
                self.ShellRef.shellController["audioController"].loadAudioPath(audioLoadContainer, alienSFX.entry, self.ShellRef.audioContainer);
            }
        }
        if (nameOfCurrentAnim == "After_entry_Rest"){
            self.ShellRef.shellController["audioController"].loadAudioPath(audioLoadContainer, alienSFX.breath, self.ShellRef.audioContainer);
        }
        if (nameOfCurrentAnim == "After_entry_Rest_1") { //|| nameOfCurrentAnim == "After_entry_Rest_4"
            if(self.clickInput) return;
            self.scaryTimeout = setTimeout(()=>{
                self.animationsView.animBoy.gotoAndPlay("scary");
                self.ShellRef.shellController["audioController"].loadAudioPath(audioLoadContainer, alienSFX.single_fire_sfx, self.ShellRef.audioContainer);
            },1000);
        }
        if (nameOfCurrentAnim == "Entry_dargon" || nameOfCurrentAnim == "Fear_action"){
            $("#" + self.plotIdentifier + " .topSectionPatch").hide();
            self.clickInput = false;
            if (nameOfCurrentAnim == "Entry_dargon"){
                const basePath = "src/common_core/templates/assets/audio/";
                
                self.ShellRef.shellController["audioController"].loadAudioPath(self.ShellRef.targetContainer+self.ShellRef.audioContainer, basePath + self.ShellRef.gameView["gameData"].gameParams.question[self.questionNum] + ".mp3", self.ShellRef.audioContainer);
            }
        }
        if (nameOfCurrentAnim == "sad_reaction_and_exit" && self.correctCount != self.ShellRef.gameView.gameData.gameParams.correctWordCount){
            self.animationsView.animBoy.gotoAndPlay("Run_cycle_began");
            setTimeout(()=>{
                self.animationsView.animateIntro(self.gameFinish,self.questionPending);
            },600);
        }
        if (nameOfCurrentAnim == "sad_incorrect_answer"){
            self.animationsView.aliens.gotoAndPlay("angry_reaction");
            self.fearTimeout = setTimeout(() => {
                self.animationsView.animBoy.gotoAndPlay("Fear_action");
            },300);
        }
        if (nameOfCurrentAnim == "only_run_cycle_2" && self.gameFinish == true){
            self.animationsView.animBoy.gotoAndPlay("only_run_cycle");
        }
        //console.log(self.gameFinish,'self.gameFinish')
        if (nameOfCurrentAnim == "Correct_answer_happy" && self.gameFinish == true){
            self.animationsView.callLastRun();
        }
       
    }

    events() {
        const self = this;
        let answersArray = self.ShellRef.gameView["gameData"].gameParams.answers;
        $("#"+this.plotIdentifier+" .topSection .letters").off("click touchend").on("click touchend", function(event){
            event.preventDefault();
            self.clickInput = true;
            clearTimeout(self.scaryTimeout);
            clearTimeout(self.fearTimeout);
            let selectedLetter = $(this).attr("data_attr").split("letter_")[1];
            if($(this).hasClass("hide"))
                return;
            $("#"+self.plotIdentifier+" .topSectionPatch").show();
            if(!$(this).hasClass("hide")){
                let gameType = self.ShellRef.gameView.gameData.gameParams;

                if((gameType.singleQuestion && answersArray.indexOf(selectedLetter.toLowerCase())!=-1) || (!gameType.singleQuestion && answersArray[self.questionNum].toLowerCase()==selectedLetter.toLowerCase())){
                    self.gameCase="correct";
                    self.answerInputs.push("c");
                    const elSet =  document.querySelectorAll("#"+self.plotIdentifier+" .letters_bottom");
                    let coinObj = self.ShellRef.gameView.gameData.moveCoin;
                    let data = "";
                    data = coinObj["pos"+(self.correctCount)];
                    $(this).find(".highlight_ring").css("background-color", "#4CAF50");
                    $(this).addClass('correctCoin').animate({
                        "left" : data.left,
                        "top" : data.top,
                    }, 700,
                    function(){
                        elSet[self.correctCount].innerHTML = `<div class="bottom_highlight"></div><div class="bottom_img_coin"></div><span>${selectedLetter}</span>`;
                        elSet[self.correctCount].setAttribute('data_attr', 'letter_'+selectedLetter);
                        var url = `url(src/common_core/templates/assets/images/btn_yellow.png)`;
                        $("#" + self.ShellRef.targetContainer + " [data_attr='letter_" + selectedLetter + "']").find(".bottom_img_coin").css("background", url);
                        self.correctCount++;
                        self.questionPending = (self.ShellRef.gameView["gameData"].gameParams.correctWordCount) - self.correctCount;
                        self.animationsView.animBoy.gotoAndPlay("Correct_answer_happy");
                        self.animationsView.aliens.gotoAndPlay("sad_reaction_and_exit");
                        self.ShellRef.shellController["audioController"].loadAudioPath(self.ShellRef.targetContainer+self.ShellRef.audioContainer, self.ShellRef.gameView["gameData"].correctAudio,self.ShellRef.audioContainer);
                        $(this).removeClass('correctCoin').addClass("hide").removeAttr('style');
                        // alert(self.correctCount+"==="+self.ShellRef.gameView["gameData"].gameParams.correctWordCount)
                        if (self.correctCount == self.ShellRef.gameView["gameData"].gameParams.correctWordCount ){
                            self.gameFinish = true;
                        }
                    });
                    self.validate(this.ShellRef);
                }else{
                    $(this).find(".highlight_ring").css("background-color", "#ff0000");
                    self.gameCase="wrong";
                    self.animationsView.animBoy.gotoAndPlay("sad_incorrect_answer");
                    self.animationsView.aliens.gotoAndPlay("Happy_reaction");
                    self.ShellRef.shellController["audioController"].loadAudioPath(self.ShellRef.targetContainer+self.ShellRef.audioContainer, self.ShellRef.gameView["gameData"].wrongAudio,self.ShellRef.audioContainer);
                    if (gameType.singleQuestion) {
                        // $(this).addClass("hide");
                        $(this).fadeTo(800, 0);
                    }
                    self.answerInputs.push("w");

                }
            }
            if (self.correctCount == self.ShellRef.gameView["gameData"].gameParams.correctWordCount ){
                self.gameFinish = true;
                $("#"+self.plotIdentifier+" .topSectionPatch").show();
            }

            if ((self.answerInputs.join(",").replace(/,/g,'').indexOf("ccc")!=-1 && self.ShellRef.gameView["gameData"].gameParams.singleQuestion)){
                self.gameFinish = true;
                $("#"+self.plotIdentifier+" .topSectionPatch").show();
            }


        });
        $("#"+self.ShellRef.targetContainer+" .reset").on("click",function(){
            self.resetGame();
        });

    }


    validate(){
        const self = this;
        let gameType = self.ShellRef.gameView.gameData.gameParams;
        if(gameType.singleQuestion === true){
            self.questionNum=0;
        }else{
            self.questionNum++;
        }

    }
    shuffle(array) {
        let tempArray = array.slice();
        var currentIndex = tempArray.length,
            temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = tempArray[currentIndex];
            tempArray[currentIndex] = tempArray[randomIndex];
            tempArray[randomIndex] = temporaryValue;
        }
        return tempArray;
    }
    reset(){
        let targetContainer = this.ShellRef.targetContainer;
        let mainDiv = this.ShellRef.attributeDiv.mainDiv;
        this.initialize(targetContainer, mainDiv);
    }

    bgAudioEvent(container){
        $("#"+this.ShellRef.targetContainer+container).jPlayer('play');
    }
  

    resetGame(){
        const self = this;
        self.correctCount = 0;
        self.questionNum = 0;
        self.answerInputs=[];
        // self.bgAnimeStage = '';
        // self.bgAnimeWidth = "";
        // self.bgAnimeHeight = "";
        // self.bgAnimeloader = "";
        self.animationsView.skyImage.x = 0;
        self.animationsView.lastmountainsImage.x=0;
        self.animationsView.fourthmountainsImage.x=0;
        self.animationsView.thirdhmountainsImage.x=0;
        self.animationsView.middlemountainsImage.x=0;
        self.animationsView.frontmountainsImage.x=0;
        self.animationsView.bridgebackStartFront.x=0;
        self.animationsView.bridgebackStartBack.x=0;
        self.animationsView.bridgeCenterBack.x=0;
        self.animationsView.bridgeCenterFront.x=0;
        self.animationsView.cloudsImage_1.x = 0;
        self.animationsView.cloudsImage_2.x = -4200;
        $("#"+self.plotIdentifier+" .buttonsPannel").remove();
        $("#"+self.plotIdentifier+" .letters").removeClass("hide");
        $("#"+self.plotIdentifier+" .letters_bottom").removeAttr("data_attr");
        $("#"+self.plotIdentifier+" .gamePlot").remove();
        
        self.ShellRef.shellController["bgAudioController"].loadAudioPath(self.ShellRef,self.ShellRef.gameView["gameData"].bgAudio, self.ShellRef.bgAudioContainer);
        self.initialize(self.ShellRef);
        $("#"+self.plotIdentifier+" .gamePlot").show();
    }
}
