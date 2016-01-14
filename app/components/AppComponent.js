'use strict';

import {
  Component,
  NgZone
} from 'angular2/core';

import {
  MenuService
} from '../services/Menu.srv';

import {
  MunchkinService
} from '../services/Munchkin.srv';

@Component({
  selector: 'app',
  template:`
    <h1>Munchkin meter</h1>
    <p>You clicked on {{item}}</p>
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
    this.munchkinsSubscribtion = mdb.munchkins.subscribe(
      updatedMunchkins => this.updateMunchkins(updatedMunchkins),
      err => console.log(err)
    );

    this.newGameSubscribtion = this.menu.newGameEmitter.subscribe(
      () => this.mdb.newGame();
    );

    this.newPlayerSubscribtion = this.menu.newPlayerEmitter.subscribe(
      () => this.mdb.addMunchkin();
    );
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
