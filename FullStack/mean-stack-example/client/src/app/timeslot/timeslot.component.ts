import { Component, Renderer2, ElementRef, AfterViewInit, HostListener,ViewChild  } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-timeslot',
  templateUrl:'./timeslot.component.html',
  styles: [
  ]
})
export class TimeslotComponent {
  block_A = [{ number: 'A_A1', occupied: false,slot:"6am-8am" }, { number: 'A_A2', occupied: true,slot:"8am-12pm" }, { number: 'A_A3', occupied: false,slot:"1pm-3pm" }, { number: 'A_A4', occupied: true,slot:"3pm-5pm" }
            ,{ number: 'A_A5', occupied: false,slot:"5pm-6pm" }, { number: 'A_A6', occupied: true,slot:"06pm-07pm" }, { number: 'A_A7', occupied: false,slot:"07pm-09pm" }, { number: 'A_A8', occupied: true,slot:"09pm-10pm" }
            ];

  selectedSeat: any;
  private clientID=""
  private matchID=""
                
  constructor(private wsService: WebsocketService,private renderer: Renderer2, private el: ElementRef,private router: Router,
    private route: ActivatedRoute) {
      this.wsService.receive().subscribe(message =>{
        if(message.method=="connect"){
  
          this.clientID=message.clientId;;
          console.log("connected")
          console.log("client id"+this.clientID)
          this.goToSession();
        };
  
  
        if(message.method=="join"){
          console.log(message)
          this.clientID=message.clientId;
          console.log("join")
  
        };
        if(message.method=="update"){
  
          console.log("Game state updated");
          if (!message.game.state) return;
            Object.entries(message.game.state).forEach(([key, value]) => {
  
            if(key!=''){
              console.log("key"+key+"_"+value)
               this.changeColor(key,value);
          }
          });
  
  
        };
  
      });
      
    }
  
    goToSession(){
      const payLoad = {
        method: 'join',
        clientID: this.clientID,
        matchID:"1a",
      };
      this.wsService.send(payLoad);
      console.log("send join request ")
    }
  
    clickOnSeat(seat: any) {
      this.selectedSeat = seat;
      console.log(this.selectedSeat);
      const payLoad = {
        method: 'click',
        clientID: this.clientID,
        matchID:"1a",
        color:"red",
        seatID:seat
      };
      this.wsService.send(payLoad);
      console.log("send seat ID")
    }
  
    changeColor(i: any,color: any) {
  
      const div = document.getElementById(i);
      this.renderer.setStyle(div, 'background-color', color);
  
 }
  
}
