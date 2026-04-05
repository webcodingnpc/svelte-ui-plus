<script lang="ts">
  import { useNamespace } from '../../utils/bem'
  import Icon from '../Icon/Icon.svelte'

  interface Props {
    value?: Date
    range?: [Date, Date]
    onchange?: (date: Date) => void
    class?: string
  }

  const ns = useNamespace('calendar')
  let {
    value = $bindable(new Date()),
    range,
    onchange,
    class: className = '',
  }: Props = $props()

  let currentYear = $state(value.getFullYear())
  let currentMonth = $state(value.getMonth())

  let classes = $derived([ns.b(), className].filter(Boolean).join(' '))

  let calendarDays = $derived(() => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startPad = firstDay.getDay()
    const days: { date: number; month: number; year: number; isCurrentMonth: boolean }[] = []

    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate()
    for (let i = startPad - 1; i >= 0; i--) {
      days.push({ date: prevLastDay - i, month: currentMonth - 1, year: currentYear, isCurrentMonth: false })
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: i, month: currentMonth, year: currentYear, isCurrentMonth: true })
    }

    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: i, month: currentMonth + 1, year: currentYear, isCurrentMonth: false })
    }

    return days
  })

  function selectDate(day: { date: number; month: number; year: number }) {
    value = new Date(day.year, day.month, day.date)
    currentYear = value.getFullYear()
    currentMonth = value.getMonth()
    onchange?.(value)
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

  function goToday() {
    const today = new Date()
    currentYear = today.getFullYear()
    currentMonth = today.getMonth()
    value = today
    onchange?.(today)
  }

  function isSelected(day: { date: number; month: number; year: number }) {
    return value.getFullYear() === day.year && value.getMonth() === day.month && value.getDate() === day.date
  }

  function isToday(day: { date: number; month: number; year: number }) {
    const today = new Date()
    return today.getFullYear() === day.year && today.getMonth() === day.month && today.getDate() === day.date
  }

  const weekDays = ['日', '一', '二', '三', '四', '五', '六']
</script>

<div class={classes}>
  <div class={ns.e('header')}>
    <div class={ns.e('title')}>{currentYear}年{currentMonth + 1}月</div>
    <div class={ns.e('actions')}>
      <button type="button" class={ns.e('btn')} onclick={prevMonth}>
        <Icon name="arrow-left" size={14} />
      </button>
      <button type="button" class={ns.e('btn')} onclick={goToday}>今天</button>
      <button type="button" class={ns.e('btn')} onclick={nextMonth}>
        <Icon name="arrow-right" size={14} />
      </button>
    </div>
  </div>
  <div class={ns.e('body')}>
    <div class={ns.e('week-header')}>
      {#each weekDays as day}
        <div class={ns.e('week-day')}>{day}</div>
      {/each}
    </div>
    <div class={ns.e('days')}>
      {#each calendarDays() as day}
        <div
          class="{ns.e('day')} {!day.isCurrentMonth ? 'is-other-month' : ''} {isSelected(day) ? 'is-selected' : ''} {isToday(day) ? 'is-today' : ''}"
          onclick={() => selectDate(day)}
        >
          <span class={ns.e('day-number')}>{day.date}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .su-calendar {
    background: var(--su-bg-color);
    border: 1px solid var(--su-border-color-lighter);
    border-radius: var(--su-border-radius-base);

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--su-border-color-lighter);
    }

    &__title {
      font-size: var(--su-font-size-large);
      font-weight: 500;
      color: var(--su-text-color-primary);
    }

    &__actions {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    &__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px 12px;
      border: 1px solid var(--su-border-color);
      border-radius: var(--su-border-radius-base);
      background: var(--su-bg-color);
      cursor: pointer;
      font-size: var(--su-font-size-small);
      color: var(--su-text-color-regular);
      min-height: 28px;
      transition: all var(--su-transition-duration-fast);

      &:hover {
        color: var(--su-color-primary);
        border-color: var(--su-color-primary);
      }
    }

    &__body {
      padding: 12px 20px 20px;
    }

    &__week-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    &__week-day {
      text-align: center;
      padding: 8px 0;
      font-size: var(--su-font-size-small);
      color: var(--su-text-color-secondary);
      font-weight: 500;
    }

    &__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    &__day {
      aspect-ratio: 1;
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 8px;
      cursor: pointer;
      border-top: 1px solid var(--su-border-color-extra-light);
      transition: background var(--su-transition-duration-fast);

      &:hover {
        background: var(--su-fill-color-light);
      }

      &.is-other-month {
        color: var(--su-text-color-disabled);
      }

      &.is-today .su-calendar__day-number {
        color: var(--su-color-primary);
        font-weight: 700;
      }

      &.is-selected {
        background: var(--su-color-primary-light-9);

        .su-calendar__day-number {
          background: var(--su-color-primary);
          color: #fff;
        }
      }
    }

    &__day-number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      font-size: var(--su-font-size-base);
    }
  }
</style>
