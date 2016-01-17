'use strict';

import {
  Component,
  Input,
  Output,
  EventEmitter,
  Attribute,
  ElementRef
} from 'angular2/core';

import {
  FORM_DIRECTIVES,
  NgSwitch,
  NgSwitchWhen,
  NgSwitchDefault
} from 'angular2/common';

import {
  Munchkin
} from '../models/Munchkin.model';

import {
  MunchkinService
} from '../services/Munchkin.srv';

import {
  Observable
} from 'rxjs';

@Component({
  directives: [],
  selector: 'stat',
  template: `
    <div class='stat'>
      <div>{{label}}</div>
      <div class='up'>UP</div>
      <div>{{model}}</div>
      <div class='down'>DOWN</div>
    </div>
  `
})
class Stat {
  @Input()
  model;

  @Input()
  label;

  @Output()
  change;

  constructor(ref: ElementRef) {
    this.ref = ref;
    this.change = new EventEmitter();
  }

  ngOnInit() {
    let up = this.ref.nativeElement.querySelector('.up'),
        down = this.ref.nativeElement.querySelector('.down');

    const upStream = Observable.fromEvent(up, 'click')
      .map(() => ++this.model)
      .debounceTime(500)
      .distinctUntilChanged();

    const downStream = Observable.fromEvent(down, 'click')
      .map(() => --this.model)
      .debounceTime(500)
      .distinctUntilChanged();

    upStream.subscribe(val => this.change.emit(val));
    downStream.subscribe(val => this.change.emit(val));
  }
}

@Component({
  directives: [FORM_DIRECTIVES, Stat, NgSwitch, NgSwitchWhen, NgSwitchDefault],
  selector: 'munchkin',
  template:`
    <div class='munchkin'>
      <div class='name'>{{munchkin.name}}</div>
      <div class='stats'>
        <stat [model]='munchkin.level' label='Level' (change)='munchkin.level = $event; save()'></stat>
        <stat [model]='munchkin.gear'  label='Gear' (change)='munchkin.gear = $event; save()'></stat>
      </div>
      <label>
        Warrior
        <input type='checkbox' value='true'
          [(ngModel)]='munchkin.isWarior'
          (ngModelChange)='save()'>
      </label>
      <button (click)='toggleFight()' [ngSwitch]='isFighting'>
        <span *ngSwitchWhen='false'>Fight</span>
        <span *ngSwitchWhen='true'>End Fight</span>
      </button>
      <button (click)='toggleHelp()' [ngSwitch]='isHelping'>
        <span *ngSwitchWhen='false'>Help</span>
        <span *ngSwitchWhen='true'>End Help</span>
      </button>
    </div>
  `
})
export class MunchkinComponent {
  @Input()
  munchkin: Munchkin;

  constructor(db: MunchkinService) {
    this.db = db;
    this.isFighting = false;
    this.isHelping = false;
  }

  toggleFight() {
    this.isFighting = !this.isFighting;
    this.isHelping = false;
  }

  toggleHelp() {
    this.isHelping = !this.isHelping;
    this.isFighting = false;
  }

  async save() {
    try {
      await this.db.updateMunchkin(this.munchkin);
    } catch(err) {
      console.log(err);
      //Pass the error handler service
    }
  }
}
