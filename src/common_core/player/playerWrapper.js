/* eslint-disable linebreak-style */
import "../player/css/style.css";
import player_config_1 from "../player/data/player_config_1";
import { PlayerResize } from "../player/js/controller/playerResizer";
import $ from "jquery";
export const playerResize = new PlayerResize();

export default class {
    constructor() {
        this.ShellRef = "";
    }
    initialize(gameData) {
        playerResize.initialize();
        this.ShellRef = player_config_1;
        this.ShellRef.gameView.gameData.gameParams = gameData;
        // Object.assign(this.ShellRef.gameView.gameData, gameData);

        $("head").prepend("<style type=\"text/css\">" + "@font-face {\n" + "\tfont-family: \"ARLRDBD_0\";\n" 
        + "\tsrc: local('☺'), url('src/common_core/player/fonts/ARLRDBD_0.eot?#iefix') format('embedded-opentype');\n"
        + "\tsrc: local('☺'), url('src/common_core/player/fonts/ARLRDBD_0.TTF') format('truetype');\n"
        + "\tsrc: local('☺'), url('src/common_core/player/fonts/ARLRDBD_0.woff') format('woff');\n"
        + "}\n" + "\tp.myClass {\n" + "\tfont-family: myFont !important;\n" + "}\n" + "</style>");
        this.createDom();
    }
    createDom() {
        const self = this;
        const gameDom = document.createElement("div");
        gameDom.setAttribute('class', 'games');
        gameDom.setAttribute('id', self.ShellRef.targetContainer);
        const targetContainer = document.getElementById("wrapper");
        targetContainer.appendChild(gameDom);
        self.ShellRef.shellController["assetsPreloader"].initialize(self.ShellRef);

    }

}