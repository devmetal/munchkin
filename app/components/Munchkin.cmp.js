'use strict';

import {
  Component,
  Input
} from 'angular2/core';

import {
  FORM_DIRECTIVES,
  NgSwitch,
  NgSwitchWhen,
  NgSwitchDefault,
  NgIf
} from 'angular2/common';

import {
  Munchkin
} from '../models/Munchkin.model';

import {
  MunchkinService
} from '../services/Munchkin.srv';

import {
  Stat
} from './Stat.cmp';

import {
  Monster
} from './Monster.cmp';


@Component({
  directives: [FORM_DIRECTIVES, Stat, NgSwitch, NgSwitchWhen, NgSwitchDefault, NgIf, Monster],
  selector: 'munchkin',
  template:`
    <div class='munchkin'>
      <div class='name' (click)='editName()' [ngSwitch]='editing'>
        <span  *ngSwitchWhen='false'>{{munchkin.name}}</span>
        <input *ngSwitchWhen='true' type='text' [value]='munchkin.name' (keyup.enter)='updateName(box.value)' #box>
      </div>
      <div class='stats'>
        <stat [model]='munchkin.level' isDebounced='true' label='Level' (modelChange)='munchkin.level = $event; save()'></stat>
        <stat [model]='munchkin.gear'  isDebounced='true' label='Gear'  (modelChange)='munchkin.gear  = $event; save()'></stat>
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
      <div *ngIf='isFighting'>
        <monster [fighter]='munchkin'></monster>
      </div>
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
    this.editing = false;
  }

  toggleFight() {
    this.isFighting = !this.isFighting;
    this.isHelping = false;
  }

  toggleHelp() {
    this.isHelping = !this.isHelping;
    this.isFighting = false;
  }

  editName() {
    this.editing = true;
  }

  updateName(value) {
    this.munchkin.name = value;
    this.editing = false;
    this.save();
  }

  async save() {
    console.log('save');
    try {
      await this.db.updateMunchkin(this.munchkin);
    } catch(err) {
      console.log(err);
    }
  }
}
