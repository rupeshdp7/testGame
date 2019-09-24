/* eslint-disable linebreak-style */
import $ from 'jquery';
export class PlayerResize {
    constructor() {

    }
    initialize() {
        const self = this;
        window.onresize = function () {
            self.doScaling();
        };
        self.doScaling();
    }
    doScaling() {
        let winHeight = window.innerHeight;
        let winWidth = window.innerWidth;
        let widthDiff;
        let heightDiff;
        let containerView = $("#wrapper"),
            containerViewParent = $("#wrapperParent"),
            parentWidth = 0,
            parentHeight = 0,
            containerScale = 1;
        containerView.css({
            '-webkit-transform': 'scale(' + containerScale + ')',
            '-moz-transform': 'scale(' + containerScale + ')',
            '-ms-transform': 'scale(' + containerScale + ')',
            '-o-transform': 'scale(' + containerScale + ')',
        });
        containerViewParent.css({
            width: '0px',
            height: '0px',
            left: '0px',
        });
        widthDiff = (containerView.width() - winWidth) / winWidth * 100;
        heightDiff = ((containerView.height()) - winHeight) / winHeight * 100;
        (widthDiff > heightDiff) ? (containerScale = winWidth / containerView.width()) : (containerScale = winHeight / (containerView.height()));

        // if (containerScale > 1) {
        //     containerScale = 1;
        // }
        containerView.css({
            '-webkit-transform': 'scale(' + containerScale + ')',
            '-moz-transform': 'scale(' + containerScale + ')',
            '-ms-transform': 'scale(' + containerScale + ')',
            '-o-transform': 'scale(' + containerScale + ')',
        });
        parentWidth = Math.round(containerView.width() * containerScale);
        parentHeight = Math.round(containerView.height() * containerScale);

        containerViewParent.css({
            height: parentHeight + 'px',
            width: parentWidth + 'px',
        });
        window.scrollTo(0, 0);
    }

}