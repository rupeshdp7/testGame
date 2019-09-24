/* eslint-disable linebreak-style */
import $ from 'jquery';
import 'jplayer';
export class VideoController {
    constructor() {
        this.htmlStr = "";
        this.VideoHolderType="";
        this.ShellRef="";
    }
    initialize(ShellRef, whichContainer) {
        const self = this;
        self.ShellRef=ShellRef;
        self.htmlStr += `<div class ="_introVideo" id='${self.ShellRef.targetContainer+"_introVideo"}' data_attr='${self.ShellRef.targetContainer+"_introVideo"}'></div>`;
        $("#"+whichContainer).append(self.htmlStr);
        self.VideoHolderType =  $("[data_attr="+self.ShellRef.targetContainer+"_introVideo]");
        self.createVideoPlayer();
    }
    createVideoPlayer() {
        const self = this;
        self.VideoHolderType.jPlayer({
            errorAlerts: false,
            muted: false,
            loop:false,
            ready() {
                self.VideoHolderType.jPlayer('setMedia', {
                    m4v: self.ShellRef.defaultVideo,
                    poster: "src/common_core/player/assets/images/Launch-Screen_poster.png"

                }).jPlayer('stop');
            },
            solution: 'html',
            supplied: 'm4v',
            timeupdate(event) {
                let vidElem = event.jPlayer.status;
                let currentTime = Number(vidElem.currentTime.toFixed(1));       
                //console.log("currentTime", currentTime);        
                if(currentTime > 3.6){
                    $(event.target).children("video")[0].currentTime = 2.4;
                    $(event.target).children("video")[0].playbackRate = 0.7;
                }
               
            },
            loadedmetadata() {},
            play() {},
            pause() {},
            ended(event) {
                $(event.target).children("video")[0].currentTime = 2.4;
                $(event.target).children("video")[0].playbackRate = 0.7;
            },
        });
        0.5;
    }
    loadVideoPath(whichContainer, path) {
        $("[data_attr="+whichContainer+"]").jPlayer('setMedia', { m4v: path }).jPlayer('play');
    }
    stopVideo(VideoHolderType) {
        $("[data_attr="+VideoHolderType+"]").jPlayer('stop');
    }
    playVideo(VideoHolderType) {
        $("[data_attr="+VideoHolderType+"]").jPlayer('play',0);
    }
    pause(VideoHolderType) {
        $("[data_attr="+VideoHolderType+"]").jPlayer('pause');
    }
    setVolume(VideoHolderType, num) {
        $("[data_attr="+VideoHolderType+"]").jPlayer('volume', num);
    }
    destroy(whichContainer) {
        $("[data_attr="+whichContainer+"]").jPlayer('destroy');
    }
    
}