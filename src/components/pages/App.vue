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
      <CalendarMordal v-if="isActive" :active-modal-number="activeModalNumber" @closeModal="closeModal" />
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
      activeModalNumber: '20200101',
    };
  },
  computed: {
    ...mapState(['isActiveModal']),
  },
  created() {
    this.handleToCurrentCalendar();

    const storageAvailable = () => {
      try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        return false;
      }
    };

    const getTaskData = (key) => {
      if (storageAvailable()) return localStorage.getItem(key) ? localStorage.getItem(key) : '[]';
      // eslint-disable-next-line no-console
      console.error('ローカルストレージが使えないので、Todoは保存できません');
      return '[]';
    };

    const todo = getTaskData('Vue_Calendar');
    this.handleFetchTodo(JSON.parse(todo));
  },
  methods: {
    ...mapActions(['handleToCurrentCalendar', 'handleFetchTodo']),
    openModal(date) {
      this.activeModalNumber = date;
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
  margin: 0 auto;
  max-width: 990px;
  padding: 30px 20px 0;
}

.transition {
  transition: opacity 0.2s;
}

.opacity {
  opacity: 0;
}
</style>
