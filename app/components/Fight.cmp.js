'use strict';

import {
  Component,
  Input
} from 'angular2/core';

import {
  NgFor
} from 'angular2/common';

import {
  Monster
} from './Monster.cmp'

@Component({
  selector:'fight',
  directives:[NgFor, Monster],
  template:`
    <div>
      <monster *ngFor='#monster of monsters' [monster]='monster' [fighter]='fighter'></monster>
      <button (click)='addMonster()'>Incoming</button>
    </div>
  `
})
export class Fight {
  @Input()
  fighter;

  constructor() {
    this.monsters = [{
      level: 0,
      bonus: 0
    }];
  }

  ngOnInit() {
    this.fighter.bonus = 0;
  }

  addMonster() {
    this.monsters.push({
      level: 0,
      bonus: 0
    })
  }
}
