import $ from 'jquery';
import "latest-createjs";

export class ButtonsPannelView {
    constructor() {
        this.htmlStr="";
        this.ShellRef = "";
    }
    initialize(ShellRef) {
        this.htmlStr="";
        this.ShellRef = ShellRef;
        this.buildDom();
    }
    buildDom(){
        const self = this;
        var btns = self.ShellRef.gameView.gameData.buttons;
        var key ;
        for(key in btns){
            if (btns.hasOwnProperty(key)) {
                self.htmlStr+=`<div class="${key} buttons"></div>`;
            }
        }
        self.htmlStr +=`<div class="buttonText resetText">Reset</div><div class="buttonText audioText">Question</div><div class="buttonText musicText">Music</div>`;
        self.htmlStr +="<div class='buttonsPatch'></div><div class='resetPatch'></div>";
        $("#"+self.ShellRef.targetContainer+" .buttonsPannel").html(self.htmlStr);
        for(key in btns){
            if (btns.hasOwnProperty(key)) {
                var url = `url(${btns[key]})`;
                $("#"+self.ShellRef.targetContainer+" ."+key).css("background",url);
            }
        }
        self.detectdevice();
        self.events();
    }
    detectdevice(){
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
            $(".buttonsPannel .MusicOn,.buttonsPannel .MusicOff, .musicText").css("visibility","hidden");
            $(".buttonsPatch").css("width","0px");
            $(".audioOn").css("left","170px");
            $(".audioText").css("left","237px");
        }
    }
    isDevice(){
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
            return true;
        return false;    
    }
    events(){
        const self = this;
        const device = self.isDevice();
        $("#" + self.ShellRef.targetContainer + " .buttonsPannel .buttons.MusicOn").addClass("active");
        $("#"+self.ShellRef.targetContainer+" .buttonsPannel .buttons").on("click", function(){
            if($(this).hasClass("audioOn") || $(this).hasClass("audioOff")){
                self.audioBtnClick(self.ShellRef.targetContainer + self.ShellRef.audioContainer, $(this));  
            }else if($(this).hasClass("MusicOn") || $(this).hasClass("MusicOff")){
                $(this).hide();
                self.musicBtnClick(self.ShellRef.targetContainer + self.ShellRef.bgAudioContainer , $(this)); 
            }
        });
        $(".bottomSection").css("background-image","url('src/common_core/templates/assets/images/option_bg.png')");
        if(!device){
            $(".audioOn").hover(function(){
                $(this).css("background-image","url('src/common_core/templates/assets/images/voiceover_on_hover.png')");
            },function(){
                $(this).css("background-image","url('src/common_core/templates/assets/images/voiceover_on.png')");
            });
            $(".MusicOn").hover(function(){
                $(this).css("background-image","url('src/common_core/templates/assets/images/music_hover.png')");
            },function(){
                $(this).css("background-image","url('src/common_core/templates/assets/images/music_on.png')");
            });
            $(".MusicOff").hover(function(){
                $(this).css("background-image","url('src/common_core/templates/assets/images/music_off_hover.png')");
            },function(){
                $(this).css("background-image","url('src/common_core/templates/assets/images/music_off.png')");
            });
            $(".reset").hover(function(){
                $(this).css("background-image","url('src/common_core/templates/assets/images/reset_hover.png')");
            },function(){
                $(this).css("background-image","url('src/common_core/templates/assets/images/reset.png')");
            });
        }
    }

    audioBtnClick(){
        const self = this;
        self.ShellRef.shellController.audioController.playAudio(15);
    }
    musicBtnClick(_audioController, _that){
        const self = this;
        if(_that.hasClass("MusicOn")){
            $("#" + self.ShellRef.targetContainer + " .MusicOn").removeClass("active");
            $("#"+self.ShellRef.targetContainer+" .MusicOff").show().addClass("active");
            self.ShellRef.shellController.audioController.muteAll();
        }else{
            $("#" + self.ShellRef.targetContainer + " .MusicOff").removeClass("active");
            $("#" + self.ShellRef.targetContainer + " .MusicOn").show().addClass("active");
            self.ShellRef.shellController.audioController.unmuteAll();
            self.ShellRef.shellController.audioController.volume(0,0.2);
        }
    }
  
}