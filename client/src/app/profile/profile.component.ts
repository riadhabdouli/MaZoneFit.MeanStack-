import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { memberData } from "../member.model";
import { MemberService } from "../member.service";
import { mimeType } from "./mime-type.validator";

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
  form3: any;
  private memberId: any;
  imagePreview: string | ArrayBuffer | null = '';
  constructor(public route: ActivatedRoute,public authService: AuthService, public memberService: MemberService) { }

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


    this.form3 = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      var al: string = "";
      if (paramMap.has("id")) {
        this.memberId = paramMap.get('id');
        this.memberService.getMember(this.memberId).subscribe(memberData => {
          this.member = {
            id: memberData._id,
            first_name: memberData.first_name,
            last_name: memberData.last_name,
            password: memberData.password,
            email: memberData.email,
            height: memberData.height,
            weight: memberData.weight,
            profile_image: memberData.profile_image,
            profession: memberData.profession
          };
          if (memberData.profile_image != "") {
            //console.log(memberData.profile_image);
            // var image = new image();
            this.memberService.getImage(memberData.profile_image).subscribe(data => {
              al = data.toString();
              const imageName = 'name.png';
              const imageBlob = this.dataURItoBlob(al);
              const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
              //console.log(typeof (imageFile));
              this.form3.patchValue({ image: imageFile });
              this.form3.get('image').updateValueAndValidity();
              const reader = new FileReader();
              reader.onload = () => {
                this.imagePreview = reader.result;
              };
              reader.readAsDataURL(imageFile);
            });
          }
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
  //converts string to blob 
  dataURItoBlob(dataURI: string) {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/png' });
      return blob;
  };
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
          this.form1.value.weight,
          this.member.profile_image
        );
      }
  };
  onChangePass(form2: NgForm) {
      if (this.form2.invalid) {
        return;
      } else {
        this.memberService.changePass(
          this.member.id,
          this.form2.value.old_pass,
          this.form2.value.new_pass,
          this.form2.value.renew_pass
        );
      }
  };
  onImagePicked(event: Event) {
      let htmlFiles = (event.target as HTMLInputElement).files;
      let file: Blob = new Blob();
      if (htmlFiles != null) {
        file = htmlFiles[0];
        console.log(typeof (file));
        //this.memberService.convertToBase64(htmlFiles[0]);
      }
      this.form3.patchValue({ image: file });
      this.form3.get('image').updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
  };
  async onUpdateImage(form3: NgForm) {
      if (this.form3.invalid) {
        return;
      } else {
        await this.memberService.updatePicture(
          this.member.id,
          this.member.first_name,
          this.form3.value.image
        );
      }
  };

}