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
        <stat [(model)]='level' label='Monsta'></stat>
        <stat [(model)]='fighterBonus' label='Fighter bonus'></stat>
        <stat [(model)]='monsterBonus' label='Monster bonus'></stat>
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

  constructor() {
    this.level = 0;
    this.fighterBonus = 0;
    this.monsterBonus = 0;
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
    return this.fighter.level + this.fighter.gear + this.fighterBonus;
  }

  get monstaStrength() {
    return this.level + this.monsterBonus;
  }
}
