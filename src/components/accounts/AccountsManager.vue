<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { useAccountsStore } from '../../stores/accounts'
import type { Account, AccountType, LabelTag } from '../../types/account'

type RowErrors = Partial<Record<'label' | 'login' | 'password', string>>

type AccountDraft = {
  id: string
  labelInput: string
  type: AccountType
  login: string
  password: string
  errors: RowErrors
}

function newId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function labelsToInput(labels: LabelTag[]) {
  return labels.map((l) => l.text).join('; ')
}

function inputToLabels(input: string): LabelTag[] {
  return input
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}

function validateDraft(d: AccountDraft): RowErrors {
  const errors: RowErrors = {}

  if (d.labelInput.length > 50) errors.label = 'Максимум 50 символов'

  const login = d.login.trim()
  if (!login) errors.login = 'Логин обязателен'
  else if (login.length > 100) errors.login = 'Максимум 100 символов'

  if (d.type === 'LOCAL') {
    const password = d.password
    if (!password) errors.password = 'Пароль обязателен'
    else if (password.length > 100) errors.password = 'Максимум 100 символов'
  }

  return errors
}

function normalizeDraft(d: AccountDraft): Account {
  return {
    id: d.id,
    labels: inputToLabels(d.labelInput),
    type: d.type,
    login: d.login.trim(),
    password: d.type === 'LDAP' ? null : d.password,
  }
}

const store = useAccountsStore()

const rows = ref<AccountDraft[]>(
  store.accounts.map((a) => ({
    id: a.id,
    labelInput: labelsToInput(a.labels),
    type: a.type,
    login: a.login,
    password: a.password ?? '',
    errors: {},
  })),
)

function addRow() {
  rows.value.push({
    id: newId(),
    labelInput: '',
    type: 'LOCAL',
    login: '',
    password: '',
    errors: {},
  })
}

function removeRow(id: string) {
  rows.value = rows.value.filter((r) => r.id !== id)
  store.removeAccount(id)
}

function commitRow(row: AccountDraft) {
  row.errors = validateDraft(row)
  if (Object.keys(row.errors).length === 0) {
    store.upsertAccount(normalizeDraft(row))
  }
}

function onTypeChange(row: AccountDraft) {
  // при LDAP пароль не сохраняем
  commitRow(row)
}
</script>

<template>
  <section class="accounts">
    <div class="accounts__header">
      <h2 class="accounts__title">Учетные записи</h2>
      <el-button :icon="Plus" circle type="primary" aria-label="Добавить" @click="addRow" />
    </div>

    <el-alert class="accounts__hint" type="info" :closable="false" show-icon>
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель <b>;</b>
    </el-alert>

    <div class="accounts__table">
      <div class="accounts__row accounts__row--head">
        <div class="cell cell--label">Метки</div>
        <div class="cell cell--type">Тип записи</div>
        <div class="cell cell--login">Логин</div>
        <div class="cell cell--password">Пароль</div>
        <div class="cell cell--actions" />
      </div>

      <div v-for="row in rows" :key="row.id" class="accounts__row">
        <div class="cell cell--label">
          <div class="field" :class="{ 'field--error': !!row.errors.label }">
            <el-input
              v-model="row.labelInput"
              placeholder="например: tag1; tag2"
              maxlength="50"
              show-word-limit
              @blur="commitRow(row)"
            />
          </div>
        </div>

        <div class="cell cell--type">
          <el-select v-model="row.type" class="w-full" @change="onTypeChange(row)">
            <el-option label="LDAP" value="LDAP" />
            <el-option label="Локальная" value="LOCAL" />
          </el-select>
        </div>

        <div class="cell cell--login">
          <div class="field" :class="{ 'field--error': !!row.errors.login }">
            <el-input v-model="row.login" placeholder="Значение" maxlength="100" @blur="commitRow(row)" />
          </div>
        </div>

        <div class="cell cell--password">
          <template v-if="row.type === 'LOCAL'">
            <div class="field" :class="{ 'field--error': !!row.errors.password }">
              <el-input
                v-model="row.password"
                type="password"
                show-password
                placeholder="••••••••"
                maxlength="100"
                @blur="commitRow(row)"
              />
            </div>
          </template>
          <template v-else>
            <span class="muted">—</span>
          </template>
        </div>

        <div class="cell cell--actions">
          <el-button :icon="Delete" circle type="danger" plain aria-label="Удалить" @click="removeRow(row.id)" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.accounts {
  display: grid;
  gap: 14px;
}

.accounts__header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.accounts__title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.accounts__hint {
  border-radius: 10px;
}

.accounts__table {
  display: grid;
  gap: 8px;
}

.accounts__row {
  display: grid;
  grid-template-columns: 1.6fr 0.9fr 1.2fr 1.2fr 56px;
  gap: 10px;
  align-items: center;
}

.accounts__row--head {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  padding: 0 2px;
}

.cell {
  min-width: 0;
}

.muted {
  color: var(--el-text-color-secondary);
}

.w-full {
  width: 100%;
}

.field--error :deep(.el-input__wrapper),
.field--error :deep(.el-select__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset !important;
}

@media (max-width: 900px) {
  .accounts__row {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 10px 10px 12px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 12px;
    background: var(--el-bg-color);
  }
  .accounts__row--head {
    display: none;
  }
  .cell--actions {
    justify-self: end;
  }
}
</style>

