'use strict';

import {
  Component,
  NgZone
} from 'angular2/core';

import {
  NgFor
} from 'angular2/common';

import {
  MenuService
} from '../services/Menu.srv';

import {
  MunchkinService
} from '../services/Munchkin.srv';

@Component({
  selector: 'app',
  directives:[NgFor],
  template:`
    <h1>Munchkin meter</h1>
    <div *ngFor='#munchkin of munchkins'>
      <div>Name: {{munchkin.name}}</div>
      <div>Level: {{munchkin.level}}</div>
      <div>Warrior: {{munchkin.isWarior}}</div>
      <div>Gear: {{munchkin.gear}}</div>
    </div>
  `
})
export default class {

  constructor(menu: MenuService, zone: NgZone, mdb: MunchkinService) {
    this.menu = menu;
    this.zone = zone;
    this.mdb = mdb;
    this.munchkins = [];
  }

  ngOnInit() {
    this.munchkinsSubscribtion = this.mdb.munchkins.subscribe(
      updatedMunchkins => this.updateMunchkins(updatedMunchkins),
      err              => console.log(err)
    );

    this.newGameSubscribtion = this.menu.newGameEmitter.subscribe(
      () => this.mdb.newGame()
    );

    this.newPlayerSubscribtion = this.menu.newPlayerEmitter.subscribe(
      () => this.mdb.addMunchkin()
    );

    this.mdb.loadGame();
  }

  ngOnDestroy() {
    this.munchkinsSubscribtion.unsubscribe();
    this.newGameSubscribtion.unsubscribe();
    this.newPlayerSubscribtion.unsubscribe();
  }

  selectedItem(item) {
    this.zone.run(() => this.item = item);
  }

  updateMunchkins(munchkins) {
    this.zone.run(() => this.munchkins = munchkins);
  }
}
