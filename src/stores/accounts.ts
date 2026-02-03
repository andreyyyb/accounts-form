import { defineStore } from 'pinia'
import type { Account } from '../types/account'
import { loadAccountsFromStorage, saveAccountsToStorage } from '../utils/accountsStorage'

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: loadAccountsFromStorage() as Account[],
  }),
  actions: {
    upsertAccount(account: Account) {
      const idx = this.accounts.findIndex((a) => a.id === account.id)
      if (idx >= 0) this.accounts[idx] = account
      else this.accounts.push(account)
      saveAccountsToStorage(this.accounts)
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter((a) => a.id !== id)
      saveAccountsToStorage(this.accounts)
    },
    replaceAll(accounts: Account[]) {
      this.accounts = accounts
      saveAccountsToStorage(this.accounts)
    },
  },
})

