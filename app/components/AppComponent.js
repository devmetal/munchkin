'use strict';

import {
  Component,
  NgZone
} from 'angular2/core';

import {
  MenuService
} from '../services/Menu.srv';

@Component({
  selector: 'app',
  template:`
    <h1>Hello {{stranger}}</h1>
    <p>You clicked on {{item}}</p>
  `
})
export default class {

  constructor(menu: MenuService, zone: NgZone) {
    this.menu = menu;
    this.zone = zone;
  }

  ngOnInit() {
    this.newGameSubscribtion = this.menu.newGameEmitter.subscribe(
      (item) => this.selectedItem(item)
    );

    this.newPlayerSubscribtion = this.menu.newPlayerEmitter.subscribe(
      (item) => this.selectedItem(item)
    );
  }

  ngOnDestroy() {
    this.newGameSubscribtion.unsubscribe();
    this.newPlayerSubscribtion.unsubscribe();
  }

  selectedItem(item) {
    this.zone.run(() => this.item = item);
  }


}
