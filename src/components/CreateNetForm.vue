<template>
  <form class="create-net-form" @submit.prevent="submit" novalidate>
    <transition name="form-fade" mode="out-in" appear>
      <template v-if="!isPending && !isLoaded">
        <div class="create-net-form__wrp">
          <div class="create-net-form__img-wrp">
            <img class="create-net-form__img" src="@/assets/eth.png" />
          </div>
          <div class="create-net-form__input-wrp">
            <input
              type="text"
              class="form-control"
              :class="{
                'is-invalid': !validation.form.name.value,
              }"
              placeholder="Network name"
              v-model="form.name"
            />
            <div class="invalid-feedback">Network name is required!</div>
          </div>
          <button class="create-net-form__btn btn btn-primary" type="submit">
            Create network
          </button>
        </div>
      </template>

      <template v-else-if="isLoaded">
        <div class="create-net-form__data-wrp">
          <div class="create-net-form__input-wrp">
            <input
              ref="privateSshKey"
              type="text"
              class="create-net-form__data-input form-control"
              :value="data.sshKey"
              readonly
            />
            <i
              @click="copyToClipboard('privateSshKey')"
              class="create-net-form__input-wrp-icon bi bi-sticky-fill"
            />
            <label class="form-label">Private SSH</label>
          </div>
          <div class="create-net-form__input-wrp">
            <input
              ref="privateValidator"
              type="text"
              class="create-net-form__data-input form-control"
              :value="data.validatorKey"
              readonly
            />
            <i
              @click="copyToClipboard('privateValidator')"
              class="create-net-form__input-wrp-icon bi bi-sticky-fill"
            />
            <label class="form-label">Validator private</label>
          </div>
          <div class="create-net-form__input-wrp">
            <input
              ref="passphrase"
              type="text"
              class="create-net-form__data-input form-control"
              :value="data.passphrase"
              readonly
            />
            <i
              @click="copyToClipboard('passphrase')"
              class="create-net-form__input-wrp-icon bi bi-sticky-fill"
            />
            <label class="form-label">Passphrase</label>
          </div>
        </div>
      </template>

      <template v-else-if="isFailed">
        <div
          class="create-net-form__error-wrp alert alert-dismissible alert-danger"
        >
          <p class="create-net-form__error-msg">
            <strong>Something bad happened</strong>
          </p>
          <i class="create-net-form__error-icon bi bi-emoji-frown-fill"></i>
        </div>
      </template>

      <template v-else>
        <div class="create-net-form__loader-wrp">
          <loader />
        </div>
      </template>
    </transition>
  </form>
</template>

<script>
import TrexLoader from './TrexLoader'
import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'
import { isEmpty } from 'lodash'

import { required } from '../validators'
import { api } from '../api'

export default {
  name: 'create-net-form',

  components: { loader: TrexLoader },

  data: () => ({
    isPending: false,
    isLoaded: false,
    isValid: false,
    isFailed: false,
    data: {},
    form: {
      name: '',
    },
    validation: {
      form: {
        name: {
          value: true,
          validators: [required],
        },
      },
    },
  }),

  created() {
    if (!isEmpty(this.$route.query)) {
      this.data = this.$route.query
      this.isLoaded = true
      this.isPending = false
    }
  },

  watch: {
    'form.name': {
      handler(value) {
        this.validation.form.name.value = required(value)
      },
    },
  },

  computed: {
    formIsValid() {
      let isValid = true
      for (let [key, value] of Object.entries(this.form)) {
        this.validation.form[key].validators.forEach((validator) => {
          if (validator(value)) {
            this.validation.form[key].value = true
          } else {
            isValid = false
            this.validation.form[key].value = false
          }
        })
      }
      return isValid
    },
  },

  methods: {
    ...mapActions({
      createNetwork: vuexTypes.CREATE_NETWORK,
    }),

    async submit() {
      if (!this.formIsValid) {
        return
      }

      this.isPending = true

      try {
        await this.createNetwork({ name: this.form.name })
        const data = await this.checkStatus()
        console.log(data)
        this.data = data
        this.isLoaded = true
        this.$router.replace({ query: { name: data.name } })
      } catch (e) {
        this.isFailed = true
        console.error(e)
      }
    },

    copyToClipboard(ref) {
      this.$refs[ref].select()
      document.execCommand('copy')
    },

    checkStatus () {
      const vs = this
    return new Promise(function () {
        let id = setInterval(async (resolve) => {
          let { data } = await api.get(`/envs/${vs.form.name}`)
                if (data.status === 'created') {
                    clearInterval(id)
                    resolve(data)
                }
           }, 30000);
    })
    }
  },
}
</script>

<style lang="scss">
.create-net-form {
  &__wrp,
  &__loader-wrp,
  &__data-wrp,
  &__error-wrp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.2rem;
    width: 42.5rem;
    padding: 3.5rem;
    background: #fff;
  }

  &__error-wrp {
    flex-direction: row;
  }

  &__error-msg {
    font-size: 1.5rem;
    margin-bottom: 0;
  }

  &__error-icon {
    font-size: 3rem;
  }

  &__loader-wrp {
    height: 30rem;
    padding: 0;
  }

  &__data-input {
    margin-bottom: 0.5rem;
  }

  &__data-input.form-control {
    padding-right: 3rem;
  }

  &__input-wrp-icon {
    position: absolute;
    top: 0.3rem;
    right: 0.8rem;
    font-size: 1.5rem;
    z-index: 5;
    color: #8d8d8d;

    &:hover {
      cursor: pointer;
      color: #1a1a1a;
    }
  }

  &__input-wrp {
    position: relative;
    width: 30rem;
  }

  &__img {
    width: 5rem;
  }
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: opacity 0.3s;
}

.form-fade-enter,
.form-fade-leave-to {
  opacity: 0;
}
</style>
