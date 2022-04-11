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

    this.getTrainer();
  }

  getTrainer(){
    console.log("test");


    
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        this.TrainerId = paramMap.get('id');
        
        this.trainerService.getTrainer(this.TrainerId).subscribe(data => {
          this.trainer = {
            id: data._id,
            first_name: data.first_name,
            last_name: data.last_name,
            profile_image: data.profile_image,
            introduction: "test"
          };
          console.log("sdfasdf",this.trainer);

          
         
         
        })
      }
    });
     
    }
  };

