<template>
  <div :class="$style.modal">
    <div :class="$style.modal__background" @click="closeModal" />
    <div :class="$style.modal__main">
      <h3 :class="$style.modal__heading">{{ modalNum }}</h3>
      <CalendarTaskInput :data="modalNum" :todo="todo" @closeModal="closeModal" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CalendarTaskInput from '../molecule/CalendarTaskInput.vue';

export default {
  components: {
    CalendarTaskInput,
  },
  props: {
    modalNum: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(['todo']),
  },
  methods: {
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>

<style lang="scss" module>
.modal {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;

  &__background {
    backdrop-filter: blur(1px);
    background: rgb(0 0 0 / 0.4);
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
  }

  &__main {
    animation: fadeUp 1s cubic-bezier(0.25, 1, 0.5, 1) 0.2s forwards;
    background: rgb(0 0 0 / 0.4);
    border-radius: 8px;
    opacity: 0;
    padding: 15px;
    position: relative;
    text-align: center;
    transform: translateY(30px);
    width: 300px;

    @keyframes fadeUp {
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &__heading {
    font-size: 20px;
    margin-bottom: 10px;
  }
}
</style>
