<template>
  <div :class="$style.wrapper">
    <div
      v-for="(task, index) of isHavingTask"
      v-show="index < 2 ? index < 2 : isShow"
      :key="task.key"
      :class="$style.tag"
      :style="{ backgroundColor: task.color }"
    >
      <p :class="$style.tag__text">{{ task.contents }}</p>
      <button :class="$style.delete" @click.stop="deleteTask(task.key)">close</button>
    </div>
    <div v-if="isHavingTask.length - 2 > 0 && !isShow" :class="$style.info" @click.stop="showingAllTask">
      <span :class="$style.info__text">{{ `他 ${isHavingTask.length - 2} 件` }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    isHavingTask() {
      return this.todos.filter((task) => task.data === this.date);
    },
  },
  methods: {
    ...mapActions(['handleAddTask']),
    deleteTask(keys) {
      const filteredTodo = this.todos.filter((task) => task.key !== keys);

      const setItem = (key, value) => {
        try {
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          return false;
        }
      };
      setItem('Vue_Calendar', filteredTodo);
      this.handleAddTask(filteredTodo);
    },
    showingAllTask() {
      this.isShow = true;
    },
  },
};
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
}

.tag {
  align-items: center;
  border-radius: 2px;
  color: #fff;
  display: flex;
  font-size: 10px;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 3px 5px 3px 8px;

  &__text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.info {
  margin-top: 5px;
  text-align: right;

  &__text {
    cursor: pointer;
    font-size: 10px;
  }
}

.delete {
  font-family: 'Material Icons', sans-serif;
}
</style>
