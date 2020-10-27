<template>
  <form @submit.prevent="addTask">
    <input
      v-model="task"
      type="text"
      placeholder="タスクを追加する"
      autocomplete="off"
      autofocus
      :class="$style.input"
    />
    <div :class="$style.colors">
      <div v-for="(color, index) of colors" :key="color" :class="$style.color">
        <input
          :id="`input_${index}`"
          v-model="chooseColor"
          type="radio"
          :class="$style.color__input"
          name="color"
          :value="color"
        />
        <label :for="`input_${index}`" :class="$style.color__label" :style="{ backgroundColor: `${color}` }" />
      </div>
    </div>
    <button type="submit" :class="$style.btn" :disabled="!task">保存する</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

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
      task: '',
      chooseColor: '#ed143d',
      colors: ['#ed143d', '#ff6347', '#ffd700', '#9acd32', '#96e1d7', '#1e90ff'],
    };
  },
  methods: {
    ...mapActions(['handleAddTask']),
    addTask() {
      if (this.task) {
        const todo = {};
        todo.data = this.date;
        todo.contents = this.task;
        todo.color = this.chooseColor;
        todo.key = uuidv4();

        this.todos.push(todo);

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

        setItem('Vue_Calendar', this.todos);

        this.handleAddTask(this.todos);
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" module>
.input {
  margin-bottom: 15px;
  width: 100%;
}

.colors {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.color {
  &:not(:last-child) {
    margin-right: 10px;
  }

  &__input {
    display: none;
  }

  &__label {
    border-radius: 50%;
    display: block;
    height: 20px;
    width: 20px;
  }

  &__input:checked + &__label {
    box-shadow: 0 0 0 2px #efefef;
  }
}

.btn {
  border: 1px solid #efefef;
  border-radius: 4px;
  margin: 0 auto;
  padding: 5px 10px;

  &:disabled {
    text-decoration: line-through;
  }
}
</style>
