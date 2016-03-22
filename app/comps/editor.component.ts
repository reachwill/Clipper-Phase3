import { Component }       from 'angular2/core';
import { Search } from './search.component2';
import {BigRedButton} from './bigred.component';
import {YTPlayer} from './ytplayer.component';
import {Social} from './social.component';
@Component({
  selector: 'my-editor',
  directives: [Search,YTPlayer,BigRedButton,Social],
  template: `
    
    
    <div id="edit-controls">
        <a href="#" class="search" (click)="toggleSearch($event)"><span class="icon-search"></span></a>
        <big-red-button (clicked)="bigRedClicked($event)"></big-red-button>
    </div>
    
    <yt-player></yt-player>
    <search id="searchBox" (^click)="searchResultClicked($event)" (resultClicked)="searchResultClicked($event)"></search>
    <social [shareURL]="_shareURL"></social>
     
   `

})
export class Editor {
   constructor() {
        console.log('editor created');
        
   }
    
    _vidURL:string;
    _start:string;
    _end:string;
    _shareURL:string;
    
    toggleSearch(event){
        event.preventDefault();
        $('#searchBox').toggle();
    }
    
    
    bigRedClicked(event){ 
        $('.player-container').toggleClass('red');
        if($('.player-container').hasClass('red')){
            this._start = 'start=' + Math.round(videojs('#player').currentTime());
        }else{
            this._end = 'end=' + Math.round(videojs('#player').currentTime());
        }
        this._shareURL = this._vidURL + this._start + '&' + this._end +'&version=3.0';
        console.log(this._shareURL);
       
    }
    
     searchResultClicked(event){
        console.log(event.id)
        videojs('#player').src({"src":"https://www.youtube.com/watch?v="+event.id});
        videojs('#player').play();
        //record current video url in public vidURL var ready with & for start end params
        this._vidURL = videojs('#player').src().src + '&';
        $('#searchBox').fadeToggle();
    }
}