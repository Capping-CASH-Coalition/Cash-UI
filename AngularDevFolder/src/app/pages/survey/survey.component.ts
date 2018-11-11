import { Globals } from './../../globals';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})

export class SurveyComponent {
  constructor(private globals: Globals) {}

  Data: Array<any> = [];

  currSurvey = this.globals.surveys[0].survey_id;

  ngOnInit() {
    console.log(this.globals.surveys)
  }

  uploadData(){
    this.globals.responses.push(this.Data);
    console.log(this.globals.responses[9]);
  }

  changeData(event,responseId: number, surveyId: string, questionId: number){
    this.Data.push([1,this.globals.surveys[0].survey_id,1,1,1,surveyId]);
    console.log(this.Data[0]);
  }

  pageChanged(event){
    console.log("pageChanged")
  }
}

