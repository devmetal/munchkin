'use strict';

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Attribute
} from 'angular2/core';

import {
  Observable
} from 'rxjs';

@Component({
  directives: [],
  selector: 'stat',
  properties: ['isDebounced'],
  template: `
    <div class='stat'>
      <div>{{label}}</div>
      <button class='up'>UP</button>
      <div>{{model}}</div>
      <button class='down'>DOWN</button>
    </div>
  `
})
export class Stat {
  @Input()
  model;

  @Input()
  label;

  @Output('modelChange')
  updateModel;

  constructor(ref: ElementRef) {
    this.ref = ref;
    this.updateModel = new EventEmitter();
  }

  ngOnInit() {
    let up = this.ref.nativeElement.querySelector('.up'),
        down = this.ref.nativeElement.querySelector('.down'),
        debounced = !!this.isDebounced;

    let upStream = Observable.fromEvent(up, 'click')
      .map(() => ++this.model);

    let downStream = Observable.fromEvent(down, 'click')
      .map(() => --this.model);

    if (debounced) {
      upStream = upStream.debounceTime(500)
        .distinctUntilChanged();

      downStream = downStream.debounceTime(500)
        .distinctUntilChanged();
    }

    upStream.subscribe(val => this.updateModel.emit(val));
    downStream.subscribe(val => this.updateModel.emit(val));
  }
}
