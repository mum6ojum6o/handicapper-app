import { Component, OnInit, Input, Directive, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from './modal-directive/modal-directive';
import { ModalType } from './modal-type/modal-type';


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent  {
  @Input() modalType: ModalType;
  @ViewChild(ModalDirective, {static: true}) modalDirective: ModalDirective;
  constructor(public activeModal: NgbActiveModal, private componentFactoryResolver: ComponentFactoryResolver) {}

  public loadModal() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.modalType.component);
    const viewContainerRef = this.modalDirective.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance).data = this.modalType.data;
    console.log (this.modalType.data);
  }

}
