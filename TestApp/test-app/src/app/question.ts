export interface Question { 
    question:string;
    answer:[{option:string, correct:boolean}, {option:string, correct:boolean}, {option:string, correct:boolean}, {option:string, correct:boolean}];
}