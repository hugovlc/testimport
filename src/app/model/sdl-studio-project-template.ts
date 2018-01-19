import { EntityBase } from './entity-base';
import { PhysicalFile } from './physical-file';

/// <code-import> Place custom imports between <code-import> tags

/// </code-import>

export class SdlStudioProjectTemplate extends EntityBase {

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
    name: string;
    description: string;
    fileId: string;
    file: PhysicalFile;
}

