import { Component,ChangeDetectionStrategy, ChangeDetectorRef,AfterViewChecked } from 'angular2/core';
import { Search } from './search.component2';
import {BigRedButton} from './bigred2.component';
import {YTPlayer} from './ytplayer.component';
import {Social} from './social.component';
import {CopyBox} from './copybox.component';
@Component({
  selector: 'my-editor',
  changeDetection: ChangeDetectionStrategy.Default,
  directives: [Search,YTPlayer,BigRedButton,Social,CopyBox],
  template: `
    
    
    <div id="edit-controls">
        <a href="#" class="search" (click)="toggleSearch($event)"><span class="icon-search"></span></a>
    </div>
    
    <yt-player [vidId]="_vidId" #movieplayer></yt-player>
    <big-red-button 
    [start]="_start" 
    [end]="_end"
    (startBtnClicked)="startBtnClicked()" 
    (endBtnClicked)="endBtnClicked()"
    (recordBtnClicked)="recordBtnClicked()">
    </big-red-button>
    
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
    _int;
    _ref;
    
   constructor(ref: ChangeDetectorRef) {
       
        console.log('editor created');
        //set flag to check if _shareURLIsReady is worth sharing
        this._shareURLIsReady = false;
        this._vidId = this.getQueryStringValue('id');
        this._ref = ref
        
   }
    
  
    
    toggleSearch(event){
        event.preventDefault();
        //hide / show searchBox component
        $('#searchBox').toggle();
    }
    
    recordBtnClicked(event){ 
        console.log('record');
        
         //toggle class to visually show state of recording start / end times
        $('.player-container').toggleClass('red');
       
        //depending on red class active either modify start time or end time
        if($('.player-container').hasClass('red')){
            this._start = String(videojs('#player').currentTime().toFixed(1));
            this._int=setInterval(function(){
                this._end = String(videojs('#player').currentTime().toFixed(1));
                $('#endTime').val(this._end)//BAD temp fix !!!!!!!!!!!!!!!!
                    //this.ref.markForCheck();
                console.log(this._end)
                },100);
        }else{
            clearInterval(this._int);
            this._end = String(videojs('#player').currentTime().toFixed(1));
            console.log(this._end);
            videojs('#player').pause()
        }
       this._shareURL = 'http://www.youtube.com/v/'+this._vidId+'?start='+this._start+'&end='+this._end+'&autoplay=1';
       // check if _shareURLIsReady is worth showing (i.e. is anything still undefined)
       if(this._shareURL.search("undefined")>-1){
           this._shareURLIsReady = false;
       }else{
           this._shareURLIsReady = true;
       }
       console.log(this._shareURL);
    }
    
    endBtnClicked(event){ 
        console.log('end');
        clearInterval(this._int);
        this._end = 'end=' + String(videojs('#player').currentTime().toFixed(1));
        console.log(this._end)
    }
    
    
    startBtnClicked(event){ 
        console.log(this._ref)
        console.log('start')
        this._start = 'start=' + String(videojs('#player').currentTime().toFixed(1));
        this._int=setInterval(function(){
            this._end = 'end=' + String(videojs('#player').currentTime().toFixed(1));
            $('#endTime').val(this._end)//temp fix
            //this.ref.markForCheck();
           // console.log(this._end)
        },66);
        
    }
    
    updateEnd(){
        console.log(String(videojs('#player').currentTime().toFixed(1)));
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
        //this._shareURL = 'http://localhost:3000/consumer?id='+this._vidId + this._start + '&' + this._end +'&version=3.0';
        
        this._shareURL = 'http://www.youtube.com/embed/'+this._vidId+'?start='+this._start+'&end='+this._end+'&autoplay=1';
        
        //'http://www.youtube.com/embed/'+this._vidId+'?start='+this._start+'&end='+this._end+'&autoplay=1'
        
        
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
    
     ngAfterViewChecked() {
        //console.log(this._ref);
        //this._ref.markForCheck();
        // if (this.callback && this.clicked) {
        //     console.log("changing status ...");
        //     this.callback(Math.random());
        // }
    } 
}