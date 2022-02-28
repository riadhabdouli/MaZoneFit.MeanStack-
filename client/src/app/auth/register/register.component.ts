import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
	private authStatusSub: Subscription = new Subscription;
	checkField = true;

	constructor(
		private authService: AuthService,
	) { }

	ngOnInit() {
		this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
			authStatus => { }
		);
	}

	onSignup(form: NgForm) {
		if (form.invalid) {
			return;
		}
		this.authService.createUser(form.value.firstname,form.value.lastname,form.value.email, form.value.password);
	}
	ngOnDestroy() {
		this.authStatusSub.unsubscribe();
	}


}
