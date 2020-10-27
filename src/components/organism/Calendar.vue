<template>
  <div :class="$style.Calendar">
    <div :class="$style.weeks">
      <div v-for="day of weeks" :key="day" :class="$style.weeks__item">{{ day }}</div>
    </div>
    <div :class="$style.days">
      <div
        v-for="item of arrDays"
        :key="item.date"
        :class="[item.grayout ? $style.grayout : '', $style.days__item]"
        :data-date="item.date"
        @click="openModal(item.date)"
      >
        <p :class="[$style.days__number, item.isToday ? $style.today : '']">{{ item.n }}</p>
        <CalendarHolidaysLabel v-if="holidays.length > 0" :holidays="holidays" :data="item.date" />
        <CalendarTaskTag v-if="todo.length > 0" :data="item.date" :todo="todo" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import CalendarHolidaysLabel from '../atom/CalendarHolidaysLabel.vue';
import CalendarTaskTag from '../molecule/CalendarTaskTag.vue';

export default {
  components: {
    CalendarHolidaysLabel,
    CalendarTaskTag,
  },
  data() {
    return {
      weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      isModalActive: false,
      holidays: [],
    };
  },
  computed: {
    ...mapState(['year', 'month', 'day', 'todo']),
    arrDays() {
      const { year, month } = this;
      const lastYear = year - 1;
      const nextYear = year + 1;
      const lastMonth = month - 1 ? month - 1 : 12;
      const nextMonth = month + 1 === 13 ? 1 : month + 1;

      const formatDate = (yyyy, mm, dd) => {
        const YYYY = `${yyyy}`;
        const MM = `${`00${mm}`.slice(-2)}`;
        const DD = `${`00${dd}`.slice(-2)}`;

        return YYYY + MM + DD;
      };

      const days31 = [1, 3, 5, 7, 8, 10, 12];

      const startDay = () => {
        const startOfMonth = new Date(year, month - 1, 1);
        return startOfMonth.getDay();
      };

      const today = () => {
        const todayData = new Date();
        const yyyy = todayData.getFullYear();
        const mm = todayData.getMonth() + 1;
        const dd = todayData.getDate();

        return formatDate(yyyy, mm, dd);
      };

      const lastMonthEndDays = () => {
        const dateArr = [];
        const makeArr = (days, endDaysCount) => {
          for (let day = days; day > endDaysCount; day -= 1) {
            const obj = {};
            const lastMonthYear = month === 1 ? lastYear : year;
            obj.date = formatDate(lastMonthYear, lastMonth, day);
            obj.n = day;
            obj.grayout = true;
            dateArr.push(obj);
          }
          return dateArr.reverse();
        };
        // 2月
        if (lastMonth === 2) {
          const days = year % 4 === 0 ? 29 : 28;
          const endDaysCount = days - startDay();
          return makeArr(days, endDaysCount);
        }
        // 31日ある月
        if (days31.includes(lastMonth)) {
          const endDaysCount = 31 - startDay();
          return makeArr(31, endDaysCount);
        }
        // 30日の月
        const endDaysCount = 30 - startDay();
        return makeArr(30, endDaysCount);
      };

      const thisMonth = () => {
        const dateArr = [];
        const makeArr = (days) => {
          for (let n = 1; n <= days; n += 1) {
            const obj = {};
            obj.date = formatDate(year, month, n);
            obj.n = n;
            obj.isToday = obj.date === today();

            dateArr.push(obj);
          }
          return dateArr;
        };
        // 2月
        if (month === 2) {
          const days = year % 4 === 0 ? 29 : 28;
          return makeArr(days);
        }
        // 31日ある月
        if (days31.includes(month)) {
          return makeArr(31);
        }
        // 30日の月
        return makeArr(30);
      };

      const nextMonthStartDays = () => {
        const dateArr = [];
        const startDaysCount = 42 - [...lastMonthEndDays(), ...thisMonth()].length;
        for (let n = 1; n <= startDaysCount; n += 1) {
          const obj = {};
          const nextMonthYear = month === 12 ? nextYear : year;
          obj.date = formatDate(nextMonthYear, nextMonth, n);
          obj.n = n;
          obj.grayout = true;
          dateArr.push(obj);
        }
        return dateArr;
      };

      return [...lastMonthEndDays(), ...thisMonth(), ...nextMonthStartDays()];
    },
  },
  mounted() {
    axios
      .get('https://holidays-jp.github.io/api/v1/date.json')
      .then((holidays) => {
        // 取得した祝日の日付のフォーマット
        const holidaysData = [];
        Object.entries(holidays.data).forEach(([day, value]) => {
          const holiday = day.replace(/-/g, '');
          const obj = {};
          obj[`${holiday}`] = value;
          holidaysData.push(obj);
        });

        this.holidays = holidaysData;
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error(e.messege);
      });
  },
  methods: {
    openModal(date) {
      this.$emit('openModal', date);
    },
  },
};
</script>

<style lang="scss" module>
.Calendar {
  backdrop-filter: blur(3px);
  background-color: #1f1f1f80;
  border-radius: 10px;
  overflow: hidden;
}

.weeks {
  background-color: #1f1f1f80;
  display: flex;
  padding: 1rem;

  &__item {
    text-align: center;
    width: calc(100% / 7);
  }
}

.days {
  display: flex;
  flex-wrap: wrap;

  &__item {
    height: 100px;
    padding: 10px;
    width: calc(100% / 7);

    &:not(:nth-last-child(-n + 7)) {
      border-bottom: 1px solid #2d2d2d;
    }

    &:not(:nth-child(7n)) {
      border-right: 1px solid #2d2d2d;
    }
  }

  &__number {
    margin-bottom: 5px;
  }
}

.grayout {
  background-color: #1f1f1f33;
  color: #000;
}

.today {
  &:after {
    content: '★';
  }
}
</style>
