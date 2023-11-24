import {Association} from '@prisma/client';
import {Image} from './ImageAssociation';

export interface AssociationDTO extends Association{
  images:Image[];
}
