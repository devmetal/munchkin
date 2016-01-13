'use strict'

import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';

import AppComponent        from './components/AppComponent';
//import { MunchkinService } from './services/Munchkin.srv';
import { bootstrap }       from 'angular2/bootstrap';

bootstrap(AppComponent);
