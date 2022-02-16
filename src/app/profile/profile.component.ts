import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { MemberService } from "../member.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  member : any;
form : any;
private memberId: any;

constructor(public route:ActivatedRoute , 
            public memberService: MemberService) {}

  ngOnInit() {
    this.form = new FormGroup({
      username : new FormControl(null,{ validators :[] }),
      password : new FormControl(null, { validators: [] }),
      email: new FormControl(null, { validators: [] }),
      fullname: new FormControl(null, { validators: [] }),
      height: new FormControl(null, { validators: [] }),
      weight: new FormControl(null, { validators: [] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.memberId =  paramMap.get('username');        // paramMap.get('memberId');
      this.memberService.getMember(this.memberId).subscribe(memberData => {
        this.member = {
        id : memberData._id,
        username : memberData.username,
        password: memberData.password,
        email : memberData.email,
        fullname : memberData.fullname,
        height : memberData.height,
        weight : memberData.weight };
        this.form.setValue({
          username: this.member.username,
          password: this.member.password,
          email: this.member.email,
          fullname: this.member.fullname,
          height: this.member.height,
          weight: this.member.weight
        });
      })
    });

  }
  



}