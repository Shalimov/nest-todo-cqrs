import { IAggregateRoot } from "@/domain/seedWork/IAggregateRoot";

export class TodoReport implements IAggregateRoot {
    #inprogressCount: number;
    #completedCount: number;
    #totalCount: number;

    constructor(inprogress: number, completed: number, total: number) {        
        this.#totalCount = total;
        this.#inprogressCount = inprogress;
        this.#completedCount = completed;
    }

    getRootType() {
        return 'TodoReport';
    }
}