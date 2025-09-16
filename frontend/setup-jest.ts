import 'jest-preset-angular/setup-env/zone';
import '@testing-library/jest-dom';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import '@angular/common/locales/global/nl';

// Initialize Angular testing environment for Jest
beforeAll(() => {
  try {
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  } catch {
    // Ignore if already initialized (guards against re-initialization in watch mode)
  }
});
