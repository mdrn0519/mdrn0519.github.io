import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    year: 2020,
    month: 1,
    date: 1,
    day: 0,

    isActiveModal: 0,
    todos: [],
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
    addTask(state, task) {
      this.state.todos = task;
    },
    fetchTodo(state, task) {
      this.state.todos = task;
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
    handleAddTask({ commit }, payload) {
      commit('addTask', payload);
    },
    handleFetchTodo({ commit }, payload) {
      commit('fetchTodo', payload);
    },
  },
});
