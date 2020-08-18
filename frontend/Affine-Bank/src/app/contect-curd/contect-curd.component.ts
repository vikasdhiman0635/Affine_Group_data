import { Component, OnInit } from '@angular/core';
import { CloudantService } from '../Service/cloudant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contect-curd',
  templateUrl: './contect-curd.component.html',
  styleUrls: ['./contect-curd.component.css']
})
export class ContectCurdComponent implements OnInit {

  alldata:any;

  constructor(private service:CloudantService,private router:Router) { }

  ngOnInit()
  {
    this.getalldata();
  }

  getalldata()
  {
    this.service.getalldatabycloudent().subscribe((Response)=>
    {
      this.alldata=Response;
    });
  }

  deletedata(data)
  {
    alert("Do you want to delete this data");
    this.service.deletedata(data).subscribe((Response)=>
    {
      this.getalldata();
    });
  }

  updatedata(data)
  {
    // console.log(data);
    window.localStorage.setItem("contectdata",JSON.stringify(data));
    this.router.navigate(['/updatedata']);
  }

}
