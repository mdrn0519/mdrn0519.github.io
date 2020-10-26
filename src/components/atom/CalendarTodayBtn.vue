<template>
  <button :class="$style.today" @click="handleToThisCalendar">calendar_today</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['handleToThisCalendar']),
  },
};
</script>

<style lang="scss" module>
.today {
  border: 1px solid #efefef;
  border-radius: 4px;
  font-family: 'Material Icons', sans-serif;
  font-size: 20px;
  padding: 10px 15px;
}
</style>
