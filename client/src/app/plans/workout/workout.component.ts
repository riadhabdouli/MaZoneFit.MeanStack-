import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";


@Component({
	selector: 'app-wplan',
	templateUrl: './workout.component.html',
	styleUrls: ['./workout.component.css']
})
export class workoutPlan implements OnInit {
	nutriForm : any;

	ngOnInit(): void {

	}

	onSave(form : NgForm){

	}
}