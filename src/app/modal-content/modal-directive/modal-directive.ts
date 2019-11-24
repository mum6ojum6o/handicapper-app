import { ViewContainerRef, Directive } from '@angular/core';

@Directive({
  selector: '[modal-host]',
})
export class ModalDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
