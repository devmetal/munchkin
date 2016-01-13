'use strict';

export class Munchkin {
  name;
  level;
  gear;
  isWarior;
  _id;
  _rev;

  constructor(datas) {
    this.name = datas.name || "";
    this.level = datas.level || 0;
    this.gear = datas.gear || 0;
    this.isWarior = datas.warior || false;
    this._id = datas._id || datas.id || "";
    this._rev = datas._rev ||  datas.rev || "";
  }
}
