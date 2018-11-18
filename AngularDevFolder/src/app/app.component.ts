import { Component, OnInit } from '@angular/core';
import { SurveyService } from './services/survey.service';
import { Globals } from   './globals';



var Responses: Array<any> = [{ survey_id: 1, question_id: 1, option_id: 1, response_text: "OMFG DUDE" },
{ survey_id: 1, question_id: 1, option_id: 2, response_text: "Support clients/assist in identifying and accessing services" },
{ survey_id: 1, question_id: 1, option_id: 2, response_text: "Support clients/assist in identifying and accessing services" },
{ survey_id: 1, question_id: 1, option_id: 2, response_text: "Support clients/assist in identifying and accessing services" },
{ survey_id: 1, question_id: 1, option_id: 2, response_text: "Support clients/assist in identifying and accessing services" }];

var Surveys: Array<any> = [{ survey_id: 2, question_id: 1, question_num: 1, question_text: "What services do you need?", question_is_active: "true", question_type: "checkbox", option_id: 1, option_num: 1, option_text: "money", option_is_active: "true" },
{ survey_id: 2, question_id: 2, question_num: 2, question_text: "What city are you from?", question_type: "select", option_id: 2, option_num: 1, option_text: "Beacon", option_is_active: "true" },
{ survey_id: 2, question_id: 3, question_num: 3, question_text: "Additional comments:", question_type: "text", option_id: 3, option_num: 1, option_text: "nope", option_is_active: "true" },
{ survey_id: 2, question_id: 4, question_num: 4, question_text: "How can this survey be better?", question_type: "text", option_id: 4, option_num: 1, option_text: "by being over", option_is_active: "true" },
{ survey_id: 2, question_id: 5, question_num: 5, question_text: "In a few words, describe capping:", question_type: "text", option_id: 5, option_num: 1, option_text: "a class you must take to graduate and gain experience", option_is_active: "true" }];

var Updates: Array<any> = [{ survey_id: 2, question_id: 1, question_num: 1, question_text: "What services do you need?", question_is_active: "true", question_type: "checkbox", option_id: 1, option_num: 1, option_text: "money", option_is_active: "true" },
{ survey_id: 2, question_id: 2, question_num: 2, question_text: "What city are you from?", question_type: "select", option_id: 2, option_num: 1, option_text: "Beacon", option_is_active: "true" },
{ survey_id: 2, question_id: 3, question_num: 3, question_text: "Additional comments:", question_type: "text", option_id: 3, option_num: 1, option_text: "nope", option_is_active: "true" },
{ survey_id: 2, question_id: 4, question_num: 4, question_text: "How can this survey be better?", question_type: "text", option_id: 4, option_num: 1, option_text: "by being over", option_is_active: "true" },
{ survey_id: 2, question_id: 5, question_num: 5, question_text: "In a few words, describe capping:", question_type: "text", option_id: 5, option_num: 1, option_text: "a class you must take to graduate and gain experience", option_is_active: "true" }];

var FormValues = {
  SurveyName: "Lindas Survey",
  questions: [
    {
      questionText: "What is your favorite City?",
      questionType: "mc",
      questionOptions: [
        {
          option: "New York City"
        },
        {
          option: "Boston"
        },
        {
          option: "Washington"
        },
        {
          option: "Miami"
        },
        {
          option: "Poughkeepsie"
        }
      ]

    },
    {
      questionText: "Select the services that ou need: ",
      questionType: "checkboxes",
      questionOptions: [
        {
          option: "More Money"
        },
        {
          option: "More Time"
        },
        {
          option: "More Clothes"
        },
        {
          option: "Less Capping Work"
        }
      ]
    }]
}

var FormValues1 = {
  SurveyID: 1,
  SurveyName: "Lindas Survey",
  questions: [
    {
      questionID: 5,
      questionText: "What is your favorite City?",
      questionIsActive: true,
      questionType: "mc",
      questionOptions: [
        {
          optionID: 5,
          option: "New York City",
          option_is_active: true
        },
        {
          optionID: 7,
          option: "Boston",
          option_is_active: true
        },
        {
          optionID: 8,
          option: "Washington",
          option_is_active: true
        },
        {
          optionID: "",
          option: "Miami",
          option_is_active: true
        },
        {
          optionID: 10,
          option: "Poughkeepsie",
          option_is_active: true
        }
      ]

    },
    {
      questionID: "",
      questionText: "Select the services that ou need: ",
      questionIsActive: true,
      questionType: "checkboxes",
      questionOptions: [
        {
          optionID: 1,
          option: "More Money",
          option_is_active: true
        },
        {
          optionID: 2,
          option: "More Time",
          option_is_active: false
        },
        {
          optionID: 3,
          option: "More Clothes",
          option_is_active: true
        },
        {
          optionID: "",
          option: "Less Capping Work",
          option_is_active: true
        }
      ]
    }]
}
function wait(ms): void {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SurveyService]
})

export class AppComponent {




  public questions: Array<any>;
  public results: Array<any>;
  public options: Array<any>;
  public responses: Array<any>;
  public surveys: Array<any>;
  public updates: Array<any>;
  questionID;
  optionID;
  surveyID;
  questionNum;
  constructor(private surveyService: SurveyService) { }








  ngOnInit() {


     /*this.surveyService.getSurveyQuestions('hi').subscribe((response)=>{
           this.questions = [];
           //console.log('response is ', response);
           for (let i = 0; i < response.length; i++) {
   
             let qArray =
             {
               
               "question_id": response[i].question_id,
               "question_text": response[i].question_text,
               "question_type": response[i].question_type,
               "question_is_active": response[i].question_is_active
             };
                 
             surveys.questions[i].push(qArray);
   
           }
           console.log(this.questions);
   },(error) => {
           console.log('error is ', error)
       })
    this.surveyService.getOptions('hi').subscribe((response) => {
      this.surveyService.getSurveyResponses('hi').subscribe((response)=>{
           this.results= [];
           //console.log('response is ', response);
           for (let i = 0; i < response.length; i++) {
   
             let rArray =
             {
              
            
               "option_id": response[i].option_id,
               "option_text": response[i].option_text,
               "option_is_active": response[i].option_is_active,
               "question_id": response[i].question_id
             };
             for (let j = 0; j < surveys.questions.)
               this.results.push(rArray);
   
           }
           console.log(this.results);
   },(error) => {
           console.log('error is ', error)
       })
       /*for(let j =0; j<Responses.length; j++){
       this.surveyService.postSurveyResponse(Responses[j]).subscribe((response)=>{
           this.responses = [];
           //console.log('response is ', response);
           for (let i = 0; i < response.length; i++) {
              
             let sArray =
             {
               "question_id": response[i].question_id,
               "survey_id": response[i].survey_id,
               "option_id": response[i].option_id,
               "response_text": response[i].response_text
               }
                 ;
               this.responses.push(sArray);
               console.log(this.responses);
           }
           
   },(error) => {
           console.log('error is ', error)
       })
       } 
    this.surveyService.getQuestionLength().subscribe((response) => {
      this.questionID = response[0];
      this.surveyService.getOptionLength().subscribe((value) => {
        this.optionID = value[0];
        this.surveyService.getSurveyLength().subscribe((data) => {
          this.surveyID = data[0];
          this.surveyID = this.surveyID + 1;
          let insertSurveyID = { "survey_name": FormValues.SurveyName };
          this.surveyService.postSurveyID(insertSurveyID).subscribe((response) => {
          }, (error) => {
            console.log('error is ', error)
          });
          wait(50);
          for (let j = 0; j < FormValues.questions.length; j++) {
            this.questionID = this.questionID + 1;
            wait(50);
            let insertQuestionsArray = { "question_text": FormValues.questions[j].questionText, "question_type": FormValues.questions[j].questionType };
            wait(50);
            this.surveyService.postQuestionID(insertQuestionsArray).subscribe((response) => {
            }, (error) => {
              console.log('error is ', error)
            });
            for (let i = 0; i < FormValues.questions[j].questionOptions.length; i++) {
              this.optionID = this.optionID + 1;
              let insertOptionIDArray = { "option_text": FormValues.questions[j].questionOptions[i].option, "question_id": this.questionID }
              wait(50);
              this.surveyService.postOptionID(insertOptionIDArray).subscribe((response) => {
              }, (error) => {
                console.log('error is ', error)
              });
              let insertArchitecturesArray = { "survey_id": this.surveyID, "question_id": this.questionID, "option_id": this.optionID };
              wait(50);
              this.surveyService.postArchitectures(insertArchitecturesArray).subscribe((response) => {
              }, (error) => {
                console.log('error is ', error)
              })
            }
          }
        }, (error) => {
          console.log('error is ', error)
        })
      }, (error) => {
        console.log('error is ', error)
      })
    }, (error) => {
      console.log('error is ', error)
    })*/

    this.surveyService.getQuestionLength().subscribe((response) => {
      this.questionID = response[0];

      this.surveyService.getOptionLength().subscribe((value) => {
        this.optionID = value[0];

        this.surveyService.getSurveyLength().subscribe((data) => {
          this.surveyID = data[0];
          for (let i = 0; FormValues1.questions.length; i++) {
            if (FormValues1.questions[i].questionID == "") {
              this.questionID = this.questionID + 1;
              let insertUpdateQuestion = { "question_text": FormValues1.questions[i].questionText, "question_type": FormValues1.questions[i].questionType };
              wait(50);
              this.surveyService.postQuestionID(insertUpdateQuestion).subscribe((response) => {
              }, (error) => {
                console.log('error is ', error)
              });
              for (let j = 0; FormValues1.questions[i].questionOptions.length; j++) {
                this.optionID = this.optionID + 1;
                let insertUpdateOption = { "option_text": FormValues1.questions[i].questionOptions[j].option, "question_id": this.questionID };
                this.surveyService.postOptionID(insertUpdateOption).subscribe((response) => {
                }, (error) => {
                  console.log('error is ', error)
                });
                let insertUpdateArchitectures = { "survey_id": FormValues1.SurveyID, "question_id": this.questionID, "option_id": this.optionID };
                this.surveyService.postArchitectures(insertUpdateArchitectures).subscribe((response) => {
                }, (error) => {
                  console.log('error is ', error)
                });
              }
            }
            if (FormValues1.questions[i].questionID != "") {
              let updateQuestion = {
                "question_id": FormValues1.questions[i].questionID, "question_text": FormValues1.questions[i].questionText, "question_is_active": FormValues1.questions[i].questionIsActive, "question_type": FormValues1.questions[i].questionType
              };
              this.surveyService.updateSurveyQuestion(updateQuestion).subscribe((response) => {
              }, (error) => {
                console.log('error is ', error)
              });
              for (let j = 0; FormValues1.questions[i].questionOptions.length; j++) {
                if (FormValues1.questions[i].questionOptions[j].option == "") {
                  this.optionID = this.optionID + 1;
                  let insertOption = { "option_text": FormValues1.questions[i].questionOptions[j].option, "question_id": FormValues1.questions[i].questionID }; 
                  this.surveyService.postOptionID(insertOption).subscribe((response) => {
                  }, (error) => {
                    console.log('error is ', error)
                  });
                  let insertArchitectures = { "survey_id": FormValues1.questions, "question_id": FormValues1.questions[i].questionID, "option_id": this.optionID }
                  this.surveyService.postArchitectures(insertArchitectures).subscribe((response) => {
                  }, (error) => {
                    console.log('error is ', error)
                  });
                }
                if (FormValues1.questions[i].questionOptions[j].option != "") {
                  let insertOption = { "option_id": FormValues1.questions[i].questionOptions[j].optionID, "option_is_active": FormValues1.questions[i].questionOptions[j].option_is_active };
                  this.surveyService.updateSurveyOption(insertOption).subscribe((response) => {
                  }, (error) => {
                    console.log('error is ', error)
                  });
                }
              }
            }
          }
        }, (error) => {
          console.log('error is ', error)
        })
      }, (error) => {
        console.log('error is ', error)
      })
    }, (error) => {
      console.log('error is ', error)
    })















    /*for(let j =0; j <Surveys.length; j++){
    this.surveyService.postSurveyResponses(Su[j]).subscribe((response)=>{
        this.surveys = [];
        //console.log('response is ', response);
        for (let i = 0; i < response.length; i++) {
    
            let lArray =
            {
            "question_id": response[i].question_id,
              "question_num": response[i].question_num,
              "question_text": response[i].question_text,
            "question_is_active": response[i].question_is_active,
            "question_type": response[i].question_type,
            "option_id": response[i].option_id,
            "option_num": response[i].option_num,
            "option_text": response[i].option_text,
            "option_is_active": response[i].option_is_active
            
           
          }
              ;
            this.surveys.push(lArray);
    
        }
        console.log(this.surveys);
    },(error) => {
        console.log('error is ', error)
    })
    }
    
        for (let j = 0; j < Updates.length; j++) {
          if (Updates[j].question_id = '') {
            this.surveyService.insertSurveyQuestions(Updates[j]).subscribe((response) => {
              this.updates = [];
              //console.log('response is ', response);
              for (let i = 0; i < response.length; i++) {
    
                let mArray =
                {
                  "question_num": response[i].question_num,
                  "question_text": response[i].question_text,
                  "question_is_active": response[i].question_is_active,
                  "question_type": response[i].question_type,
                  "option_id": response[i].option_id,
                  "option_num": response[i].option_num,
                  "option_text": response[i].option_text,
                  "option_is_active": response[i].option_is_active
                }
                  ;
                this.updates.push(mArray);
    
              }
              console.log(this.updates);
            }, (error) => {
              console.log('error is ', error)
            })
          }
          if (Updates[j].question_id != '') {
            this.surveyService.updateSurveyQuestions(Updates[j]).subscribe((response) => {
              this.updates = [];
              //console.log('response is ', response);
              for (let i = 0; i < response.length; i++) {
    
                let dArray =
                {
                  "question_id": response[i].question_id,
                  "question_num": response[i].question_num,
                  "question_text": response[i].question_text,
                  "question_is_active": response[i].question_is_active,
                  "question_type": response[i].question_type,
                  "option_id": response[i].option_id,
                  "option_num": response[i].option_num,
                  "option_text": response[i].option_text,
                  "option_is_active": response[i].option_is_active,
                  "response_id": response[i].response_id,
                  "survey_id": response[i].survey_id
                }
                  ;
                this.updates.push(dArray);
    
              }
              console.log(this.updates);
            }, (error) => {
              console.log('error is ', error)
            })
          }
        }*/






  }



}