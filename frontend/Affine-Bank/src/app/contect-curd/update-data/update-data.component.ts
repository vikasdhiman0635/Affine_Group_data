import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CloudantService } from 'src/app/Service/cloudant.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {

  data:any;

  contectform:FormGroup;

  constructor(private _fb:FormBuilder,private service:CloudantService,private loc:Location) { }

  ngOnInit()
  {
    this.data=JSON.parse(window.localStorage.getItem("contectdata"));

    this.contectform = this._fb.group({
      id : 31546,
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      companyname: [null, Validators.required],
      abutus: [null, Validators.required],
      primePay: [null, Validators.required],
      digitalassetsolutions: [null, Validators.required],
      custodialservices: [null, Validators.required],
      assetprotectontrusts: [null, Validators.required],
      escrowservices: [null, Validators.required],
      complianceservices: [null, Validators.required],
      other: [null, Validators.required],
      message: [null, Validators.required],
    });

  }

  update()
  {
    console.log(this.contectform.value);
    this.deletedata();
    this.createdata();
  }

  deletedata()
  {
    this.service.deletedata(this.data.id).subscribe((Response)=>
    {
    });
  }

  createdata()
  {
    this.service.createDoc(this.contectform.value).subscribe((Response)=>
    {
      console.log(Response);
      this.loc.back();
    })
  }

}
