import { EntityBase } from './entity-base';
import { Priority } from './priority';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class PriorityMultiplier extends EntityBase {

    /// <code> Place custom code between <code> tags
    
    /// </code>

    // Generated code. Do not place code below this line.
    id: string;
    version: number;
    createdBy: string;
    updatedBy: string;
    creationDate: Date;
    updateDate: Date;
    isDeleted: boolean;
    basePriceMultiplier: number;
    priorityId: string;
    validFrom: Date;
    validTo: Date;
    priority: Priority;
}

