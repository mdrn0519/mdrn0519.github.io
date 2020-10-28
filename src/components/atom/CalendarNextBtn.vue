<template>
  <button :class="$style.next" @click="handleToNextCalendar">chevron_right</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['handleToNextCalendar']),
  },
};
</script>

<style lang="scss" module>
.next {
  border: 1px solid #efefef;
  border-radius: 4px;
  font-family: 'Material Icons', sans-serif;
  font-size: 20px;
  margin-right: 5px;
  padding: 10px 15px;
}
</style>
