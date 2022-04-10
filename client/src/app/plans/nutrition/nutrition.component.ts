import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { nutritionData } from "../nutrition.model";
import { MemberService } from "src/app/member.service";
import { AuthService } from "src/app/auth/auth.service";
import { plansService } from "../plans.service";

@Component({
  selector: "app-nplan",
  templateUrl: "./nutrition.component.html",
  styleUrls: ["./nutrition.component.css"],
})
export class nutrtionPlan implements OnInit {
  nutriForm: any;
  memberId: any;
  nutriPlan: any;
  nutriData: nutritionData[] = [];
  profession: any;
  trainer: any;
  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public memberService: MemberService,
    public plansService: plansService
  ) {}

  ngOnInit() {
    this.nutriForm = new FormGroup({
      Breakfast1: new FormControl(null, { validators: [] }),
      Breakfast2: new FormControl(null, { validators: [] }),
      Breakfast3: new FormControl(null, { validators: [] }),
      Breakfast4: new FormControl(null, { validators: [] }),
      Breakfast5: new FormControl(null, { validators: [] }),
      Breakfast6: new FormControl(null, { validators: [] }),
      Breakfast7: new FormControl(null, { validators: [] }),
      Lunch1: new FormControl(null, { validators: [] }),
      Lunch2: new FormControl(null, { validators: [] }),
      Lunch3: new FormControl(null, { validators: [] }),
      Lunch4: new FormControl(null, { validators: [] }),
      Lunch5: new FormControl(null, { validators: [] }),
      Lunch6: new FormControl(null, { validators: [] }),
      Lunch7: new FormControl(null, { validators: [] }),
      Dinner1: new FormControl(null, { validators: [] }),
      Dinner2: new FormControl(null, { validators: [] }),
      Dinner3: new FormControl(null, { validators: [] }),
      Dinner4: new FormControl(null, { validators: [] }),
      Dinner5: new FormControl(null, { validators: [] }),
      Dinner6: new FormControl(null, { validators: [] }),
      Dinner7: new FormControl(null, { validators: [] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.memberId = paramMap.get("id");
		this.authService.getMember(this.memberId).subscribe((memberData) => {
			this.profession = memberData.profession;
		  });
		  
	 if (this.profession == "member") {
        this.plansService.getNPlan(this.memberId).subscribe((nutriData) => {
          this.nutriPlan = {
            Monday: nutriData.Monday,
            Tuesday: nutriData.Tuesday,
            Wednesday: nutriData.Wednesday,
            Thursday: nutriData.Thursday,
            Friday: nutriData.Friday,
            Saturday: nutriData.Saturday,
            Sunday: nutriData.Sunday,
          };
          this.nutriForm.setValue({
            Breakfast1: this.nutriPlan.Monday[0],
            Breakfast2: this.nutriPlan.Tuesday[0],
            Breakfast3: this.nutriPlan.Wednesday[0],
            Breakfast4: this.nutriPlan.Thursday[0],
            Breakfast5: this.nutriPlan.Friday[0],
            Breakfast6: this.nutriPlan.Saturday[0],
            Breakfast7: this.nutriPlan.Sunday[0],
            Lunch1: this.nutriPlan.Monday[1],
            Lunch2: this.nutriPlan.Tuesday[1],
            Lunch3: this.nutriPlan.Wednesday[1],
            Lunch4: this.nutriPlan.Thursday[1],
            Lunch5: this.nutriPlan.Friday[1],
            Lunch6: this.nutriPlan.Saturday[1],
            Lunch7: this.nutriPlan.Sunday[1],
            Dinner1: this.nutriPlan.Monday[2],
            Dinner2: this.nutriPlan.Tuesday[2],
            Dinner3: this.nutriPlan.Wednesday[2],
            Dinner4: this.nutriPlan.Thursday[2],
            Dinner5: this.nutriPlan.Friday[2],
            Dinner6: this.nutriPlan.Saturday[2],
            Dinner7: this.nutriPlan.Sunday[2],
          });
        });
	} 
        if (this.profession == "trainer") {
			this.authService.getTrainer(this.memberId).subscribe((TrainerData) => {
				this.trainer = {
					id: TrainerData._id,
					first_name: TrainerData.first_name,
					last_name: TrainerData.last_name,
					email: TrainerData.email,
					profile_image: TrainerData.profile_image,
					profession: TrainerData.profession,
					members: TrainerData.members
				}
				console.log(this.trainer);
			  });
        }
      }
    });
  }

  getMembers(id: string) {}
}
