import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // カレンダー周り
    year: 2020,
    month: 1,
    date: 1,
    day: 0,

    isActiveModal: 0,
    todo: [],
  },
  mutations: {
    backwardCalendar() {
      this.state.month -= 1;
      if (this.state.month < 1) {
        this.state.month = 12;
        this.state.year -= 1;
      }
    },
    advanceCalendar() {
      this.state.month += 1;
      if (this.state.month > 12) {
        this.state.month = 1;
        this.state.year += 1;
      }
    },
    toThisCalendar() {
      const date = new Date();
      this.state.year = date.getFullYear();
      this.state.month = date.getMonth() + 1;
      this.state.date = date.getDate();
      this.state.day = date.getDay();
    },
    ctrlModal(state, date) {
      this.state.isActiveModal = date;
    },
    addTask(state, task) {
      this.state.todo = task;
    },
    fetchTodo(state, task) {
      this.state.todo = task;
    },
  },
  actions: {
    handleBackwardCalendar({ commit }) {
      commit('backwardCalendar');
    },
    handleAdvanceCalendar({ commit }) {
      commit('advanceCalendar');
    },
    handleToThisCalendar({ commit }) {
      commit('toThisCalendar');
    },
    handleCtrlModal({ commit }, payload) {
      commit('ctrlModal', payload);
    },
    handleAddTask({ commit }, payload) {
      commit('addTask', payload);
    },
    handleFetchTodo({ commit }, payload) {
      commit('fetchTodo', payload);
    },
  },
});
