import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    year: 2020,
    month: 1,

    isActiveModal: 0,
    todos: [],
  },
  mutations: {
    toPrevCalendar() {
      this.state.month -= 1;
      if (this.state.month < 1) {
        this.state.month = 12;
        this.state.year -= 1;
      }
    },
    toNextCalendar() {
      this.state.month += 1;
      if (this.state.month > 12) {
        this.state.month = 1;
        this.state.year += 1;
      }
    },
    toCurrentCalendar() {
      const date = new Date();
      this.state.year = date.getFullYear();
      this.state.month = date.getMonth() + 1;
    },
    addTask(state, task) {
      this.state.todos = task;
    },
    fetchTodo(state, task) {
      this.state.todos = task;
    },
  },
  actions: {
    handleToPrevCalendar({ commit }) {
      commit('toPrevCalendar');
    },
    handleToNextCalendar({ commit }) {
      commit('toNextCalendar');
    },
    handleToCurrentCalendar({ commit }) {
      commit('toCurrentCalendar');
    },
    handleAddTask({ commit }, payload) {
      commit('addTask', payload);
    },
    handleFetchTodo({ commit }, payload) {
      commit('fetchTodo', payload);
    },
  },
});
