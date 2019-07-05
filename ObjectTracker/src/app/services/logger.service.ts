import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  // Probably already exists a logger class...
  private enabled = true;

  constructor() { }

  enable() {
    this.enabled = true;
  }

  disable() {
    this.enabled = false;
  }

  info(mod: string, msg: string) {
    console.log(`[INFO] [${mod}] ${msg}`);
  }
}
