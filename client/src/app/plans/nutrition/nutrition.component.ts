import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { nutritionData } from "../nutrition.model";
import { MemberService } from "src/app/member.service";
import { AuthService } from "src/app/auth/auth.service";
import { plansService } from "../plans.service";


@Component({
	selector: 'app-nplan',
	templateUrl: './nutrition.component.html',
	styleUrls: ['./nutrition.component.css']
})
export class nutrtionPlan implements OnInit {

	constructor(public route: ActivatedRoute,
		public authService: AuthService,
		public memberService: MemberService,
		public plansService: plansService) { }

		ngOnInit(): void {
		}

}