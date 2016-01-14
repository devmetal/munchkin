'use strict';

import {
  Injectable,
  EventEmitter
} from 'angular2/core';

import {
  ipcRenderer
} from 'electron';

@Injectable()
export class MenuService {

  newGame: EventEmitter;
  newPlayer: EventEmitter;

  constructor() {
    this.newGame = new EventEmitter();
    this.newPlayer = new EventEmitter();

    ipcRenderer.on('new-game', () => this.newGame.emit('new-game'));
    ipcRenderer.on('new-player', () => this.newPlayer.emit('new-player'));
  }

  get newGameEmitter() {
    return this.newGame;
  }

  get newPlayerEmitter() {
    return this.newPlayer;
  }
}
