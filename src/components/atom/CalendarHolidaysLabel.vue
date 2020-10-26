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
    data: {
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
    const { holidays, data } = this;
    holidays.forEach((holiday) => {
      if (Object.keys(holiday)[0] === data) {
        // eslint-disable-next-line prefer-destructuring
        this.holidayValue = Object.values(holiday)[0];
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
