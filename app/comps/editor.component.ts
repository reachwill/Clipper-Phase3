import { Component }       from 'angular2/core';
import { Search } from './search.component2';
import {BigRedButton} from './bigred.component';
import {YTPlayer} from './ytplayer.component';
import {Social} from './social.component';
import {CopyBox} from './copybox.component';
@Component({
  selector: 'my-editor',
  directives: [Search,YTPlayer,BigRedButton,Social,CopyBox],
  template: `
    
    
    <div id="edit-controls">
        <a href="#" class="search" (click)="toggleSearch($event)"><span class="icon-search"></span></a>
        <big-red-button (clicked)="bigRedClicked($event)"></big-red-button>
    </div>
    
    <yt-player [vidId]="_vidId" #movieplayer></yt-player>
    <copy-box [shareURL]="_shareURL" [shareURLIsReady]="_shareURLIsReady"></copy-box>
    <social [shareURL]="_shareURL"></social>
    
    <search id="searchBox" (^click)="searchResultClicked($event)" (resultClicked)="searchResultClicked($event)"></search>
    
     
   `

})
export class Editor {
    
    _vidURL:string;
    _vidId:string;
    _start:string;
    _end:string;
    _shareURL:string;
    _shareURLIsReady:string;
    
   constructor() {
        console.log('editor created');
        //set flag to check if _shareURLIsReady is worth sharing
        this._shareURLIsReady = false;
        this._vidId = this.getQueryStringValue('id');
   }
    
    
    
    toggleSearch(event){
        event.preventDefault();
        //hide / show searchBox component
        $('#searchBox').toggle();
    }
    
    
    bigRedClicked(event){ 
        //$('#moveiplayer').loadVideo();
        //toggle class to visually show state of recording start / end times
        $('.player-container').toggleClass('red');
        //depending on red class active either modify start time or end time
        if($('.player-container').hasClass('red')){
            this._start = 'start=' + Math.round(videojs('#player').currentTime());
        }else{
            this._end = 'end=' + Math.round(videojs('#player').currentTime());
        }
        this._shareURL = 'http://localhost:3000/consumer?id='+this._vidId + this._start + '&' + this._end +'&version=3.0';
       // check if _shareURLIsReady is worth showing (i.e. is anything still undefined)
       if(this._shareURL.search("undefined")>-1){
           this._shareURLIsReady = false;
       }else{
           this._shareURLIsReady = true;
       }
       console.log(this._shareURL);
    }
    
     searchResultClicked(event){
        //console.log(event.id)
        videojs('#player').src({"src":"https://www.youtube.com/watch?v="+event.id});
        videojs('#player').play();
        //record current video url in public vidURL var ready with & for start end params
        this._vidURL = videojs('#player').src().src + '&';
        //record the unique id of th video
        this._vidId = this._vidURL.substr(this._vidURL.lastIndexOf('?')+3);
        // toggle visiblity of searchBox component
        $('#searchBox').fadeToggle();
    }
    
    getQueryStringValue (key) {  
        return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    } 
}