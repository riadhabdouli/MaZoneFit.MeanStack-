import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { memberData } from "../member.model";
import { MemberService } from "../member.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  member: any;
  memberData: memberData[] = [];
  form1: any;
  form2: any;
  private memberId: any;

  constructor(public route: ActivatedRoute,
    public authService: AuthService,
    public memberService: MemberService) { }

  ngOnInit() {
    this.form1 = new FormGroup({
      first_name: new FormControl(null, { validators: [] }),
      last_name: new FormControl(null, { validators: [] }),
      email: new FormControl(null, { validators: [] }),
      height: new FormControl(null, { validators: [] }),
      weight: new FormControl(null, { validators: [] })
    });

    this.form2 = new FormGroup({
      old_pass: new FormControl(null, { validators: [] }),
      new_pass: new FormControl(null, { validators: [] }),
      renew_pass: new FormControl(null, { validators: [] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.memberId = paramMap.get('id');
        this.authService.getMember(this.memberId).subscribe(memberData => {
          this.member = {
            id: memberData._id,
            first_name: memberData.first_name,
            last_name: memberData.last_name,
            password: memberData.password,
            email: memberData.email,
            height: memberData.height,
            weight: memberData.weight
          };
         
          this.form1.setValue({
            first_name: this.member.first_name,
            last_name: this.member.last_name,
            email: this.member.email,
            height: this.member.height,
            weight: this.member.weight
          });
        })
      }
    });
  }

  onUpdate(form1: NgForm) {
    if (this.form1.invalid) {
      return;
    } else {
      this.memberService.updateMember(
        this.member.id,
        this.form1.value.first_name,
        this.form1.value.last_name,
        this.form1.value.email,
        this.member.password,
        this.form1.value.height,
        this.form1.value.weight
       
      );
    }
  };
  onChangePass(form2 : NgForm){
    if(this.form2.invalid){
      return;
    }else {
      this.memberService.changePass(
        this.member.id,
        this.form2.value.old_pass,
        this.form2.value.new_pass,
        this.form2.value.renew_pass
        );
    }
  }

}