/* eslint-disable linebreak-style */
import preloadData from "../../player/data/assetsPreloader";
import {AssetsPreloader} from "../../player/js/controller/assetsPreloader";
import {AudioController} from "../../player/js/controller/audioController";
import {VideoController} from "../../player/js/controller/videoController";
import {PopupView} from "../../player/js/view/popupView";
import game_config_1 from "../../templates/data/game_config_1";
// import {TimerView} from "../../templates/js/timerView";
import {ButtonsPannelView} from "../../templates/js/buttonsPannelView";
import {cross_over_the_bridge} from "../../templates/js/cross_over_the_bridge";
import PreJS from 'prejs';
export default {
    shellController: {
        "assetsPreloader": new AssetsPreloader(),
        "videoController": new VideoController(),
        "audioController": new AudioController(),
        "bgAudioController": new AudioController(),
        "boysfxController": new AudioController(),
        "aliensfxController": new AudioController(),
        "preJS": new PreJS(),
        "PopupView" :new PopupView(),
        "ButtonsPannelView" :new ButtonsPannelView()
    },
    gameView:{
        "GameView": new cross_over_the_bridge(),
        "gameData": game_config_1
    },
    preloading : {
        "preloadingData": preloadData
    },
    progressBar:'.progressBar',
    targetContainer: "game_1",
    videoContainer: "_gameVideo",
    audioContainer: "_gameAudio",
    bgAudioContainer: "_BgAudio",
    boyAudioContainer: "_boyAudio",
    alienAudioContainer: "_alienAudio",
    scaleFactor: 1,
    playerMute: false,
    attributeDiv:{
        "mainDiv": "startPopup_1",
    },
    defaultAudio: "src/common_core/player/assets/audio/blank.mp3",
    defaultVideo: "src/common_core/player/assets/videos/Launch_Screen.mp4",
};
