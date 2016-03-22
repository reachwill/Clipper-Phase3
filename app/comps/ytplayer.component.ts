import {Component, ElementRef, OnInit, OnDestroy} from 'angular2/core';

@Component({
  selector: 'yt-player',
  template:`
  <div class="player-container">
    <video
        id="player"
        class="video-js vjs-default-skin"
        controls 
        width="640" height="264"
        poster="media/clipper-logo-play-hires" 
        data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=PaOYzsZdt5c"}] }'
    >
    </video>
  </div>
  `,
  styles:[`
    .player-dimensions{
        width:100%;/*override videojs style which fixed width at 640px*/
        max-width:640px;
        margin:0 auto;
    }
  `],
  
})
export class YTPlayer implements OnInit, OnDestroy {

    private _elementRef: ElementRef
    private videoJSplayer : VideoJSPlayer

    constructor(elementRef: ElementRef) {
        this._elementRef = elementRef
    }

    ngOnInit() {
        console.log('Init - Component initialized')

        this.videoJSplayer = videojs(document.getElementById('player'), {}, function() {
            // This is functionally the same as the previous example.
        });
    }

    ngOnDestroy() {
        console.log('Deinit - Destroyed Component')
        this.videoJSplayer.dispose()
    }
    
    loadVideo() {
        console.log('load video')
    }
    
}
