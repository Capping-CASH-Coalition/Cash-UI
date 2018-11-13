import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'GraphableQuestion'
})

export class FilterByGraphableQuestionPipe implements PipeTransform {

    transform(questions : any): any[] {
        if (questions) {
            return questions.filter((question: any) => question.question_type != 'text');
        }
    }
}