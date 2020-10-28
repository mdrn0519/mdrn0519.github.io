<template>
  <div v-if="holidayValue" :class="$style.tag">{{ holidayValue }}</div>
</template>

<script>
export default {
  props: {
    holidays: {
      type: Array,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      holidayValue: '',
    };
  },
  created() {
    const { holidays, date } = this;
    holidays.forEach((holiday) => {
      if (Object.keys(holiday)[0] === date) {
        const holidayValues = Object.values(holiday)[0];
        this.holidayValue = holidayValues;
      }
    });
  },
};
</script>

<style lang="scss" module>
.tag {
  background-color: #f1f1f1;
  border-radius: 2px;
  color: #666;
  font-size: 10px;
  padding: 3px 5px;
}
</style>
