import { InjectionToken, isDevMode } from '@angular/core';

/**
 * Base URL for the backend API.
 * - Development: http://localhost:5072
 * - Production/others: /api
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => (isDevMode() ? 'http://localhost:5072' : '/api')
});
