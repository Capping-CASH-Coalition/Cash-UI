import { Injectable } from '@angular/core';
import { SurveyService } from '../app/survey.service';

@Injectable()
export class Globals {
    public version: number = 1;
    public yearCreated: Date = new Date(2018);
    public surveyTakenId: number;
    public name: string = "Questionnaire_Test";
    public questions: Array<any> = [{question_id: 1, question_num: 1, question_text: "What services do you need?", question_type: "checkbox"},
                                    {question_id: 2, question_num: 2, question_text: "What city are you from?", question_type: "select"},
                                    {question_id: 3, question_num: 3, question_text: "Additional comments:", question_type: "text"}];
    public options: Array<any> = [{question_id: 1, option_num: 1, option_text: "CASH", option_id: 1},
                                    {question_id: 1, option_num: 2, option_text: "Dress for success", option_id: 2},
                                    {question_id: 1, option_num: 3, option_text: "Food Pantry", option_id: 3},
                                    {question_id: 2, option_num: 1, option_text: "Hyde Park", option_id: 4},
                                    {question_id: 2, option_num: 2, option_text: "Poughkeepsie", option_id: 5},
                                    {question_id: 2, option_num: 3, option_text: "Wappingers", option_id: 6},
                                    {question_id: 3, option_num: 1, option_text: "Response:", option_id: 7}];
    
    responses: Array<any> = [{version: 1, surveyTakenId: 1, question_id: 1, response_id: 1, response_text: "Dress for success"},
                             {version: 1, surveyTakenId: 1, question_id: 1, response_id: 2, response_text: "CASH"},
                             {version: 1, surveyTakenId: 1, question_id: 2, response_id: 3, response_text: "Hyde Park"},
                             {version: 1, surveyTakenId: 1, question_id: 3, response_id: 4, response_text: "This survey rocks!"}];
    personId: number;
    yearTaken: Date;
    email: string;
    firstName: string;
    lastName: string;


    /*

    DONT DELETE



    constructor(private surveyService: SurveyService) {
        
        
        
        
        this.surveyService.getQuestions().subscribe((response)=>{
            this.questions = [];
            console.log('response is ', response);
            for (let i = 0; i < response.length; i++) {
            if (response[i].survey_version == 1) {
                this.version = 1;
                let qArray = 
                {"question_num": response[i].question_num, 
                "question_id": response[i].question_id, 
                "question_text": response[i].question_text, 
                "question_type": response[i].question_type}
                ;
                this.questions.push(qArray);
            }
            }
            console.log(this.questions);
            this.surveyService.getOptions().subscribe((response)=>{
            this.options = [];
            console.log('response is ', response);
            for (let i = 0; i < this.questions.length; i++) {
                console.log(response[i]);
                for (let j = 0; j < response.length; j++) {
                if (response[j].question_id == this.questions[i].question_id) {
                    let rArray = [
                    {"option_id": response[i].option_id, 
                    "option_num": response[i].option_num, 
                    "option_text": response[i].option_text}
                    ];
                    this.options.push(rArray);
                }
                }
            }
            //console.log(this.options);
            },(error) => {
                console.log('error is ', error)
            })
        },(error) => {
            console.log('error is ', error)
        })
     }*/

}
