<script lang="ts">
  import type { ComponentSize } from '../../utils/types'
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    value?: string
    type?: 'date' | 'datetime' | 'week' | 'month' | 'year' | 'daterange'
    size?: ComponentSize
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
    format?: string
    disabled?: boolean
    clearable?: boolean
    readonly?: boolean
    rangeSeparator?: string
    oninput?: (val: string) => void
    onchange?: (val: string) => void
    class?: string
  }

  const ns = useNamespace('date-picker')
  let {
    value = $bindable(''),
    type = 'date',
    size = 'default',
    placeholder = '选择日期',
    startPlaceholder = '开始日期',
    endPlaceholder = '结束日期',
    format,
    disabled = false,
    clearable = true,
    readonly = false,
    rangeSeparator = '至',
    oninput,
    onchange,
    class: className = '',
  }: Props = $props()

  let showPanel = $state(false)
  let currentYear = $state(new Date().getFullYear())
  let currentMonth = $state(new Date().getMonth())
  let viewMode = $state<'day' | 'month' | 'year'>('day')

  let classes = $derived(
    [ns.b(), ns.m(size !== 'default' ? size : undefined), ns.is('disabled', disabled), className]
      .filter(Boolean)
      .join(' ')
  )

  // 输入框类型映射
  let inputType = $derived(() => {
    const map: Record<string, string> = {
      date: 'date',
      datetime: 'datetime-local',
      week: 'week',
      month: 'month',
      year: 'month',
    }
    return map[type] || 'date'
  })

  // 日历数据
  let calendarDays = $derived(() => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startPad = firstDay.getDay()
    const days: { date: number; month: number; year: number; isCurrentMonth: boolean }[] = []

    // 上月填充
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate()
    for (let i = startPad - 1; i >= 0; i--) {
      days.push({ date: prevLastDay - i, month: currentMonth - 1, year: currentYear, isCurrentMonth: false })
    }

    // 当月
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: i, month: currentMonth, year: currentYear, isCurrentMonth: true })
    }

    // 下月填充
    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: i, month: currentMonth + 1, year: currentYear, isCurrentMonth: false })
    }

    return days
  })

  let displayValue = $derived(() => {
    if (!value) return ''
    if (type === 'year' && value) {
      return value.slice(0, 4)
    }
    return value
  })

  function togglePanel() {
    if (disabled || readonly) return
    if (type === 'date' || type === 'datetime') {
      showPanel = !showPanel
      if (showPanel && value) {
        const d = new Date(value)
        currentYear = d.getFullYear()
        currentMonth = d.getMonth()
      }
    }
  }

  function selectDay(day: { date: number; month: number; year: number }) {
    const m = String(day.month + 1).padStart(2, '0')
    const d = String(day.date).padStart(2, '0')
    const y = day.year + (day.month < 0 ? -1 : day.month > 11 ? 1 : 0)
    const actualMonth = ((day.month % 12) + 12) % 12
    value = `${y}-${String(actualMonth + 1).padStart(2, '0')}-${d}`
    oninput?.(value)
    onchange?.(value)
    showPanel = false
  }

  function selectMonth(month: number) {
    if (type === 'month') {
      value = `${currentYear}-${String(month + 1).padStart(2, '0')}`
      oninput?.(value)
      onchange?.(value)
      showPanel = false
    } else {
      currentMonth = month
      viewMode = 'day'
    }
  }

  function selectYear(year: number) {
    currentYear = year
    if (type === 'year') {
      value = String(year)
      oninput?.(value)
      onchange?.(value)
      showPanel = false
    } else {
      viewMode = 'month'
    }
  }

  function prevMonth() {
    currentMonth--
    if (currentMonth < 0) {
      currentMonth = 11
      currentYear--
    }
  }

  function nextMonth() {
    currentMonth++
    if (currentMonth > 11) {
      currentMonth = 0
      currentYear++
    }
  }

  function handleClear(e: MouseEvent) {
    e.stopPropagation()
    value = ''
    oninput?.('')
    onchange?.('')
    showPanel = false
  }

  function handleNativeInput(e: Event) {
    const target = e.target as HTMLInputElement
    value = target.value
    oninput?.(value)
  }

  function handleNativeChange(e: Event) {
    const target = e.target as HTMLInputElement
    value = target.value
    onchange?.(value)
  }

  function isSelected(day: { date: number; month: number; year: number }) {
    if (!value) return false
    const d = new Date(value)
    return d.getFullYear() === day.year && d.getMonth() === day.month && d.getDate() === day.date
  }

  function isToday(day: { date: number; month: number; year: number }) {
    const today = new Date()
    return today.getFullYear() === day.year && today.getMonth() === day.month && today.getDate() === day.date
  }

  function handleClickOutside(e: MouseEvent) {
    const target = e.target as HTMLElement
    if (!target.closest(`.${ns.b()}`)) {
      showPanel = false
    }
  }

  $effect(() => {
    if (showPanel) {
      document.addEventListener('click', handleClickOutside)
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
</script>

<div class={classes}>
  {#if type === 'week' || type === 'daterange'}
    <!-- 特殊类型使用原生 input -->
    <div class={ns.e('wrapper')}>
      <input
        class={ns.e('inner')}
        type={inputType()}
        value={displayValue()}
        {placeholder}
        {disabled}
        {readonly}
        oninput={handleNativeInput}
        onchange={handleNativeChange}
      />
      {#if clearable && value}
        <span class={ns.e('clear')} onclick={handleClear}>
          <Icon name="circle-close" size={14} />
        </span>
      {/if}
    </div>
  {:else}
    <div class={ns.e('wrapper')} onclick={togglePanel}>
      <span class={ns.e('prefix')}>
        <Icon name="edit" size={14} />
      </span>
      <input
        class={ns.e('inner')}
        type="text"
        value={displayValue()}
        {placeholder}
        {disabled}
        {readonly}
      />
      {#if clearable && value}
        <span class={ns.e('clear')} onclick={handleClear}>
          <Icon name="circle-close" size={14} />
        </span>
      {/if}
    </div>

    {#if showPanel}
      <div class={ns.e('panel')}>
        <div class={ns.e('header')}>
          <button type="button" class={ns.e('header-btn')} onclick={() => { currentYear--; }}>«</button>
          {#if viewMode === 'day'}
            <button type="button" class={ns.e('header-btn')} onclick={prevMonth}>‹</button>
          {/if}
          <span class={ns.e('header-label')}>
            <button type="button" class={ns.e('header-btn-text')} onclick={() => viewMode = 'year'}>{currentYear}年</button>
            {#if viewMode === 'day'}
              <button type="button" class={ns.e('header-btn-text')} onclick={() => viewMode = 'month'}>{currentMonth + 1}月</button>
            {/if}
          </span>
          {#if viewMode === 'day'}
            <button type="button" class={ns.e('header-btn')} onclick={nextMonth}>›</button>
          {/if}
          <button type="button" class={ns.e('header-btn')} onclick={() => { currentYear++; }}>»</button>
        </div>

        {#if viewMode === 'day'}
          <div class={ns.e('body')}>
            <div class={ns.e('week-header')}>
              {#each weekDays as day}
                <span>{day}</span>
              {/each}
            </div>
            <div class={ns.e('days')}>
              {#each calendarDays() as day}
                <button
                  type="button"
                  class="{ns.e('day')} {!day.isCurrentMonth ? 'is-other-month' : ''} {isSelected(day) ? 'is-selected' : ''} {isToday(day) ? 'is-today' : ''}"
                  onclick={() => selectDay(day)}
                >
                  {day.date}
                </button>
              {/each}
            </div>
          </div>
        {:else if viewMode === 'month'}
          <div class={ns.e('months')}>
            {#each months as monthName, i}
              <button
                type="button"
                class="{ns.e('month-cell')} {currentMonth === i ? 'is-selected' : ''}"
                onclick={() => selectMonth(i)}
              >
                {monthName}
              </button>
            {/each}
          </div>
        {:else if viewMode === 'year'}
          <div class={ns.e('years')}>
            {#each Array.from({ length: 12 }, (_, i) => currentYear - 5 + i) as year}
              <button
                type="button"
                class="{ns.e('year-cell')} {currentYear === year ? 'is-selected' : ''}"
                onclick={() => selectYear(year)}
              >
                {year}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style lang="scss">
  .su-date-picker {
    position: relative;
    display: inline-flex;
    width: 220px;

    &__wrapper {
      display: flex;
      align-items: center;
      width: 100%;
      height: var(--su-component-size);
      padding: 0 12px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      background: var(--su-bg-color);
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color var(--su-transition-duration-fast);

      &:hover {
        border-color: var(--su-color-primary);
      }
    }

    &__prefix {
      display: flex;
      align-items: center;
      color: var(--su-text-color-placeholder);
      margin-right: 8px;
    }

    &__inner {
      flex: 1;
      border: none;
      outline: none;
      font-size: var(--su-font-size-base);
      color: var(--su-text-color-regular);
      background: transparent;
      width: 100%;
      cursor: inherit;
      padding: 0;

      &::placeholder {
        color: var(--su-text-color-placeholder);
      }
    }

    &__clear {
      display: flex;
      align-items: center;
      color: var(--su-text-color-placeholder);
      cursor: pointer;
      margin-left: 4px;

      &:hover {
        color: var(--su-text-color-secondary);
      }
    }

    &__panel {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      z-index: var(--su-z-index-popup);
      background: var(--su-bg-color-overlay);
      border: 1px solid var(--su-border-color-light);
      border-radius: var(--su-border-radius-base);
      box-shadow: var(--su-box-shadow-light);
      padding: 8px;
      width: 292px;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 4px 0;
    }

    &__header-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: none;
      background: none;
      cursor: pointer;
      color: var(--su-text-color-regular);
      font-size: 16px;
      border-radius: var(--su-border-radius-small);

      &:hover {
        color: var(--su-color-primary);
      }
    }

    &__header-label {
      display: flex;
      gap: 4px;
    }

    &__header-btn-text {
      border: none;
      background: none;
      cursor: pointer;
      font-size: var(--su-font-size-base);
      font-weight: 500;
      color: var(--su-text-color-primary);

      &:hover {
        color: var(--su-color-primary);
      }
    }

    &__week-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: var(--su-font-size-small);
      color: var(--su-text-color-secondary);
      padding: 4px 0;
    }

    &__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }

    &__day {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: none;
      background: none;
      border-radius: 50%;
      cursor: pointer;
      font-size: var(--su-font-size-base);
      transition: all var(--su-transition-duration-fast);

      &:hover {
        color: var(--su-color-primary);
      }

      &.is-other-month {
        color: var(--su-text-color-disabled);
      }

      &.is-today {
        color: var(--su-color-primary);
        font-weight: 700;
      }

      &.is-selected {
        background: var(--su-color-primary);
        color: #fff;
      }
    }

    &__months,
    &__years {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      padding: 12px;
    }

    &__month-cell,
    &__year-cell {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      border: none;
      background: none;
      border-radius: var(--su-border-radius-base);
      cursor: pointer;
      font-size: var(--su-font-size-base);
      transition: all var(--su-transition-duration-fast);

      &:hover {
        color: var(--su-color-primary);
      }

      &.is-selected {
        background: var(--su-color-primary);
        color: #fff;
      }
    }

    &.is-disabled .su-date-picker__wrapper {
      background-color: var(--su-fill-color-light);
      cursor: not-allowed;
    }

    &--large .su-date-picker__wrapper {
      height: var(--su-component-size-large);
    }

    &--small {
      width: 180px;

      .su-date-picker__wrapper {
        height: var(--su-component-size-small);
      }

      .su-date-picker__inner {
        font-size: var(--su-font-size-small);
      }
    }
  }
</style>
