'use strict';

import {
  Component,
  Input,
  Output,
  EventEmitter,
  Attribute
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
      <div class='up' (click)='modelUp()' #up>UP</div>
      <div>{{model}}</div>
      <div class='down' (click)='modelDown' #down>DOWN</div>
    </div>
  `
})
class Stat {
  @Input()
  model;

  @Output()
  change;

  constructor(@Attribute('label') label) {
    this.change = new EventEmitter();
    this.label = label;
  }

  modelUp() {
    ++model;
  }

  modelDown() {
    --model;
  }

  ngOnInit() {
    let changes = Observable.merge(
      #up.click,
      #down.click
    ).debounce(500);

    changes.subscribe(
      () => this.change.emit(model),
      (err) => console.log(err),
      () => console.log('changes', model)
    );
  }
}

@Component({
  directives: [FORM_DIRECTIVES, Stat, NgSwitch, NgSwitchWhen, NgSwitchDefault],
  selector: 'munchkin',
  template:`
    <div class='munchkin'>
      <div class='name'>{{munchkin.name}}</div>
      <div class='stats'>
        <stat [model]='munchkin.level' label='Level' (change)='munchkin.level = $event; save()'>
        <stat [model]='munchkin.gear'  label='Gear' (change)='munchkin.gear = $event; save()'>
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
      <button (click)='toggleHelp()'>
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
