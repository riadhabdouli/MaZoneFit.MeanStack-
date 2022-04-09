import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../profile/mime-type.validator';
import { TrainerData } from '../trainer.model';
import { TrainerService } from '../trainer.service';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './trainer-view.component.html',
  styleUrls: ['./trainer-view.component.css']
})
export class TrainerViewComponent implements OnInit {
  trainer: any;
  TrainerData: TrainerData[] = [];
  details: any;
  image: any;

  private TrainerId: any;
  constructor(public route: ActivatedRoute, public trainerService: TrainerService) { }



  ngOnInit() {
    this.details = new FormGroup({
      first_name: new FormControl(null, { validators: [] }),
      last_name: new FormControl(null, { validators: [] }),
      introduction: new FormControl(null, { validators: [] })
    });
    this.image = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });

    
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.TrainerId = paramMap.get('id');
        this.trainerService.getTrainer(this.TrainerId).subscribe(trainerData => {
          this.trainer = {
            id: trainerData._id,
            first_name: trainerData.first_name,
            last_name: trainerData.last_name,
            profile_image: trainerData.profile_image,
            introduction: "test"
          };

          console.log("sdfasdf");
          this.details.setValue({
            first_name: this.trainer.first_name,
            last_name: this.trainer.last_name,
            introduction: this.trainer.introduction
          });
         
          console.log('this.details',this.details);
        })
      }
    });
  }

}
