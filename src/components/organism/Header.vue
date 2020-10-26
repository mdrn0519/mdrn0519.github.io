<template>
  <div :class="$style.header">
    <h1 :class="$style.heading">Vue Calendar</h1>
    <h2 :class="$style.subheading">{{ `${year} / ${month}月` }}</h2>
    <CalendarMovingBtns />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CalendarMovingBtns from '../molecule/CalendarMovingBtns.vue';

export default {
  components: {
    CalendarMovingBtns,
  },
  computed: {
    ...mapState(['year', 'month']),
  },
};
</script>

<style lang="scss" module>
.header {
  align-items: center;
  display: flex;
  margin-bottom: 10px;
}

.heading {
  margin-right: auto;
}

.subheading {
  margin-right: 20px;
}
</style>
