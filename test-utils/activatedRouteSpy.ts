import { Observable, of } from "rxjs";

export class ActivatedRouteSpy {
    queryParamMap!: {
        subscribe: () => Observable<any>
    }
    snapshot!: {
        queryParamMap:
        {
          get: ()=> string
        },
        data: any
      }
      constructor(){
          this.queryParamMap = {subscribe: ()=> of("someValueAsString")};
          this.snapshot = {queryParamMap: {get: ()=> "someValueAsString"}, data: {}}
      }
}