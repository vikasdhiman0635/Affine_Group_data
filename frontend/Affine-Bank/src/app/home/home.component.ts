import { Component, OnInit, HostListener, Inject } from '@angular/core';  
import { trigger, state, transition, style, animate } from '@angular/animations'; 
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[ 
    trigger('fade',
    [ 
      state('void', style({ opacity : 0})),
      transition(':enter',[ animate(300)]),
      transition(':leave',[ animate(500)]),
    ]
    )]
})
export class HomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) document) { }

  ngOnInit() {  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (document.body.scrollTop > 550 || document.documentElement.scrollTop > 550) {
      document.getElementById("navbar").style.transition = "1s";
      document.getElementById("navbar").style.backgroundColor = "rgb(46, 115, 206)";
      document.getElementById("btne").style.color = "blue";
      document.getElementById("dopdownconstent").style.backgroundColor = "rgb(46, 115, 206)";
      document.getElementById("dopdownconsten").style.backgroundColor = "rgb(46, 115, 206)";
    } else {
      document.getElementById("navbar").style.transition = "1s";
      document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0.2)";
      document.getElementById("dopdownconstent").style.backgroundColor = "";
      document.getElementById("dopdownconsten").style.backgroundColor = "";
    }
  }


}