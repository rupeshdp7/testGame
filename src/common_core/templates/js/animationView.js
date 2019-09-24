import $ from 'jquery';
import "latest-createjs";
export class animationView {
    constructor() {
        this.bgAnimeStage = '';
        this.bgAnimeWidth = "";
        this.bgAnimeHeight = "";
        this.bgAnimeloader = "";
        this.sky = "";
        this.sunRays = "";
        this.skyImage = "";
        this.cloudsImage_1 = "";
        this.cloudsImage_2 = "";
        this.lastmountainsImage = "";
        this.fourthmountainsImage = "";
        this.thirdhmountainsImage = "";
        this.middlemountainsImage = "";
        this.frontmountainsImage = "";
        this.animBoy;
        this.aliens;
        this.coinAnimeStage = '';
        this.coinAnimeWidth = '';
        this.coinAnimeHeight = '';
        this.bridgebackStartFront = "";
        this.bridgebackStartBack = "";
        this.bridgebackEndFront = "";
        this.bridgebackEndBack = "";
        this.bridgeCenterBack = "";
        this.bridgeCenterFront = "";

        this.animationViewData = "";

    }
    initialize() {
    }

    loadBgAnime(ShellRef, targetContainer, callback) {
        this.bgAnimeStage = new createjs.Stage(targetContainer);
        this.bgAnimeWidth = this.bgAnimeStage.canvas.width;
        this.bgAnimeHeight = this.bgAnimeStage.canvas.height;
        const self = this;
        self.ShellRef = ShellRef;

        const manifest = [
            {
                src: "sky.jpg",
                id: "sky"
            },
            {
                src: "sun_rays.png",
                id: "sunRays"
            },
            {
                src: "clouds.png",
                id: "clouds"
            },
            {
                src: "last_mountains.png",
                id: "lastmountains"
            },
            {
                src: "fourth_last_mountains.png",
                id: "fourthmountains"
            },
            {
                src: "third_last_mountains.png",
                id: "thirdhmountainsImage"
            },
            {
                src: "middle_mountains.png",
                id: "middlemountainsImage"
            },
            {
                src: "front_mountains.png",
                id: "frontmountains"
            },
            {
                src: "bridgebackStartBack.png",
                id: "bridgebackStartBack"
            },
            {
                src: "bridgebackStartFront.png",
                id: "bridgebackStartFront"
            },
            {
                src: "bridgebackEndFront.png",
                id: "bridgebackEndFront"
            },
            {
                src: "bridgebackEndFBack.png",
                id: "bridgebackEndBack"
            },
            {
                src: "bridgeCenterBack.png",
                id: "bridgeCenterBack"
            },
            {
                src: "bridgeCenterFront.png",
                id: "bridgeCenterFront"
            }

        ];

        this.bgAnimeloader = new createjs.LoadQueue(true);
        this.bgAnimeloader.loadManifest(manifest, true, "src/common_core/templates/assets/images/");
        this.bgAnimeloader.on("complete", function () {
            // $("#assetPreloader").hide();
            self.ShellRef.shellController["videoController"].playVideo(self.ShellRef.targetContainer+"_introVideo");
            self.bgAnimeloader.addEventListener("complete", self.createBgAnime(ShellRef, self, callback));
        });

    }
    animateCoin(ShellRef) {
        $("#" + ShellRef.targetContainer + " .letters").each((id, ele) => {
            let _canvasID = $(ele).children().attr("id");
            this.coinAnimeStage = new createjs.Stage(_canvasID);
            const coniSpriteSheet = new createjs.SpriteSheet(ShellRef.gameView["gameData"].coinAnimData);
            let coinSprite = new createjs.Sprite(coniSpriteSheet);
            $(ele).children().attr({
                "width": ShellRef.gameView["gameData"].coinAnimData.frames.width,
                "height": ShellRef.gameView["gameData"].coinAnimData.frames.height
            });
            coinSprite.gotoAndPlay("shine");
            this.coinAnimeStage.addChild(coinSprite);
            createjs.Ticker.addEventListener("tick", this.coinAnimeStage);

        });
    }

    createBgAnime(ShellRef, self, callback) {

        this.animationViewData = ShellRef.gameView["gameData"].animationViewData;
        //---------------------Charecters-----------------------
        const spriteSheetBoy = new createjs.SpriteSheet(ShellRef.gameView["gameData"].boyAnimData);
        const spriteSheetAlien = new createjs.SpriteSheet(ShellRef.gameView["gameData"].alienAnimData);
        //---------------------Backgrounbds-----------------------

        const clouds_width = this.animationViewData.cloudsImage_1.widthBitmapFill;
        this.cloudsImage_1 = new createjs.Shape();
        this.cloudsImage_1.graphics.beginBitmapFill(self.bgAnimeloader.getResult("clouds")).drawRect(0, 0, clouds_width, this.bgAnimeStage.canvas.height);
        this.cloudsImage_1.cache(0, 0, clouds_width, this.bgAnimeStage.canvas.height);

        const clouds_width_2 = this.animationViewData.cloudsImage_2.widthBitmapFill;
        this.cloudsImage_2 = new createjs.Shape();
        this.cloudsImage_2.graphics.beginBitmapFill(self.bgAnimeloader.getResult("clouds")).drawRect(0, 0, clouds_width_2, this.bgAnimeStage.canvas.height);
        this.cloudsImage_2.cache(0, 0, clouds_width_2, this.bgAnimeStage.canvas.height);

        const skyImage_width = this.animationViewData.skyImage.widthBitmapFill;
        this.skyImage = new createjs.Shape();
        this.skyImage.graphics.beginBitmapFill(self.bgAnimeloader.getResult("sky")).drawRect(0, 0, skyImage_width, this.bgAnimeStage.canvas.height);
        this.skyImage.cache(0, 0, skyImage_width, this.bgAnimeStage.canvas.height);

        const sunRays_width = this.animationViewData.sunRays.widthBitmapFill;
        this.sunRays = new createjs.Shape();
        this.sunRays.graphics.beginBitmapFill(self.bgAnimeloader.getResult("sunRays")).drawRect(0, 0, sunRays_width, this.bgAnimeStage.canvas.height);
        this.sunRays.cache(0, 0, sunRays_width, this.bgAnimeStage.canvas.height);

        const fourthmountainsImage_width = this.animationViewData.fourthmountainsImage.widthBitmapFill;
        this.fourthmountainsImage = new createjs.Shape();
        this.fourthmountainsImage.graphics.beginBitmapFill(self.bgAnimeloader.getResult("fourthmountains")).drawRect(0, 0, fourthmountainsImage_width, this.bgAnimeStage.canvas.height);
        this.fourthmountainsImage.cache(0, 0, fourthmountainsImage_width, this.bgAnimeStage.canvas.height);

        const thirdhmountainsImage_width = this.animationViewData.thirdhmountainsImage.widthBitmapFill;
        this.thirdhmountainsImage = new createjs.Shape();
        this.thirdhmountainsImage.graphics.beginBitmapFill(self.bgAnimeloader.getResult("thirdhmountainsImage")).drawRect(0, 0, thirdhmountainsImage_width, this.bgAnimeStage.canvas.height);
        this.thirdhmountainsImage.cache(0, 0, thirdhmountainsImage_width, this.bgAnimeStage.canvas.height);

        const middlemountainsImage_width = this.animationViewData.middlemountainsImage.widthBitmapFill;
        this.middlemountainsImage = new createjs.Shape();
        this.middlemountainsImage.graphics.beginBitmapFill(self.bgAnimeloader.getResult("middlemountainsImage")).drawRect(0, 0, middlemountainsImage_width, this.bgAnimeStage.canvas.height);
        this.middlemountainsImage.cache(0, 0, middlemountainsImage_width, this.bgAnimeStage.canvas.height);

        const frontmountainsImage_width = this.animationViewData.frontmountainsImage.widthBitmapFill;
        this.frontmountainsImage = new createjs.Shape();
        this.frontmountainsImage.graphics.beginBitmapFill(self.bgAnimeloader.getResult("frontmountains")).drawRect(0, 0, frontmountainsImage_width, this.bgAnimeStage.canvas.height);
        this.frontmountainsImage.cache(0, 0, frontmountainsImage_width, this.bgAnimeStage.canvas.height);

        const lastmountainsImage_width = this.animationViewData.lastmountainsImage.widthBitmapFill;
        this.lastmountainsImage = new createjs.Shape();
        this.lastmountainsImage.graphics.beginBitmapFill(self.bgAnimeloader.getResult("lastmountains")).drawRect(0, 0, lastmountainsImage_width, this.bgAnimeStage.canvas.height);
        this.lastmountainsImage.cache(0, 0, lastmountainsImage_width, this.bgAnimeStage.canvas.height);

        //---------------------Bridge-----------------------

        const bridgebackStartFront_width = this.animationViewData.bridgebackStartFront.widthBitmapFill;
        const bridgebackStartFront_height = this.animationViewData.bridgebackStartFront.heightBitMapFill;
        this.bridgebackStartFront = new createjs.Shape();
        this.bridgebackStartFront.graphics.beginBitmapFill(self.bgAnimeloader.getResult("bridgebackStartFront")).drawRect(0, 0, bridgebackStartFront_width, bridgebackStartFront_height);
        this.bridgebackStartFront.cache(0, 0, bridgebackStartFront_width, bridgebackStartFront_height);
        this.bridgebackStartFront.y = this.animationViewData.bridgebackStartFront.canvasY;

        const bridgebackStartBack_width = this.animationViewData.bridgebackStartFront.widthBitmapFill;
        const bridgebackStartBack_height = this.animationViewData.bridgebackStartFront.heightBitMapFill;
        this.bridgebackStartBack = new createjs.Shape();
        this.bridgebackStartBack.graphics.beginBitmapFill(self.bgAnimeloader.getResult("bridgebackStartBack")).drawRect(0, 0, bridgebackStartBack_width, bridgebackStartBack_height);
        this.bridgebackStartBack.cache(0, 0, bridgebackStartBack_width, bridgebackStartBack_height);
        this.bridgebackStartBack.y = this.animationViewData.bridgebackStartBack.canvasY;

        const bridgeCenterBack_width = this.animationViewData.bridgeCenterBack.widthBitmapFill;
        const bridgeCenterBack_height = this.animationViewData.bridgeCenterBack.heightBitMapFill;
        this.bridgeCenterBack = new createjs.Shape();
        this.bridgeCenterBack.graphics.beginBitmapFill(self.bgAnimeloader.getResult("bridgeCenterBack")).drawRect(0, 0, bridgeCenterBack_width, bridgeCenterBack_height);
        this.bridgeCenterBack.cache(0, 0, bridgeCenterBack_width, bridgeCenterBack_height);
        this.bridgeCenterBack.x = this.bridgebackStartBack.x + bridgebackStartBack_width;
        this.bridgeCenterBack.y = this.animationViewData.bridgeCenterBack.canvasY;

        const bridgeCenterFront_width = this.animationViewData.bridgeCenterFront.widthBitmapFill;
        const bridgeCenterFront_height = this.animationViewData.bridgeCenterFront.heightBitMapFill;
        this.bridgeCenterFront = new createjs.Shape();
        this.bridgeCenterFront.graphics.beginBitmapFill(self.bgAnimeloader.getResult("bridgeCenterFront")).drawRect(0, 0, bridgeCenterFront_width, bridgeCenterFront_height);
        this.bridgeCenterFront.cache(0, 0, bridgeCenterFront_width, bridgeCenterFront_height);
        this.bridgeCenterFront.x = this.bridgebackStartFront.x + bridgebackStartBack_width;
        this.bridgeCenterFront.y = this.animationViewData.bridgeCenterFront.canvasY;

        const bridgebackEndFront_width = this.animationViewData.bridgebackEndFront.widthBitmapFill;
        const bridgebackEndFront_height = this.animationViewData.bridgebackEndFront.heightBitMapFill;
        this.bridgebackEndFront = new createjs.Shape();
        this.bridgebackEndFront.graphics.beginBitmapFill(self.bgAnimeloader.getResult("bridgebackEndFront")).drawRect(0, 0, bridgebackEndFront_width, bridgebackEndFront_height);
        this.bridgebackEndFront.cache(0, 0, bridgebackEndFront_width, bridgebackEndFront_height);
        //console.log(bridgebackStartFront_width+"<====>"+bridgeCenterBack_width+"<====>"+1024);
        this.bridgebackEndFront.x = bridgebackStartFront_width + bridgeCenterBack_width;
        this.bridgebackEndFront.y = this.animationViewData.bridgebackEndFront.canvasY;


        const bridgebackEndBack_width = this.animationViewData.bridgebackEndBack.widthBitmapFill;
        const bridgebackEndBack_height = this.animationViewData.bridgebackEndBack.heightBitMapFill;
        this.bridgebackEndBack = new createjs.Shape();
        this.bridgebackEndBack.graphics.beginBitmapFill(self.bgAnimeloader.getResult("bridgebackEndBack")).drawRect(0, 0, bridgebackEndBack_width, bridgebackEndBack_height);
        this.bridgebackEndBack.cache(0, 0, bridgebackEndBack_width, bridgebackEndBack_height);
        this.bridgebackEndBack.x = bridgebackStartBack_width + bridgeCenterBack_width;
        this.bridgebackEndBack.y = this.animationViewData.bridgebackEndBack.canvasY;

        self.animBoy = new createjs.Sprite(spriteSheetBoy);

        self.animBoy.addEventListener("animationend", (e) => {
            callback(e.target.currentAnimation);
        }, false);

        self.animBoy.x = 0;
        self.animBoy.y = 160;
        //self.animBoy.gotoAndPlay("entry_loop_1");
        self.aliens = new createjs.Sprite(spriteSheetAlien);
        // self.aliens.visible = false;
        //self.aliens.gotoAndPlay("Entry_dargon");
        self.aliens.x = 400;
        self.aliens.y = -65;

        self.aliens.addEventListener("animationend", (e) => {
            callback(e.target.currentAnimation);
        }, false);

        self.cloudsImage_1.x = 0;
        self.cloudsImage_2.x = -4200;

        self.bgAnimeStage.addChild(self.skyImage,
            self.cloudsImage_1,
            self.cloudsImage_2,
            self.lastmountainsImage,           
            self.fourthmountainsImage,
            self.thirdhmountainsImage,
            self.middlemountainsImage,
            self.frontmountainsImage,

            self.bridgebackStartBack,
            self.bridgebackEndBack,
            self.bridgeCenterBack,
            self.animBoy,
            self.aliens,
            self.bridgebackStartFront,
            self.bridgebackEndFront,
            self.bridgeCenterFront
        );
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.stage = self.bgAnimeStage;
        createjs.Ticker.self = self;
        this.animateClouds(self, self.bgAnimeStage, self.cloudsImage_1, self.cloudsImage_2);
        $("#assetPreloader").hide();
        $('#shadow_round').stop(); 
        self.ShellRef.shellController["videoController"].initialize(self.ShellRef, self.ShellRef.targetContainer+" .startPopup");
    }

    animateClouds(self, stage, cloudsImage_1, cloudsImage_2) {
        cloudsImage_1.x = 0;
        setInterval(function () {
            if (cloudsImage_1.x == 0) {
                cloudsImage_2.x = 4200;
            }
            if (cloudsImage_2.x == 0) {
                cloudsImage_1.x = 4024;
            }
            cloudsImage_1.x -= 1;
            cloudsImage_2.x -= 1;
        }, 60);
        createjs.Ticker.addEventListener("tick", stage);
    }

    animateIntro(gameFinish, questionPending) {
        var self = this;

        let animSpeed = "";
        let temp = "";
        if (gameFinish == true) {
            animSpeed = questionPending * 3000;
            temp = questionPending * 1024;
        }
        else {
            animSpeed = 3000;
            temp = 1024;
        }

        

        createjs.Tween.get(self.bridgebackStartBack, { loop: false })
            .to({ x: self.bridgebackStartBack.x - temp }, animSpeed, createjs.Ease.SineOut);
        createjs.Tween.get(self.bridgebackStartFront, { loop: false })
            .to({ x: self.bridgebackStartFront.x - temp }, animSpeed, createjs.Ease.SineOut);

        createjs.Tween.get(self.bridgeCenterBack, { loop: false })
            .to({ x: self.bridgeCenterBack.x - temp }, animSpeed, createjs.Ease.SineOut);
        createjs.Tween.get(self.bridgeCenterFront, { loop: false })
            .to({ x: self.bridgeCenterFront.x - temp }, animSpeed, createjs.Ease.SineOut).call(function () {
               
                if (gameFinish == true) {
                    //self.animationsView.animBoy.gotoAndPlay("only_run_cycle");
                    createjs.Tween.get(self.animBoy, { loop: false }).to({ x: self.animBoy.x + 425 }, 2000, createjs.Ease.SineOut);
                    self.animBoy.gotoAndPlay("win_run_cycle");
                }
            });

        createjs.Tween.get(self.bridgebackEndBack, { loop: false })
            .to({ x: self.bridgebackEndBack.x - temp }, animSpeed, createjs.Ease.SineOut);
        createjs.Tween.get(self.bridgebackEndFront, { loop: false })
            .to({ x: self.bridgebackEndFront.x - temp }, animSpeed, createjs.Ease.SineOut);


        //console.log("TEMP", (temp - self.animationViewData.lastmountainsImage.speed));

        createjs.Tween.get(self.frontmountainsImage, { loop: false })
            .to({ x: self.frontmountainsImage.x - (temp * self.animationViewData.frontmountainsImage.speed / 100) }, animSpeed, createjs.Ease.SineOut);

        createjs.Tween.get(self.middlemountainsImage, { loop: false })
            .to({ x: self.middlemountainsImage.x - (temp * self.animationViewData.middlemountainsImage.speed / 100) }, animSpeed, createjs.Ease.SineOut);

        createjs.Tween.get(self.thirdhmountainsImage, { loop: false })
            .to({ x: self.thirdhmountainsImage.x - (temp * self.animationViewData.thirdhmountainsImage.speed / 100) }, animSpeed, createjs.Ease.SineOut);

        createjs.Tween.get(self.fourthmountainsImage, { loop: false })
            .to({ x: self.fourthmountainsImage.x - (temp * self.animationViewData.fourthmountainsImage.speed / 100) }, animSpeed, createjs.Ease.SineOut);

        createjs.Tween.get(self.lastmountainsImage, { loop: false })
            .to({ x: self.lastmountainsImage.x - (temp * self.animationViewData.lastmountainsImage.speed / 100) }, animSpeed, createjs.Ease.SineOut);

    }

    
    callLastRun() {
        const self = this;
        self.animBoy.gotoAndPlay("win_run_cycle");
        createjs.Tween.get(self.animBoy, { loop: false }).to({ x: self.animBoy.x + 425 }, 2000, createjs.Ease.SineOut);
    }
    showQuestions() {

        var parent = "#" + this.ShellRef.targetContainer;
        $(parent + " .topSection, " + parent + " .bottomSection").fadeIn();

    }


}
