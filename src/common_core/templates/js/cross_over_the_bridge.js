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
        this.execute = true;
        this.count = 0;
        this.BoyInCentre=false;
        this.loadCount = 0;
    }
    initialize(ShellRef) {
        const self = this;
        self.ShellRef = ShellRef;
        self.audioController = self.ShellRef.shellController.audioController;
        self.audioController.loadAudios(self.ShellRef.gameView.gameData.audioArr, self.currentTime.bind(this), self.audioEnded.bind(this));
       // self.audioController.playAudio(16);
        self.buildDom();

    }

    playIntro() {
        const self = this;
        self.animationsView.animBoy.gotoAndPlay("Boy_entry");
        self.audioController.playAudio(20);
        self.audioController.unmuteAll();
        console.log('self.audioController :', self.audioController.playing(0));
        /* if(self.loadCount==0){
            self.audioController.playAudio(0);
        } */
        self.loadCount=1;    
        $("#"+this.plotIdentifier+" .topSection .letters").animate({ opacity: 1}, 0);
        $("#"+self.plotIdentifier+" .buttonsPatch").hide();
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
                if (i == 0 || i == 1) {
                    answersArray.push(elem.toUpperCase());
                } else {
                    answersArray.push(elem);
                }
            }
        }else{
            answersArray = self.ShellRef.gameView["gameData"].gameParams.answers;
        }
        const distArray = self.ShellRef.gameView["gameData"].gameParams.distractorArray;
        const btn_img = self.ShellRef.gameView["gameData"].coin_btn;
        const game_EndPopUp = self.ShellRef.gameView["gameData"].gameEndPopUp;
        let TotalArray = self.shuffle(answersArray.concat(distArray));
        htmlStr += `<div class='gamePlot' id='${self.plotIdentifier}' data_attr='${self.plotIdentifier}' >
        <!--<div class="timer"></div> -->
        <div class="buttonsPannel"></div>
         <div class='bgAnime'><canvas width='1024' height ='698'  id='${self.bgAnimeIdentifier}' data_attr='${self.bgAnimeIdentifier}'></canvas></div>
        <div class='topSection'>
        <div class="topSectionPatch"></div>
       
        ${Object.keys(TotalArray).map(function (key, index) {
          
        return "<div id='coin_" + index + "' class='letters letterOver' data_attr='letter_" + TotalArray[key] + "'><canvas id='letter_" + index + "'></canvas><img class='commonResizeAnim' src='" + btn_img + "' ><span class='commonResizeAnim'>" + TotalArray[key] + "</span><div class='highlight_ring commonResizeAnim'></div>"  + "</div>";}).join("")}
        </div>
        <div class='bottomSection'>
        ${Object.keys(answersArray).map(function () {
        return "<div class='letters_bottom'>&nbsp;</div>";}).join("")}
        </div>
        <div class='gameEndParent'><div class='gameEndPopUp'><p></p><img src='` + game_EndPopUp +`' ></div></div>
        </div>`;
        $("#"+self.ShellRef.targetContainer).append(htmlStr);
        self.ShellRef.shellController.ButtonsPannelView.initialize(this.ShellRef);
        self.events();
        self.animationsView.loadBgAnime(self.ShellRef, self.bgAnimeIdentifier, function(nameOfCurrentAnim){
            self.animationComplete(nameOfCurrentAnim);
        });
        self.animationsView.animateCoin(self.ShellRef);
        setTimeout(()=>{
            TotalArray.map(function (key, index) {
                if(key === "f"){
                    $("#coin_"+index).addClass("fcoin");
                }else if(key === "A" && key.toLowerCase()){
                    $("#coin_"+index).addClass("Acoin");
                }
            });
        }, 100);
    }

    animationComplete(nameOfCurrentAnim){
        const self = this;
        const boyAudioContainer = self.ShellRef.targetContainer + self.ShellRef.boyAudioContainer;
        const alienAudioContainer = self.ShellRef.targetContainer + self.ShellRef.alienAudioContainer;
        const alienSFX = self.ShellRef.gameView.gameData.alien_sfx;
        const boySFX = self.ShellRef.gameView.gameData.boy_sfx;
        //console.log("===>",nameOfCurrentAnim);
        if (nameOfCurrentAnim == "Boy_entry" || nameOfCurrentAnim == "only_run_cycle_3" || nameOfCurrentAnim == "End_action_start"){
            if(nameOfCurrentAnim=="Boy_entry")
                self.audioController.playAudio(0);
            self.audioController.stopAudio(9);
        }
        // if (nameOfCurrentAnim == "Boy_entry"){
        //     self.audioController.playAudio(9);
        // }
        if (nameOfCurrentAnim == "Run_cycle_began"){
            self.audioController.playAudio(9);
            console.log("===== >");
            if(self.BoyInCentre===false){
                createjs.Tween.get(self.animationsView.animBoy, { loop: false })
                .to({ x: self.animationsView.animBoy.x + 250 }, 2000, createjs.Ease.SineOut);
                self.BoyInCentre=true;
            }
            
        }
        if (nameOfCurrentAnim == "looks_in_various_directions"){
            self.animationsView.animBoy.gotoAndPlay("Run_cycle_began");
            setTimeout(()=>{
                self.animationsView.animateIntro(self.gameFinish,self.questionPending);
            },600);
        }
        if (nameOfCurrentAnim == "only_run_cycle_2"){
            if(self.gameFinish == false){
                self.animationsView.aliens.gotoAndPlay("Entry_dargon");
                self.audioController.playAudio(3);
            }
        }
        if (nameOfCurrentAnim == "Happy_reaction"){
            self.audioController.playAudio(5);
        }
        if (nameOfCurrentAnim == "After_entry_Rest_1"){
            if(self.clickInput) return;
            self.audioController.playAudio(5);
            self.scaryTimeout = setTimeout(()=>{
                self.animationsView.animBoy.gotoAndPlay("scary");
            },1000);
        }
        if (nameOfCurrentAnim == "After_entry_Rest") {
            self.audioController.playAudio(4);
        }
        if (nameOfCurrentAnim == "Entry_dargon" || nameOfCurrentAnim == "Fear_action"){
            
            $("#" + self.plotIdentifier + " .topSectionPatch").hide();
            self.clickInput = false;
            if (nameOfCurrentAnim == "Entry_dargon"){
                if (self.execute) {
                    self.execute = false;
                    self.coinInitialization(true);
                }
                if ($(".MusicOn").hasClass("active")){
                    self.audioController.volume(0, 0.2);
                }
                self.audioController.playAudio(15);
            }
        }
        if (nameOfCurrentAnim == "dragon_sad_reaction"){
            self.audioController.playAudio(8);
        }
        if (nameOfCurrentAnim == "dragon_exit" && self.correctCount != self.ShellRef.gameView.gameData.gameParams.correctWordCount){
            self.animationsView.animBoy.gotoAndPlay("Run_cycle_began");
            setTimeout(()=>{
                self.animationsView.animateIntro(self.gameFinish,self.questionPending);
            },600);
        }
        if (nameOfCurrentAnim == "sad_incorrect_answer"){
            self.audioController.playAudio(13);
        }
        if (nameOfCurrentAnim == "only_run_cycle_2" && self.gameFinish == true){
            self.audioController.stopAudio(9);
            self.audioController.playAudio(19);
            self.animationsView.animBoy.gotoAndPlay("only_run_cycle");
        }
        if (nameOfCurrentAnim == "End_action_start" && self.gameFinish == true){
            self.audioController.stopAudio(19);
            self.audioController.playAudio(21);
        }
        if (nameOfCurrentAnim == "win_run_cycle" && self.correctCount == 6){
            //console.log('ININIININININININININININI');
            self.audioController.playAudio(9);
        }

        if (nameOfCurrentAnim == "laughing_boy" && self.gameFinish == true){
            self.animationsView.callLastRun();
        }
        if (nameOfCurrentAnim == "winning_action") {
            self.coinInitialization(false);
        }
        if (nameOfCurrentAnim == "jump_start") {
            self.audioController.playAudio(11);
        }
        if (nameOfCurrentAnim == "Correct_answer_happy") {
            self.audioController.playAudio(14);
        }
        if (nameOfCurrentAnim == "after_jump" || nameOfCurrentAnim == "yes_action_1st") {
            self.audioController.playAudio(12);
        }
    }

    audioEnded(index) {
        const self = this;
        if (index == 16) {
            console.log("END END END");
            // self.audioController.volume(0,0);
            self.audioController.playAudio(16);
        }
        if (index == 0){
            if ($(".MusicOff").hasClass("active")){
                self.audioController.volume(0,0);
                self.audioController.playAudio(0);
            }else{
                console.log('audio 00000000');
                self.audioController.volume(0,0.2);
                self.audioController.playAudio(0);
            }
        }
        if (index == 2) {
            self.animationsView.aliens.gotoAndPlay("Happy_reaction");
            self.animationsView.animBoy.gotoAndPlay("sad_incorrect_answer");
            self.audioController.playAudio(10);
        }
        if (index == 10) {
            self.audioController.playAudio(6);
        }
        if (index == 17 || index == 18) {
            self.audioController.stopAll();
        }
    }
    currentTime(index, time) {}

    events() {
        const self = this;

        $("#"+this.plotIdentifier+" .topSection .letters").off("click touchend").on("click touchend", function(event){
            self.coinAnimation(this,event);
        });
        $("#"+self.ShellRef.targetContainer+" .reset").on("click",function(){
            self.resetGame();
        });
    }

    coinAnimation(getCurCoin,event){
        const self = this;
        let answersArray = self.ShellRef.gameView["gameData"].gameParams.answers;
        event.preventDefault();
        self.clickInput = true;
        clearTimeout(self.scaryTimeout);
        clearTimeout(self.fearTimeout);
        let selectedLetter = $(getCurCoin).attr("data_attr").split("letter_")[1];
        if($(getCurCoin).hasClass("hide"))
            return;
        $("#"+self.plotIdentifier+" .topSectionPatch").show();
        if(!$(getCurCoin).hasClass("hide")){
            let gameType = self.ShellRef.gameView.gameData.gameParams;

            if((gameType.singleQuestion && answersArray.indexOf(selectedLetter.toLowerCase())!=-1) || (!gameType.singleQuestion && answersArray[self.questionNum].toLowerCase()==selectedLetter.toLowerCase())){
                $(".resetPatch").show();
                self.gameCase="correct";
                self.answerInputs.push("c");
                const elSet =  document.querySelectorAll("#"+self.plotIdentifier+" .letters_bottom");
                let coinObj = self.ShellRef.gameView.gameData.moveCoin;
                let data = "";
                data = coinObj["pos"+(self.correctCount)];
                $(getCurCoin).find(".highlight_ring").css("background-color", "#4CAF50");
                $(getCurCoin).addClass('correctCoinBounce');
                self.audioController.playAudio(1);
                $(getCurCoin)[0].addEventListener("animationend", function(){
                    setTimeout(()=>{
                        $(getCurCoin).find(".commonResizeAnim").addClass("coinResizeAnim");
                    },500)
                    $(getCurCoin).stop().animate({
                        "left" : data.left,
                        "top" : data.top,
                    }, 500,
                    function(){
                        elSet[self.correctCount].innerHTML = `<div class="bottom_highlight"></div><div class="bottom_img_coin"></div><span>${selectedLetter}</span>`;
                        elSet[self.correctCount].setAttribute('data_attr', 'letter_'+selectedLetter);
                        var url = `url(src/common_core/templates/assets/images/btn_yellow.png)`;
                        $("#" + self.ShellRef.targetContainer + " [data_attr='letter_" + selectedLetter + "']").find(".bottom_img_coin").css("background", url);
                        self.correctCount++;
                        self.questionPending = (self.ShellRef.gameView["gameData"].gameParams.correctWordCount) - self.correctCount;
                        self.animationsView.animBoy.gotoAndPlay("Correct_answer_happy");
                        self.animationsView.aliens.gotoAndPlay("dragon_sad_reaction");
                        self.audioController.playAudio(7);
                        self.audioController.playAudio(11);
                        $(getCurCoin).removeClass('correctCoinBounce').addClass("hide").removeAttr('style');
                        if (self.correctCount == self.ShellRef.gameView["gameData"].gameParams.correctWordCount ){
                            self.gameFinish = true;
                            self.loadCount = 0;
                        }
                        $(".resetPatch").hide();
                        $(getCurCoin).find(".commonResizeAnim").removeClass("coinResizeAnim");
                    });
                });

                self.validate(this.ShellRef);
            }else{
                $(getCurCoin).find(".highlight_ring").css("background-color", "#ff0000");
                self.gameCase="wrong";
                self.audioController.playAudio(2);
                if (gameType.singleQuestion) {
                    $(getCurCoin).fadeTo(800, 0, function(){
                        $(getCurCoin).addClass("hide");
                    });
                }
                self.answerInputs.push("w");

            }
        }
        if (self.correctCount == self.ShellRef.gameView["gameData"].gameParams.correctWordCount ){
            self.gameFinish = true;
            self.loadCount = 0;
            $("#"+self.plotIdentifier+" .topSectionPatch").show();
        }

        if ((self.answerInputs.join(",").replace(/,/g,'').indexOf("ccc")!=-1 && self.ShellRef.gameView["gameData"].gameParams.singleQuestion)){
            self.gameFinish = true;
            self.loadCount = 0;
            $("#"+self.plotIdentifier+" .topSectionPatch").show();
        }

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
        $("#"+container).jPlayer('play');
    }


    resetGame(){
        const self = this;
        $("#"+self.plotIdentifier).stop(true,true);
        $("#"+self.plotIdentifier).clearQueue();
        $("#" + self.plotIdentifier+" .buttons").removeClass("active");
        $("#" + self.ShellRef.targetContainer + " .gameEndPopUp p").html("");
        self.audioController.stopAll();
        self.correctCount = 0;
        self.questionNum = 0;
        self.answerInputs=[];
        self.BoyInCentre = false;
        self.animationsView.skyImage.x = 0;
        self.animationsView.lastmountainsImage.x=0;
        self.animationsView.fourthmountainsImage.x=0;
        self.animationsView.thirdhmountainsImage.x=0;
        self.animationsView.middlemountainsImage.x=0;
        self.animationsView.frontmountainsImage.x=0;
        self.animationsView.bridgebackStartFront.x=0;
        self.animationsView.bridgebackStartBack.x=0;
        createjs.Tween.removeTweens(self.animationsView.animBoy);
        createjs.Tween.removeTweens(self.animationsView.bridgebackStartBack);
        createjs.Tween.removeTweens(self.animationsView.bridgebackStartFront);
        createjs.Tween.removeTweens(self.animationsView.bridgeCenterBack);
        createjs.Tween.removeTweens(self.animationsView.bridgeCenterFront);
        createjs.Tween.removeTweens(self.animationsView.bridgebackEndBack);
        createjs.Tween.removeTweens(self.animationsView.bridgebackEndFront);

        createjs.Tween.removeTweens(self.animationsView.lastmountainsImage);
        createjs.Tween.removeTweens(self.animationsView.fourthmountainsImage);
        createjs.Tween.removeTweens(self.animationsView.thirdhmountainsImage);
        createjs.Tween.removeTweens(self.animationsView.middlemountainsImage);
        createjs.Tween.removeTweens(self.animationsView.frontmountainsImage);

        const bridgeCenterBack_width = self.animationsView.animationViewData.bridgeCenterBack.widthBitmapFill;
        const bridgebackStartFront_width = self.animationsView.animationViewData.bridgebackStartFront.widthBitmapFill;
        const bridgebackStartBack_width = self.animationsView.animationViewData.bridgebackStartFront.widthBitmapFill;
        self.animationsView.bridgeCenterFront.x = self.animationsView.bridgebackStartFront.x + bridgebackStartBack_width;
        self.animationsView.bridgeCenterFront.y = self.animationsView.animationViewData.bridgeCenterFront.canvasY;

        self.animationsView.bridgeCenterBack.x = self.animationsView.bridgebackStartBack.x + bridgebackStartBack_width;
        self.animationsView.bridgeCenterBack.y = self.animationsView.animationViewData.bridgeCenterBack.canvasY;

        self.animationsView.bridgebackEndFront.x = bridgebackStartFront_width + bridgeCenterBack_width;
        self.animationsView.bridgebackEndFront.y =  self.animationsView.animationViewData.bridgebackEndFront.canvasY;

        self.animationsView.bridgebackEndBack.x = bridgebackStartBack_width + bridgeCenterBack_width;
        self.animationsView.bridgebackEndBack.y = self.animationsView.animationViewData.bridgebackEndBack.canvasY;
        self.animationsView.cloudsImage_1.x = 0;
        self.animationsView.cloudsImage_2.x = -4200;
        $("#"+self.plotIdentifier+" .letters").css("top","-83px");
        $("#"+self.plotIdentifier+" .letters").css("pointer-events","none");
        $("#"+self.plotIdentifier+" .letters").removeClass("hide");
        $("#"+self.plotIdentifier+" .coinResizeAnim").removeClass("coinResizeAnim");
        $("#"+self.ShellRef.targetContainer+" .resetPatch").show();
        $("#"+self.plotIdentifier+" .highlight_ring").css("background-color","");
        $("#"+self.plotIdentifier+" .letters_bottom").removeAttr("data_attr");
        $(".letters_bottom").empty();
        self.animationsView.animBoy.gotoAndStop("Boy_entry",0);
        self.animationsView.aliens.gotoAndStop("Entry_dargon",0);
        self.animationsView.animBoy.x = 0;
        self.animationsView.animBoy.y = 160;
        $("#"+self.plotIdentifier+" .gameEndParent").fadeOut(500);
        $("#"+self.plotIdentifier+" .buttonsPatch").hide();
        $(".buttonsPannel .audioOn,.buttonsPannel .MusicOn").show();
        $(".buttonsPannel .audioOff,.buttonsPannel .MusicOff").hide();
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
            $(".buttonsPannel .MusicOn,.buttonsPannel .MusicOff,.buttonsPannel .musicText").css("visibility","hidden");
        }
        self.count = 0;
        self.execute = true;
        self.playIntro();
        self.gameFinish = false;

    }

    coinInitialization(stages){
        const self = this;
        var el = $("#"+self.ShellRef.targetContainer+" .letters");
        self.count = '';
        var animationLength = 80;
        fadeNext(el);
        function fadeNext(collection){
            if(stages == true){
                self.count++;
                let top = self.count>=6 ? "80px": "0px";
                let animTime = self.count>=6 ? 200 : 150;
                collection.eq(0).fadeIn(animationLength).animate({
                    top:top
                }, animTime, () =>{
                    (collection=collection.slice(1)).length
                 && fadeNext(collection);
                });
                if(self.count==10){
                    setTimeout(() => {
                        $("#"+self.ShellRef.targetContainer+" .resetPatch").hide();
                        $("#"+self.plotIdentifier+" .letters").css("pointer-events","all");
                    }, 1000);
                }
            }else{
                self.count++;
                let top = self.count>=6 ? "80px": "0px";
                let animTime = self.count>=6 ? 200 : 150;
                collection.eq(0).fadeOut(animationLength).animate({
                    top:top
                }, animTime, () =>{
                    (collection=collection.slice(1)).length
                 && fadeNext(collection);
                });
                if(self.count >= 10){
                    $("#"+self.ShellRef.targetContainer+" .gameEndParent").fadeIn(500);
                    if ((self.answerInputs.join(",").replace(/,/g, '').indexOf("ccc") != -1 && self.ShellRef.gameView["gameData"].gameParams.singleQuestion)){
                        self.audioController.playAudio(17);
                        console.log("---IN------");
                        $("#" + self.ShellRef.targetContainer + " .gameEndPopUp p").html(self.ShellRef.gameView.gameData.gameParams.congratulationPopUp_1);
                    }else{
                        self.audioController.playAudio(18);
                        console.log("---ELSE------");
                        $("#" + self.ShellRef.targetContainer + " .gameEndPopUp p").html(self.ShellRef.gameView.gameData.gameParams.congratulationPopUp_2);
                    }
                    $("#"+self.ShellRef.targetContainer+" .gameEndPopUp").addClass("animateGameEndPopUp");
                    $("#"+self.ShellRef.targetContainer+" .gameEndPopUp")[0].addEventListener("animationend", function(){
                        $("#"+self.ShellRef.targetContainer+" .gameEndPopUp").addClass("GameEndPopUp");
                    });
                    //self.audioController.stopAll();
                    $("#"+self.ShellRef.targetContainer +" .buttonsPatch").show();
                }
            }
        }
    }
}
