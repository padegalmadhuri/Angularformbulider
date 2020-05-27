import { Component } from '@angular/core';
import { FormGroup, FormControl,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactformbuilder';
  profileForm: FormGroup;
  countries={
    IN:{
      code:"IN",
    name:"India",
    states:{
      AP:{
        code:"AP",
        name:"Andhra Pradesh",
        cities:[{
          code:"VZ",
          name:"Vizag"
        },{
          code:"KN",
          name:"kurnool"
        }]
      },
      KL:{
        code:"KL",
        name:"kerala",
        cities:[{
          code:"PK",
          name:"Palkad"
        },{
          code:"KC",
          name:"Kochin"
        }]
      }
    }
    },
    US:{
      code:"US",
    name:"United States",
    states:{
      NY:{
        code:"NY",
        name:"New York",
        cities:[{
          code:"NYC",
          name:"New york City"
        },
        {
        code:"AL",
        name:"Allen"
      }]
      },
      NJ:{
        code:"NJ",
        name:"New Jersey",
        cities:[{
          code:"TR",
          name:"Trenton"
        },
      {
        code:"HD",
        name:"Hudson"
      }]
      }
    }
  }
  }
  //countryList=[];
  stateList=[];
  cityList=[];


  constructor( private fb: FormBuilder){
    this.profileForm = this.fb.group({
    username:this.fb.control('',Validators.required),
    mail: this.fb.control('',[Validators.required,Validators.email]),
    pass:this.fb.control('',[Validators.required,Validators.pattern('[ A-Za-z0-9_@./#&+-]*'),Validators.minLength(6)]),
    confPass:this.fb.control('',Validators.required),
    phone: this.fb.control('',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    gender:this.fb.control('',[Validators.required]),
    status:this.fb.control('',[Validators.required]),
    favfood:this.fb.control('',[Validators.required]),
    favcolor:this.fb.control('',[Validators.required]),
    address: this.fb.array([
       this.fb.group({
         addressLine1: this.fb.control('', Validators.required),
         addressLine2: this.fb.control('',),
         zip:this.fb.control('',Validators.required),
         country: this.fb.control('', Validators.required),
         state: this.fb.control('', Validators.required),
         city: this.fb.control('', Validators.required),
       }),
       this.fb.group({
         addressLine1: this.fb.control('',Validators.required),
         addressLine2: this.fb.control('',),
         zip:this.fb.control('',Validators.required),
         country: this.fb.control('',Validators.required),
         state: this.fb.control('',Validators.required),
         city: this.fb.control('',Validators.required),
       }),
       this.fb.group({
         addressLine1: this.fb.control('',[Validators.required]),
         addressLine2: this.fb.control('',),
         zip:this.fb.control('',Validators.required),
         country: this.fb.control('',Validators.required),
         state: this.fb.control('',Validators.required),
         city: this.fb.control('',Validators.required),
       }),
     ]),
  });
  for(let  i in this.profileForm.get('address').value){
        this.profileForm.get('address').get(i).get('country').valueChanges.subscribe((data) => {
          this.stateList[i] = Object.keys(this.countries[data].states).map((item) => {
            return this.countries[data].states[item];
          });
        });
      }
      for(let i in this.profileForm.get('address').value){
            this.profileForm.get('address').get(i).get('state').valueChanges.subscribe((data) => {
          this.cityList[i] = this.countries[this.profileForm.get('address').get(i).get('country').value][
            'states'
          ][data]['cities'];
          //console.log(this.cityList);
        });
      }

}
countryList=Object.keys(this.countries);
  //countryList=Object.keys(this.countries);
  //console.log(this.stateList);
  //console.log(countryList);

dataSubmit(){
  console.log(this.profileForm.value);
  console.log(this.profileForm.valid);
}
}
