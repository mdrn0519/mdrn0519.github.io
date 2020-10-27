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
        <CalendarHolidaysLabel v-if="holidays.length > 0" :holidays="holidays" :date="item.date" />
        <CalendarTaskTag v-if="todos.length > 0" :date="item.date" :todos="todos" />
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
    ...mapState(['year', 'month', 'day', 'todos']),
    arrDays() {
      const { year, month } = this;
      const lastYear = year - 1;
      const nextYear = year + 1;
      const lastMonth = month - 1 ? month - 1 : 12;
      const nextMonth = month + 1 === 13 ? 1 : month + 1;

      const days31 = [1, 3, 5, 7, 8, 10, 12];

      // 月以下の日付を0パディングする
      const formatDate = (yyyy, mm, dd) => {
        const YYYY = `${yyyy}`;
        const MM = `${`00${mm}`.slice(-2)}`;
        const DD = `${`00${dd}`.slice(-2)}`;

        return YYYY + MM + DD;
      };

      const today = () => {
        const todayData = new Date();
        const yyyy = todayData.getFullYear();
        const mm = todayData.getMonth() + 1;
        const dd = todayData.getDate();

        return formatDate(yyyy, mm, dd);
      };

      const lastMonthEndDays = () => {
        const days = () => {
          if (month === 2) return year % 4 === 0 ? 29 : 28; // 2月
          if (days31.includes(month)) return 31; // 31日ある月
          return 30; // 30日の月
        };

        const startDay = () => {
          const startOfMonth = new Date(year, month - 1, 1);
          return startOfMonth.getDay();
        };

        const endDaysCount = days() - startDay();
        return [...Array(days()).keys()]
          .map((i) => {
            if (i >= endDaysCount) {
              const obj = {};
              const lastMonthYear = month === 1 ? lastYear : year;
              obj.date = formatDate(lastMonthYear, lastMonth, i);
              obj.n = i;
              obj.grayout = true;
              return obj;
            }
            return 0;
          })
          .filter((x) => x);
      };

      const currentMonth = () => {
        const days = () => {
          if (month === 2) return year % 4 === 0 ? 29 : 28; // 2月
          if (days31.includes(month)) return 31; // 31日ある月
          return 30; // 30日の月
        };

        return [...Array(days()).keys()].map((i) => {
          const obj = {};
          obj.date = formatDate(year, month, i + 1);
          obj.n = i + 1;
          obj.isToday = obj.date === today();
          return obj;
        });
      };

      const nextMonthStartDays = () => {
        const startDaysCount = 42 - [...lastMonthEndDays(), ...currentMonth()].length;
        return [...Array(startDaysCount).keys()].map((i) => {
          const obj = {};
          const nextMonthYear = month === 12 ? nextYear : year;
          obj.date = formatDate(nextMonthYear, nextMonth, i + 1);
          obj.n = i + 1;
          obj.grayout = true;
          return obj;
        });
      };

      return [...lastMonthEndDays(), ...currentMonth(), ...nextMonthStartDays()];
    },
  },
  mounted() {
    axios
      .get('https://holidays-jp.github.io/api/v1/date.json')
      .then((holidays) => {
        // 取得した祝日の日付のフォーマット
        this.holidays = Object.entries(holidays.data).map(([day, value]) => {
          const holiday = day.replace(/-/g, '');
          const obj = {};
          obj[`${holiday}`] = value;
          return obj;
        });
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
    content: '< today!';
    font-size: 10px;
    margin-left: 10px;
  }
}
</style>
