import {Component, ElementRef, OnInit, OnDestroy, Input} from 'angular2/core';

@Component({
  selector: 'yt-consumer-player',

  template:`
  <button id="playBtn" (click)="urlClicked($event)">{{vidId}}</button>
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
export class YTConsumerPlayer implements OnInit, OnDestroy {

    private _elementRef: ElementRef;
    private videoJSplayer : VideoJSPlayer;
    public _videoURL:string = 'https://www.youtube.com/watch?v=PaOYzsZdt5c';
    
   

    @Input() vidId: string;
    @Input() end: string;
    @Input() start: string;    
    constructor(elementRef: ElementRef) {
        
        this._elementRef = elementRef;
    }
    
    urlClicked($event){
       console.log("https://www.youtube.com/watch?v="+this.vidId);
       videojs('#player').src({"src":"https://www.youtube.com/watch?v="+this.vidId});
       
       videojs('#player').currentTime(Number(this.start));
       
       videojs('#player').play();
        
       
        
    }

    ngOnInit() {
        console.log('Init - Component initialized ' + this.vidId)
        
        this.videoJSplayer = videojs(document.getElementById('player'), {}, function() {
            
        });
        
        videojs('#player').src({"src":"https://www.youtube.com/watch?v="+this.vidId});
        videojs('#player').play();
        
        
    }

    ngOnDestroy() {
        console.log('Deinit - Destroyed Component')
        this.videoJSplayer.dispose();
    }
    
    loadVideo() {
        console.log('load video');
    }
    
}
