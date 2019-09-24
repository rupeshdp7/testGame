/* eslint-disable linebreak-style */
import 'jquery';
import { Howl } from "howler";

export class AudioController {
    constructor() {
        if (typeof (this.audioInterval) != "undefined") {
            if (this.audioInterval.length > 0) {
                this.audioInterval.map(interval => clearInterval(interval));
            }
        }
        if (typeof (this.toPlay) != "undefined") {
            if (this.toPlay.length > 0) {
                this.toPlay.map((obj, i) => {
                    this.toPlay[i] = null;
                });
            }
        }
        this.array = [];
        this.toPlay = [];
        this.audioPlaying = [];
        this.audioInterval = [];
        this.timeUpdate = [];
    }

    initialize() { 

        if (![].fill) {
            Array.prototype.fill = function (value) {
                var O = Object(this);
                var len = parseInt(O.length, 10);
                var start = arguments[1];
                var relativeStart = parseInt(start, 10) || 0;
                var k = relativeStart < 0
                    ? Math.max(len + relativeStart, 0)
                    : Math.min(relativeStart, len);
                var end = arguments[2];
                var relativeEnd = end === undefined
                    ? len
                    : (parseInt(end) || 0);
                var final = relativeEnd < 0
                    ? Math.max(len + relativeEnd, 0)
                    : Math.min(relativeEnd, len);
                for (; k < final; k++) {
                    O[k] = value;
                }
                return O;
            };
        }
    }

    loadAudios(array, audioCurrentTime, audioEnd) {
        var self = this;
        self.initialize();
        // self.destroy();
        self.audioCurrentTime = ((typeof (audioCurrentTime) != undefined) && (audioCurrentTime != ""))
            ? audioCurrentTime
            : null;
        self.audioEnd = ((typeof (audioEnd) != undefined) && (audioEnd != ""))
            ? audioEnd
            : null;

        self.array = array;
        self.timeUpdate = Array(self.array.length).fill(0);
        self.audioInterval = Array(self.array.length).fill(0);
        self.audioPlaying = Array(self.array.length).fill(false);
        self.array.map((obj, i) => {
            self.toPlay[i] = new Howl({
                src: [obj],
                preload: true,
                onplay: function () {
                    // self.onAudioPlay(i);
                    self.audioPlaying[i] = true;
                    clearInterval(self.audioInterval[i]);
                    self.audioInterval[i] = setInterval(() => {
                        if (self.audioPlaying[i]) {
                            self.timeUpdate[i]++;
                            // self.onTimeUpdate(i, self.timeUpdate[i]);
                            (self.audioCurrentTime != null)
                                ? self.audioCurrentTime(i, self.timeUpdate[i], self.toPlay[i]._src)
                                : null;
                        }
                    }, 100);
                },
                onpause: function () {
                    self.audioPlaying[i] = false;
                    // self.onAudioPause(i);
                    clearInterval(self.audioInterval[i]);
                },
                onstop: function () {
                    self.audioPlaying[i] = false;
                    clearInterval(self.audioInterval[i]);
                    self.timeUpdate[i] = 0;
                    // self.onAudioStop(i);
                },
                onend: function () {
                    self.audioPlaying[i] = false;
                    clearInterval(self.audioInterval[i]);
                    self.timeUpdate[i] = 0;
                    // self.onAudioEnd(i);
                    (self.audioEnd != null)
                        ? self.audioEnd(i)
                        : null;
                },
                onmute: function () {
                    // self.onMuteAudio(i);
                }
            });
        });

    }
    playAudio(index) {
        // this.stopAll();
        this.toPlay[index].play();
    }
    stopAudio(index) {
        this.toPlay[index].stop();
    }
    stopAll() {
        // Destroying All audios
        if (typeof (this.toPlay) != "undefined") {
            this.toPlay.map((obj, i) => {
                this.toPlay[i].stop();
            });
        }
    }
    volume(index, num) {
        this.toPlay[index].volume(num);
    }
    muteAll(){
        if (typeof (this.toPlay) != "undefined") {
            this.toPlay.map((obj, i) => {
                this.toPlay[i].volume(0);
            });
        }
    }
    unmuteAll(){
        if (typeof (this.toPlay) != "undefined") {
            this.toPlay.map((obj, i) => {
                this.toPlay[i].volume(1);
            });
        }
    }
    playing(index){
        return this.audioPlaying[index];
    }


}