import { IResource } from './iresource';

// tslint:disable-next-line:one-line
export interface IXActionResultListItem {
    $$href: string;
    $$title: string;
    $$intanceId: string;
    company: string;
}
export class XActionResultList {
    XListItems: IXActionResultListItem[];
    PropertyNames: string[];
    ROResult: IResource;

    constructor(result: any[]) {
       this.ROResult = result.splice(-1, 1)[0].$$ro;
       this.XListItems = result;
       this.PropertyNames = this.getPropertyNames();
    }

    private getPropertyNames(): string[] {
       if (this.XListItems.length === 0) {
           return [] ;
       }

       // get names from first item
       const allKeys = Object.keys(this.XListItems[0]);
       return allKeys.filter(function(item: string){return !item.startsWith('$$'); });
    }
 }
