import { Injectable } from '@angular/core';
import { IdentityMap } from '../models/identity-map';
import { ActionDescription, ResourceLink, IIndexable } from '../models/ro/iresource';

@Injectable()
export class SessionService {
  public universe: any[] = [];
  private registry: IdentityMap<any>;
  private objectDescriptors: IdentityMap<any>;
  private actionDescriptors: IdentityMap<ActionDescription>;

  constructor() {
    this.registry = new IdentityMap();
    this.actionDescriptors = new IdentityMap();
  }

  indexResult(result: any): any {
   this.addToIdentityMap(result);
   this.addToUniverse(result);
  }

  indexActionDescriptor(action: ActionDescription) {
    this.actionDescriptors.index(action);
  }

  private addToUniverse(result: any) {
    this.universe.push(result);
  }
  private addToIdentityMap(result: IIndexable): any {
    this.registry.index(result);
  }

  public containsAction(link: ResourceLink): boolean {
    return this.actionDescriptors.contains(link.href);
  }

  public containsObjectDescriptor(key) {
     return this.objectDescriptors.contains(key);
  }

  public indexObjectDescriptor(objectDescriptor) {
    this.objectDescriptors.index(objectDescriptor);
  }
}

