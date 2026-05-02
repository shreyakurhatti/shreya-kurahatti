/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User } from '../types';

const AUTH_KEY = 'medvault_auth';

export const storage = {
  setUser: (user: User) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  },
  getUser: (): User | null => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },
  clearAuth: () => {
    localStorage.removeItem(AUTH_KEY);
  }
};
