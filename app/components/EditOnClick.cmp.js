'use strict';

import {
  ElementRef,
  Component,
  Input,
  Output,
  EventEmitter
} from 'angular2/core';

import {
  NgSwitch,
  NgSwitchWhen
} from 'angular2/common';

import {
  Observable
} from 'rxjs';

@Component({
  directives:[NgSwitch, NgSwitchWhen],
  selector: 'editOnClick',
  template: `
    <div (click)='onClick()' [ngSwitch]='editing'>
      <span  *ngSwitchWhen='false'>{{model}}</span>
      <input *ngSwitchWhen='true' type='text' [value]='model' (keyup.enter)='onSave(box.value)' #box>
    </div>
  `
})
export class EditOnClick {

  @Input('model')
  model;

  @Output('modelChange')
  modelChange;

  constructor(el: ElementRef) {
    this.modelChange = new EventEmitter();
    this.editing = false;
    this.el = el.nativeElement;
  }

  onClick() {
    if (!this.editing) {
      this.startEdit();
    }
  }

  startEdit() {
    console.log('start edit');
    this.editing = true;
  }

  endEdit() {
    console.log('end edit');
    this.editing = false;
  }

  onSave(val) {
    this.editing = false;
    if (val !== this.model) {
      this.modelChange.emit(val);
    }
  }

  ngOnInit() {
  }
}
