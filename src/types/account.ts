export type AccountType = 'LDAP' | 'LOCAL'

export type LabelTag = {
  text: string
}

export type Account = {
  id: string
  labels: LabelTag[]
  type: AccountType
  login: string
  password: string | null
}

