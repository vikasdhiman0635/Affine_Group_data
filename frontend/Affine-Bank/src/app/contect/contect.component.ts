import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContectServiceService } from "../Service/contect-service.service";
import { CloudantService } from '../Service/cloudant.service';

@Component({
  selector: 'app-contect',
  templateUrl: './contect.component.html',
  styleUrls: ['./contect.component.css']
})
export class ContectComponent implements OnInit {

  contectform:FormGroup;

  constructor(private _fb:FormBuilder,private service:CloudantService) { }

  ngOnInit()
  {
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

  savedata(data)
  {
    // console.log(data);
    this.service.createDoc(data).subscribe((Response)=>
    {
      console.log(Response);
      this.contectform.reset();
    })
  }

}
