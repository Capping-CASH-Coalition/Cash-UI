//import { Globals } from './../../globals';
import { Component, ChangeDetectionStrategy, DoCheck, OnInit, ChangeDetectorRef } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { SurveyService } from '../../services/survey.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Question } from '../../models/question.model';
import { Response } from '../../models/response.model';
import { Option } from '../../models/option.model';
import { SurveyInfo } from 'app/models/surveyInfo.model';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SurveyService]
})

export class SurveyComponent implements OnInit, DoCheck {

  /* 
      Variables for the Survey Component
  */

  // Shows the survey div when true
  showSurveyDiv: boolean = false;
  // Holds the dynamic survey variables for display
  surveys: Array<any> = [];
  // Survey variables set by surveySelect()
  selectedSurveyId: number;
  selectedSurveyIndex: number;
  // Option_id that is set by optionSelect()
  selectedOption: number;
  // Fills when multiple choices are selected by updateResponses()
  checkboxChoices: Array<any> = [];
  // Pushes/pops when user selects next or previous
  surveyData: Array<any> = [];
  // Unique user hash
  currentUser: string;
  // Pagination element uses this
  public config: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 1,
    currentPage: 1
  };

  // Declare the imports to be used within the component
  constructor(public surveyService: SurveyService,
              public auth: AuthenticationService,
              private changeref: ChangeDetectorRef) { }

  /*
      Survey Landing/Home page functions
  */

  // This continuously checks if the user is authenticated
  ngDoCheck(): void {
    // If authenticated, redirect to the home dashboard
    if (!this.auth.isAuthenticated) {
      //this.router.navigate(['home']);
    }
  }

  // On component initialization, get the survey ids, names, and date created
  ngOnInit(): void {
    this.surveyService.getActiveSurveys().subscribe(response => {
        // Get 1 survey at a time and push into surveys array
        for (let i = 0; i < response.body.length; i++) {
          let survey: SurveyInfo = {
                "survey_id": response.body[i].survey_id,
                "survey_name": response.body[i].survey_name,
                "date_created": response.body[i].date_created,
                "survey_is_active": response.body[i].survey_is_active
          };
          this.surveys.push(survey);
        }
        this.changeref.detectChanges();
    }, (error) => {
      console.log('error is ', error)
    })
  }

  // When a user clicks a survey in the dropdown, save the selectedSurveyId
  surveySelect($event, value) {
    this.selectedSurveyId = value;
    for (let i = 0; i < this.surveys.length; i++) {
      if (this.selectedSurveyId == this.surveys[i].survey_id) {
        this.selectedSurveyIndex = i;
      }
    }
  }

  generateUUID(): string {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // When the user clicks start, get the survey questions and options based on the survey id
  onStart(): void {
    // set survey div to true to be displayed
    this.showSurveyDiv = true;
    // Generate unique user hash
    this.currentUser = this.generateUUID();
    // Get the survey questions by selectedSurveyId
    this.surveyService.getSurveyQuestions(this.selectedSurveyId).subscribe(response => {
      // Initialize the questions
      this.surveys[this.selectedSurveyIndex].questions = [];
      // Iterate through the questions and push them one at a time
      for (let i = 0; i < response.body.length; i++) {
        let question: Question = {
              "question_id": response.body[i].question_id,
              "question_text": response.body[i].question_text,
              "question_type": response.body[i].question_type,
              "question_is_active": response.body[i].question_is_active,
              options: []
        };
        this.surveys[this.selectedSurveyIndex].questions.push(question);
      }
      this.changeref.detectChanges();
      
      // Get the survey options based on the selectedSurveyId
      this.surveyService.getSurveyOptions(this.selectedSurveyId).subscribe(response => {
        for (let j = 0; j < this.surveys[this.selectedSurveyIndex].questions.length; j++) {
          for (let k = 0; k < response.body.length; k++) {
            let option: Option = {
                  "option_id": response.body[k].option_id,
                  "option_text": response.body[k].option_text,
                  "option_is_active": response.body[k].option_is_active,
                  "question_id": response.body[k].question_id
            };
            // If the question IDs match, push the option into the questions[j].options array
            if (this.surveys[this.selectedSurveyIndex].questions[j].question_id == response.body[k].question_id) {
              this.surveys[this.selectedSurveyIndex].questions[j].options.push(option);
            }
          }
        }
        this.changeref.detectChanges();
      }, (error) => {
        console.log('error is ', error)
      }) 
    },(error) => {
      console.log('error is ', error)
    })
  }

  /*
      Survey Functions
  */

  // When next button is clicked, save the selected options to the survey data object
  updateResponses(textValue: string, questionIndex: number) {
    // Response object mirrors the database response table
    let response: Response = {
          survey_id: 0,
          question_id: 0,
          option_id: 0,
          response_text: "",
          survey_hash: this.currentUser
    };
    
    // If question type is select or multiple choice, only need to add 1 response
    if (this.surveys[this.selectedSurveyIndex].questions[questionIndex].question_type == "select" ||
        this.surveys[this.selectedSurveyIndex].questions[questionIndex].question_type == "radio") {
          // Initialize values to prevent duplication
          response = { 
            survey_id: 0,
            question_id: 0,
            option_id: 0,
            response_text: "",
            survey_hash: this.currentUser
          };

          response.survey_id = this.selectedSurveyId; // Survey ID
          response.question_id = this.surveys[this.selectedSurveyIndex].questions[questionIndex].question_id; // Question ID
          response.option_id = this.selectedOption; // Option ID
          response.response_text = this.getResponseText(this.selectedOption, questionIndex); // Response text
          // Push to survey data array
          console.log("pushing to surveyData: " + this.selectedOption);
          this.surveyData.push(response);
    // If question type is checkbox, check for multiple responses
    } else if (this.surveys[this.selectedSurveyIndex].questions[questionIndex].question_type == "checkbox") {
      // Iterate through the options that were selected
      for (let i = 0; i < this.checkboxChoices.length; i++) {
        // Initialize response to prevent duplication
          response = { 
          survey_id: 0,
          question_id: 0,
          option_id: 0,
          response_text: "",
          survey_hash: this.currentUser
        };

        response.survey_id = this.selectedSurveyId; // Survey ID
        response.question_id = this.surveys[this.selectedSurveyIndex].questions[questionIndex].question_id; // Question ID
        response.option_id = this.checkboxChoices[i]; // Option ID
        response.response_text = this.getResponseText(this.checkboxChoices[i], questionIndex); // Response text
        console.log("pushing to surveyData: " + this.checkboxChoices[i]);
        // Push to survey data array
        this.surveyData.push(response);
      }
      // Initialize checkboxChoices
      this.checkboxChoices = [];
    // If question type is text (open-ended), set option id to 1
    } else if (this.surveys[this.selectedSurveyIndex].questions[questionIndex].question_type == "text") {
      // Initialize response to prevent duplication
      response = { 
        survey_id: 0,
        question_id: 0,
        option_id: 0,
        response_text: "",
        survey_hash: this.currentUser
      };

      response.survey_id = this.selectedSurveyId; // Survey ID
      response.question_id = this.surveys[this.selectedSurveyIndex].questions[questionIndex].question_id; // Question ID
      response.option_id = this.surveys[this.selectedSurveyIndex].questions[questionIndex].options[0].option_id; // Option ID
      response.response_text = textValue; // Response text

      console.log("pushing to surveyData: " + textValue);
      this.surveyData.push(response);
    }
    console.log(this.surveyData);
  }

  // This is called to find the selected options within the HTML
  optionSelect(event, value, questionType): void {
    // If question type is select or multiple choice, there is only 1 selected value
    if (questionType == "select" || questionType == "radio") {
      this.selectedOption = value;
    // If question type is checkbox, there is 1+ options
    } else if (questionType == "checkbox") {
      // event is the clicked HTML element
      if (event) {
        // If checked, add it to the checkboxChoice array
        if (event.target.checked) {
          this.checkboxChoices.push(value);
        // If unchecked, remove it from the checkboxChoice array
        } else {
          // Iterate through the checkbox choices to see which matches the value
          for (let i = 0; i < this.checkboxChoices.length; i++) {
            // If it matches, remove it from checkboxChoice array
            if (this.checkboxChoices[i] == value) {
              this.checkboxChoices.splice(i, 1);
            }
          }
        }
      }
    }
  }

  // Returns the option text as the response_text
  getResponseText(optionId, questionIndex): string {
    // Iterate through the question's options
    for (let option of this.surveys[this.selectedSurveyIndex].questions[questionIndex].options) {
      if (optionId == option.option_id) {
        console.log("Matched option text: " + option.option_text);
        return option.option_text;
      }
    }
  }

  // Gets called
  getQuestionIndex(questionId): number {
    for (let i = 0; i < this.surveys[this.selectedSurveyIndex].questions.length; i++) {
      if (questionId == this.surveys[this.selectedSurveyIndex].questions[i].question_id) {
        return i;
      }
    };
  }

  // Gets called when previous button is clicked
  removeResponse(questionIndex: number, currentPage: number) {
    if (this.surveys[this.selectedSurveyIndex].questions[questionIndex].question_type == "checkbox") {
      // Pop 1 for each response in surveyData that matches the current question ID
      for (let i = this.surveyData.length - 1; i > 0; i--) {
        if (this.surveyData[i].question_id == this.surveys[this.selectedSurveyIndex].questions[questionIndex].question_id) {
          this.surveyData.pop();
        }
      }
      console.log(this.surveyData);
    // If question type is text (open-ended), multiple choice, or dropdown/select, pop 1
    } else {
      this.surveyData.pop();
    }
  }

  // When submit button is hit, this will post the survey data to the database
  postOnSubmit() {
    // Post the surveyData array to the API
    this.surveyService.postSurveyResponse(this.surveyData).subscribe();
  }

}
