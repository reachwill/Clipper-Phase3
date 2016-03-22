System.register(['angular2/core', './search.component2', './bigred.component', './ytplayer.component', './social.component', './copybox.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, search_component2_1, bigred_component_1, ytplayer_component_1, social_component_1, copybox_component_1;
    var Editor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (search_component2_1_1) {
                search_component2_1 = search_component2_1_1;
            },
            function (bigred_component_1_1) {
                bigred_component_1 = bigred_component_1_1;
            },
            function (ytplayer_component_1_1) {
                ytplayer_component_1 = ytplayer_component_1_1;
            },
            function (social_component_1_1) {
                social_component_1 = social_component_1_1;
            },
            function (copybox_component_1_1) {
                copybox_component_1 = copybox_component_1_1;
            }],
        execute: function() {
            Editor = (function () {
                function Editor() {
                    console.log('editor created');
                    this._shareURLIsReady = false;
                }
                Editor.prototype.toggleSearch = function (event) {
                    event.preventDefault();
                    $('#searchBox').toggle();
                };
                Editor.prototype.bigRedClicked = function (event) {
                    $('.player-container').toggleClass('red');
                    if ($('.player-container').hasClass('red')) {
                        this._start = 'start=' + Math.round(videojs('#player').currentTime());
                    }
                    else {
                        this._end = 'end=' + Math.round(videojs('#player').currentTime());
                    }
                    this._shareURL = this._vidURL + this._start + '&' + this._end + '&version=3.0';
                    // console.log(this._shareURL);
                    if (this._shareURL.search("undefined") > -1) {
                        this._shareURLIsReady = false;
                    }
                    else {
                        this._shareURLIsReady = true;
                    }
                };
                Editor.prototype.searchResultClicked = function (event) {
                    //console.log(event.id)
                    videojs('#player').src({ "src": "https://www.youtube.com/watch?v=" + event.id });
                    videojs('#player').play();
                    //record current video url in public vidURL var ready with & for start end params
                    this._vidURL = videojs('#player').src().src + '&';
                    $('#searchBox').fadeToggle();
                };
                Editor = __decorate([
                    core_1.Component({
                        selector: 'my-editor',
                        directives: [search_component2_1.Search, ytplayer_component_1.YTPlayer, bigred_component_1.BigRedButton, social_component_1.Social, copybox_component_1.CopyBox],
                        template: "\n    \n    \n    <div id=\"edit-controls\">\n        <a href=\"#\" class=\"search\" (click)=\"toggleSearch($event)\"><span class=\"icon-search\"></span></a>\n        <big-red-button (clicked)=\"bigRedClicked($event)\"></big-red-button>\n    </div>\n    \n    <yt-player></yt-player>\n    <copy-box [shareURL]=\"_shareURL\" [shareURLIsReady]=\"_shareURLIsReady\"></copy-box>\n    <social [shareURL]=\"_shareURL\"></social>\n    \n    <search id=\"searchBox\" (^click)=\"searchResultClicked($event)\" (resultClicked)=\"searchResultClicked($event)\"></search>\n    \n     \n   "
                    }), 
                    __metadata('design:paramtypes', [])
                ], Editor);
                return Editor;
            }());
            exports_1("Editor", Editor);
        }
    }
});
//# sourceMappingURL=editor.component.js.map