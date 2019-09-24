/* eslint-disable linebreak-style */
import $ from 'jquery';
export class AssetsPreloader {
    constructor() {
        this.ctxL = document.getElementById('assetPreloaderAnim').getContext('2d'); 
        this.diffL = '';
        this.startL = 4.72;
        this.cwL = this.ctxL.canvas.width;
        this.chL = this.ctxL.canvas.height;
        this.ShellRef = "";
    }
    initialize(ShellRef) {
        const self = this;
        this.ShellRef = ShellRef;
        self.ShellRef.progressBar = document.querySelector('.progress');
        self.ShellRef.shellController["preJS"].on('complete', () => {
            console.log('this :', this);
            self.ShellRef.shellController["PopupView"].initialize(self.ShellRef);
            self.ShellRef.gameView["GameView"].initialize(self.ShellRef );  
        });
        self.ShellRef.shellController["preJS"].on('start', () => {
            self.boyShadowLoop(self);
            document.getElementById('arc_round').innerHTML = "<img src='src/common_core/player/assets/images/boy_run_100.gif'>";
        });
        self.ShellRef.shellController["preJS"].on('progress', progress => {
            console.log(progress);
            self.createLoaderAnim(Math.round(progress * 100));
        });
        self.ShellRef.shellController["preJS"].load(self.ShellRef.preloading["preloadingData"].Assets.gameAssets);
    }

    createLoaderAnim(percent){
        const self = this;
        this.diffL = ((percent / 100) * Math.PI*2*10).toFixed(2);
        self.ctxL.clearRect(0, 0, this.cwL, this.chL);
        self.ctxL.lineWidth = 8;
        self.ctxL.fillStyle = '#979227';
        self.ctxL.textAlign = "center";
        self.ctxL.font="28px ARLRDBD_0";
        if(percent>=100){
            document.getElementById('laoding_text').innerHTML = 'Initializing...';
           // self.ctxL.fillText('Initializing...', this.cwL*.50, this.chL*.85, this.cwL+12);
        }else{
            document.getElementById('laoding_text').innerHTML = 'Loading...';
           // self.ctxL.fillText('Loading...', this.cwL*.50, this.chL*.85, this.cwL+12);
        }
        
        self.ctxL.strokeStyle = "#979227";
        self.ctxL.textAlign = "center";
        self.ctxL.font="28px Gotham-Light";
        self.ctxL.beginPath();
        self.ctxL.arc(114, 110, 105, this.startL, this.diffL/10+this.startL, false);
        self.ctxL.stroke();
       
    }

    boyShadowLoop(self) {
        $('#shadow_round').css('width', '55');
        $('#shadow_round').css('height', '9');
        $('#shadow_round').animate ({
            width: '75',
            height: '12',
        }, 250, 'linear', function() {
            self.boyShadowLoop(self);
        });
    }
    
}