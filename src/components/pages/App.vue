<template>
  <div :class="$style.wrapper">
    <Header />
    <Calendar @openModal="openModal" />
    <transition
      :leave-active-class="$style.transition"
      :enter-active-class="$style.transition"
      :enter-class="$style.opacity"
      :leave-to-class="$style.opacity"
    >
      <CalendarMordal v-if="isActive" :modal-num="modalNum" @closeModal="closeModal" />
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Header from '../organism/Header.vue';
import Calendar from '../organism/Calendar.vue';
import CalendarMordal from '../organism/CalendarModal.vue';

export default {
  components: {
    Header,
    Calendar,
    CalendarMordal,
  },
  data() {
    return {
      isActive: false,
      modalNum: '20200101',
    };
  },
  computed: {
    ...mapState(['isActiveModal', 'todo']),
  },
  created() {
    this.handleToThisCalendar();

    const getTaskData = (key) => {
      try {
        return localStorage.getItem(key) ? localStorage.getItem(key) : '[]';
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return false;
      }
    };

    const todo = getTaskData('Vue_Calendar');
    this.handleFetchTodo(JSON.parse(todo));
  },
  methods: {
    ...mapActions(['handleToThisCalendar', 'handleFetchTodo']),
    openModal(date) {
      this.modalNum = date;
      this.isActive = true;
    },
    closeModal() {
      this.isActive = false;
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  height: 100%;
  padding: 3rem 2rem 0;
}

.transition {
  transition: opacity 0.2s;
}

.opacity {
  opacity: 0;
}
</style>
