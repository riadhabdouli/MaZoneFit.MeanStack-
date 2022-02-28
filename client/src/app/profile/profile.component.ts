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
  form: any;
  private memberId: any;

  constructor(public route: ActivatedRoute,
    public authService: AuthService,
    public memberService: MemberService) { }

  ngOnInit() {
    this.form = new FormGroup({
      first_name: new FormControl(null, { validators: [] }),
      last_name: new FormControl(null, { validators: [] }),
      email: new FormControl(null, { validators: [] }),
      password: new FormControl(null, { validators: [] }),
      height: new FormControl(null, { validators: [] }),
      weight: new FormControl(null, { validators: [] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("email")) {
        this.memberId = paramMap.get('email');
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
         
          this.form.setValue({
            first_name: this.member.first_name,
            last_name: this.member.last_name,
            email: this.member.email,
            password: this.member.password,
            height: this.member.height,
            weight: this.member.weight
          });
        })
      }
    });
  }

  onUpdate(form: NgForm) {
    if (this.form.invalid) {
      return;
    } else {
      this.memberService.updateMember(
        this.member.id,
        this.form.value.first_name,
        this.form.value.last_name,
        this.form.value.email,
        this.form.value.password,
        this.form.value.weight,
        this.form.value.height
      );
    }
  };


}