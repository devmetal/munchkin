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
  NgIf,
  NgFor
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
  Fight
} from './Fight.cmp';

import {
  EditOnClick
} from './EditOnClick.cmp';


@Component({
  directives: [FORM_DIRECTIVES, Stat, NgSwitch, NgSwitchWhen, NgSwitchDefault, NgIf, NgFor, Fight, EditOnClick],
  selector: 'munchkin',
  template:`
    <div class='munchkin'>
      <editOnClick [model]='munchkin.name' (modelChange)='updateName($event)'></editOnClick>
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
        <fight [fighter]='munchkin'></fight>
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
  }

  toggleFight() {
    this.isFighting = !this.isFighting;
    this.isHelping = false;
  }

  toggleHelp() {
    this.isHelping = !this.isHelping;
    this.isFighting = false;
  }

  updateName(value) {
    this.munchkin.name = value;
    this.save();
  }

  async save() {
    try {
      await this.db.updateMunchkin(this.munchkin);
    } catch(err) {
      console.log(err);
    }
  }
}
