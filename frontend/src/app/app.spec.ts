import '@angular/compiler';
import { App } from './app';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('should create the app', () => {
    const app = new App();
    expect(app).toBeTruthy();
  });
});
