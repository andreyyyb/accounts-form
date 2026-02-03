import type { Account, AccountType, LabelTag } from '../types/account'

const STORAGE_KEY = 'accounts.v1'

function isAccountType(v: unknown): v is AccountType {
  return v === 'LDAP' || v === 'LOCAL'
}

function isLabelTag(v: unknown): v is LabelTag {
  return !!v && typeof v === 'object' && typeof (v as { text?: unknown }).text === 'string'
}

function isAccount(v: unknown): v is Account {
  if (!v || typeof v !== 'object') return false
  const a = v as Partial<Account>
  return (
    typeof a.id === 'string' &&
    Array.isArray(a.labels) &&
    a.labels.every(isLabelTag) &&
    isAccountType(a.type) &&
    typeof a.login === 'string' &&
    (typeof a.password === 'string' || a.password === null)
  )
}

export function loadAccountsFromStorage(): Account[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isAccount)
  } catch {
    return []
  }
}

export function saveAccountsToStorage(accounts: Account[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
}

