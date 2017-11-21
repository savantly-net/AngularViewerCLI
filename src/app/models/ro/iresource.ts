import { IResourceListItem } from './iresource-list-item';
import { IResourceLink } from './iresource-link';

export interface IResource {
    value: IResourceListItem[];
    links: IResourceLink[];
    extensions: IResourceExtensions;
    members: IResource[];
    title: string;
}

export interface IActionResult {
   links: IResourceLink[];
   result: IResource;
}


export interface IResourceExtensions {
    friendlyName: string;
    menuBar: string;
}
