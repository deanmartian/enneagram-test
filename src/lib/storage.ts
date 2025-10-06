import { TestState, AnswerMap } from "@/types";

const STORAGE_PREFIX = 'enneagram_test_';

export function getStorageKey(key: string): string {
  return `${STORAGE_PREFIX}${key}`;
}

export function setItem<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(getStorageKey(key), serializedValue);
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(getStorageKey(key));
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return defaultValue;
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(getStorageKey(key));
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
}

export function clearTestData(): void {
  const keys = ['testState', 'answers', 'cookieConsent'];
  keys.forEach(key => removeItem(key));
}

// Convenience functions for test-specific data
export function saveTestState(state: TestState): void {
  setItem('testState', state);
}

export function getTestState(): TestState | null {
  return getItem<TestState | null>('testState', null);
}

export function saveAnswers(answers: AnswerMap): void {
  setItem('answers', answers);
}

export function getAnswers(): AnswerMap {
  return getItem<AnswerMap>('answers', {});
}

export function saveCookieConsent(consent: boolean): void {
  setItem('cookieConsent', consent);
}

export function getCookieConsent(): boolean | null {
  return getItem<boolean | null>('cookieConsent', null);
}

// TODO: Implementer ekspirering av lagrede data
// TODO: Legg til komprimering for store datasett
// TODO: Fallback til sessionStorage ved localStorage-feil
