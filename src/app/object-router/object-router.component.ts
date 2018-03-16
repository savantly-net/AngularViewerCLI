import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamodelService } from '../services/metamodel.service';
import { ActionInvokedArg } from '../services/iactioninvoked';
import { ActionInvocationService } from '../services/action-invocation.service';
import { SessionService } from '../services/session.service';
import { Resource, ObjectRepr } from '../models/ro/iresource';
import { MatDialog } from '@angular/material';
import { ObjectComponent } from '../object/object.component';

@Component({
  selector: 'app-object-router',
  templateUrl: './object-router.component.html',
  styleUrls: ['./object-router.component.css']
})

/**
 * RESOURCE LOADING
 * - parse url
 * - load resource
  *  - [todo] check the cache first
  *  - index result (deal with cache too)
*  RENDERING
*    - select view for result and render   describedby
*/
export class ObjectRouterComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private metamodel: MetamodelService,
    private invoker: ActionInvocationService,
    private dialog: MatDialog,
    private injector: Injector,
    private session: SessionService) {
    console.log('at object router constructtor');
   }

  ngOnInit() {
    this._route.paramMap.subscribe(data => {
      // PARSE ACTION
      const destination = data.get('destination');
      const decoded = decodeURIComponent(destination);

      // LOAD RESOURCE (or invoke action)
      this.metamodel.load(ObjectRepr, decoded).subscribe(data1 => {
      const result = data1 ;

      this.session.indexResult(result);

        this.openModal(result);
      // todo: display aan objectcomponent as a popup
    });
      // arg.ActionDescriptor = actionDescriptor;


  });
    // load url
    // create list as popup
  }

  openModal(data) {
    setTimeout(() => {
       const windowRef =
           this.dialog.open(
             ObjectComponent, {data: {args: data}, width: '900px', });

           windowRef.afterClosed().subscribe(result => {
             console.log('object closed');
           });
     });
 }

}
