import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";

export class messageService{

    

    private subjet = new BehaviorSubject<string[]>([])
    errors$:Observable<string[]> = this.subjet.asObservable().pipe(

        filter(messages => messages && messages.length>0)
    );

    showErrors(...errors: string[]){
        this.subjet.next(errors);


    }
}