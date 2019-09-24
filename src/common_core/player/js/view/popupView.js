import $ from 'jquery';
import "../../css/popup.scss";
export class PopupView {
    constructor() {
        this.htmlStr = "";
        this.htmlStr2 = "";
        this.ShellRef = "";
    }
    initialize(ShellRef) {
        const self = this;
        self.htmlStr = "";
        self.htmlStr2 = "";
        self.ShellRef = ShellRef;
        self.buildDom();        
        self.audioController = self.ShellRef.shellController.audioController;
    }
    buildDom(){
        const self = this;
        const startPoupattr = self.ShellRef.targetContainer + "_startPopup";
        const videoAttr = self.ShellRef.targetContainer + "_startVideo";
        const gameName = self.ShellRef.targetContainer + "_gameView";
        const imgPlay = "src/common_core/player/assets/images/play_icon.png";
        self.htmlStr += `<div class='startPopup' id='${startPoupattr}' data_attr='startPopup'>
            <div class='playBtn hidden' data_attr='playBtn' id="playBtn" ></div>
        </div>`;
        self.htmlStr2 +=`<div id="deviceLaunch" data_attr='deviceLaunch' class="ShellOverlay" style="display: block;">
        <div id="deviceLaunchIcon" style="background-image:url(${imgPlay})"></div></div>`;
        $("#"+self.ShellRef.targetContainer).append(self.htmlStr);
        $("#"+self.ShellRef.targetContainer).append(self.htmlStr2);
        self.setStyles(self.ShellRef);
        self.events(gameName, startPoupattr, videoAttr);
        $("#deviceLaunchIcon").hover(function(){
            $(this).css("background-image","url('src/common_core/player/assets/images/play_hoverl.png')");
        },function(){
            $(this).css("background-image","url('src/common_core/player/assets/images/play_icon.png')");
        });
    }
    events(gameName, startPoupattr){
        const self = this;
        $("#"+self.ShellRef.targetContainer+" [data_attr='startPopup'] .playBtn").on("click", function(){
            $("[data_attr="+gameName+"]").show();
            $("#"+self.ShellRef.targetContainer+"_introVideo").empty();
            self.ShellRef.gameView["GameView"].playIntro();
            $("[data_attr="+startPoupattr+"]").hide();
            $(this).hide();
            self.audioController.stopAudio(16);
            self.ShellRef.shellController["videoController"].destroy(self.ShellRef.targetContainer+"_introVideo");
        });

        $("#"+self.ShellRef.targetContainer+" [data_attr='deviceLaunch'] #deviceLaunchIcon").on("click", function(){
            $("#"+self.ShellRef.targetContainer+" [data_attr='deviceLaunch']").hide();
            self.audioController.playAudio(16);
            setTimeout(function(){
                
                $('#'+self.ShellRef.targetContainer+ ' .playBtn').css("opacity","1");
                $('#'+self.ShellRef.targetContainer+ ' .playBtn').removeClass('hidden').css("transition","opacity 0.4s linear");
            },2200);
            
            self.ShellRef.shellController["videoController"].playVideo(self.ShellRef.targetContainer+"_introVideo");
        });

        $("#"+self.ShellRef.targetContainer+" [data_attr='startPopup'] .playBtn").mouseover(function(){
            $(this).css('background-image',`url("src/common_core/player/assets/images/start_over.png")`);
        });

        $("#"+self.ShellRef.targetContainer+" [data_attr='startPopup'] .playBtn").mouseout(function(){
            $(this).css('background-image',`url("src/common_core/player/assets/images/start_normal.png")`);
        });
    }
    setStyles(){
        const self = this;
        $('#'+self.ShellRef.targetContainer+ ' .playBtn').css('background-image',`url("src/common_core/player/assets/images/start_normal.png")`);
    }
}