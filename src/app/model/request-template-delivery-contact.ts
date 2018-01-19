import { EntityBase } from './entity-base';
import { RequestTemplate } from './request-template';
import { Contact } from './contact';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class RequestTemplateDeliveryContact extends EntityBase {

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
    contactId: string;
    requestTemplateId: string;
    contact: Contact;
    requestTemplate: RequestTemplate;
}

