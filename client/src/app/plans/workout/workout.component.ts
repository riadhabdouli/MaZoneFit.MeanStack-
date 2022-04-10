import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { workoutData } from "../workout.model";
import { MemberService } from "src/app/member.service";
import { AuthService } from "src/app/auth/auth.service";
import { plansService } from "../plans.service";

@Component({
  selector: "app-wplan",
  templateUrl: "./workout.component.html",
  styleUrls: ["./workout.component.css"],
})
export class workoutPlan implements OnInit {
  workoutForm: any;
  memberId: any;
  workoutPlan : any;
  workoutData : workoutData[] = [];
  profession : any;


  constructor(public route: ActivatedRoute,
	public authService: AuthService,
	public memberService: MemberService,
	public plansService: plansService) { }


  ngOnInit(): void {
    this.workoutForm = new FormGroup({
      S1Monday: new FormControl(null, { validators: [] }),
      S1Tuesday: new FormControl(null, { validators: [] }),
      S1Wednesday: new FormControl(null, { validators: [] }),
      S1Thursday: new FormControl(null, { validators: [] }),
      S1Friday: new FormControl(null, { validators: [] }),
      S1Saturday: new FormControl(null, { validators: [] }),
      S1Sunday: new FormControl(null, { validators: [] }),

      S2Monday: new FormControl(null, { validators: [] }),
      S2Tuesday: new FormControl(null, { validators: [] }),
      S2Wednesday: new FormControl(null, { validators: [] }),
      S2Thursday: new FormControl(null, { validators: [] }),
      S2Friday: new FormControl(null, { validators: [] }),
      S2Saturday: new FormControl(null, { validators: [] }),
      S2Sunday: new FormControl(null, { validators: [] }),
    });
	this.route.paramMap.subscribe((paramMap: ParamMap) => {
		if (paramMap.has("id")) {
			this.memberId = paramMap.get('id');
			this.plansService.getNPlan(this.memberId).subscribe(workoutData => {
			  this.workoutPlan = {
				 Monday: workoutData.Monday,
				 Tuesday: workoutData.Tuesday,
				 Wednesday: workoutData.Wednesday,
				 Thursday:workoutData.Thursday,
				 Friday: workoutData.Friday,
				 Saturday: workoutData.Saturday,
				 Sunday:workoutData.Sunday
			  }
			  this.workoutForm.setValue({
				S1Monday: this.workoutPlan.Monday[0],
				S1Tuesday: this.workoutPlan.Tuesday[0],
				S1Wednesday: this.workoutPlan.Wednesday[0],
				S1Thursday: this.workoutPlan.Thursday[0],
				S1Friday: this.workoutPlan.Friday[0],
				S1Saturday: this.workoutPlan.Saturday[0],
				S1Sunday: this.workoutPlan.Sunday[0],

				S2Monday: this.workoutPlan.Monday[1],
				S2Tuesday: this.workoutPlan.Tuesday[1],
				S2Wednesday: this.workoutPlan.Wednesday[1],
				S2Thursday: this.workoutPlan.Thursday[1],
				S2Friday: this.workoutPlan.Friday[1],
				S2Saturday: this.workoutPlan.Saturday[1],
				S2Sunday: this.workoutPlan.Sunday[1],
			});
		})
	this.authService.getMember(this.memberId).subscribe(memberData => {
     	this.profession = memberData.profession;
	});
	  }
		});
}

  onSave(workoutForm: NgForm) {

  }

}
