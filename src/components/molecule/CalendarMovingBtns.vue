<template>
  <div :class="$style.btns">
    <PrevBtn />
    <NextBtn />
    <TodayBtn />
  </div>
</template>

<script>
import PrevBtn from '../atom/CalendarPrevBtn.vue';
import NextBtn from '../atom/CalendarNextBtn.vue';
import TodayBtn from '../atom/CalendarTodayBtn.vue';

export default {
  components: {
    PrevBtn,
    NextBtn,
    TodayBtn,
  },
};
</script>

<style lang="scss" module>
.btns {
  display: flex;
}
</style>
