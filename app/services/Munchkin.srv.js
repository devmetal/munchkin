'use strict';

import { Injectable } from 'angular2/core';
import { Munchkin }   from '../models/Munchkin.model';
import PouchDB        from 'pouchdb';
import { Observable } from 'rxjs';

@Injectable()
export class MuchkinService {

  constructor() {
    this.db = new PouchDB('munchkins');
    this.datas = {
      munchkins: []
    };

    this.munchkins = null;
    this.munchkinsObserver = null;

    init();
  }

  init() {
    this.munchkins = Observable.create((observer) => {
      this.munchkinsObserver = observer;
    });
  }

  async loadGame() {
    let items = await this.db.allDocs({
      include_docs: true
    });

    if (!items.rows) {
      this.datas.munchkins = [];
    } else {
      this.datas.munchkins = items.row.map(
        row => new Munchkin(row)
      );
    }

    this.munchkinsObserver.onNext(this.datas.munchkins);
  }

  async newGame() {
    let result = await this.db.destroy();
    this.datas.munchkins = [];
    this.munchkinsObserver.onNext(this.datas.munchkins);
  }

  async addMunchkin() {
    let munchkin = new Munchkin({
      name: 'munchkin'
    });
    
    let result = await this.db.post(munchkin);
    if (!result.ok || result.ok === false) {
      return this.munchkinsObserver.onError('add fail');
    }

    munchkin._id = resp.id;
    munchkin._rev = resp.rev;

    this.datas.munchkins.push(munchkin);
    this.munchkinsObserver.onNext(this.datas.munchkins);
  }

  async updateMunchkin(munchkin) {
    let result = await this.db.put(munchkin);
    if (!result.ok || result.ok === false) {
      return this.munchkinsObserver.onError('update fail');
    }

    munchkin._rev = result.rev;

    this.datas.munchkins.forEach((data, i) => {
      if (data._id === munchkin._id) {
        this.datas.munchkins[i] = munchkin;
      }
    });

    this.munchkinsObserver.onNext(this.datas.munchkins);
  }
}
