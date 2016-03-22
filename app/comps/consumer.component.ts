import { Component }       from 'angular2/core';
import {YTPlayer} from './ytplayer.component';
@Component({
  selector: 'my-consumer',
  directives: [YTPlayer],
  template: `
    
    <yt-player></yt-player>
   `

})
export class Consumer {
  
}