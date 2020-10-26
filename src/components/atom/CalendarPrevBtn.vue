<template>
  <button :class="$style.prev" @click="handleBackwardCalendar">chevron_left</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['handleBackwardCalendar']),
  },
};
</script>

<style lang="scss" module>
.prev {
  border: 1px solid #efefef;
  border-radius: 4px;
  font-family: 'Material Icons', sans-serif;
  font-size: 20px;
  margin-right: 5px;
  padding: 10px 15px;
}
</style>
