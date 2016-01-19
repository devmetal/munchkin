'use strict';

import {
  Component,
  Input
} from 'angular2/core';

import {
  NgSwitch,
  NgSwitchWhen,
  NgSwitchDefault
} from 'angular2/common';

import {
  Stat
} from './Stat.cmp'

@Component({
  selector:'monster',
  directives:[Stat, NgSwitch, NgSwitchWhen, NgSwitchDefault],
  template:`
    <div class='monster'>
      <div class='stats'>
        <stat [(model)]='monster.level' label='Monsta'></stat>
        <stat [(model)]='fighter.bonus'  label='Fighter bonus'></stat>
        <stat [(model)]='monster.bonus' label='Monster bonus'></stat>
      </div>
      <div [ngSwitch]='sucks()'>
        <div *ngSwitchWhen='true'>Sucks dude!!</div>
        <div *ngSwitchWhen='false'>You beat the hell</div>
      </div>
    </div>
  `,
})
export class Monster {
  @Input()
  fighter;

  @Input()
  monster;

  constructor() {
    this.fighterBonus = 0;
  }

  sucks() {
    let isWarior = this.fighter.isWarior;
    if (isWarior === true) {
      return this.fighterStrength < this.monstaStrength;
    } else {
      return this.fighterStrength <= this.monstaStrength;
    }
  }

  get fighterStrength() {
    return this.fighter.level + this.fighter.gear + this.fighter.bonus;
  }

  get monstaStrength() {
    return this.monster.level + this.monster.bonus;
  }
}
