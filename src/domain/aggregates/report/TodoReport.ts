import { AggregateRoot } from "@/domain/seedWork/AggregateRoot";

export class TodoReport extends AggregateRoot {
    #inprogressCount: number;
    #completedCount: number;
    #totalCount: number;

    constructor(inprogress: number, completed: number, total: number) {
        super();
        
        this.#totalCount = total;
        this.#inprogressCount = inprogress;
        this.#completedCount = completed;
    }
}