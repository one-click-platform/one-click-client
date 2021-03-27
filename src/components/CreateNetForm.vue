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
            <div class="invalid-feedback">Please correct network name</div>
          </div>
          <div class="create-net-form__input-wrp">
            <textarea
              ref="sshKey"
              class="form-control create-net-form__textarea"
              :value="data.sshKey"
              readonly
            >
            </textarea>
            <i
              @click="copyToClipboard('sshKey')"
              class="create-net-form__input-wrp-icon bi bi-sticky-fill"
            />
            <div class="invalid-feedback">Please enter valid SSH key</div>
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
              :value="data.privateSsh"
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
              :value="data.privateValidator"
              readonly
            />
            <i
              @click="copyToClipboard('privateValidator')"
              class="create-net-form__input-wrp-icon bi bi-sticky-fill"
            />
            <label class="form-label">Validator private</label>
          </div>
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
import LoginAndRegistrationMixin from '../mixins/login-and-registration.mixin'
import TrexLoader from './TrexLoader'
import { vuexTypes } from '@/vuex'
import { mapActions } from 'vuex'

import { required } from '../validators'

export default {
  name: 'create-net-form',

  mixins: [LoginAndRegistrationMixin],
  components: { loader: TrexLoader },

  data: () => ({
    isDisabled: false,
    isPending: false,
    isLoaded: false,
    isValid: false,
    data: {
      sshKey:
        'QWEQQWEQWEQWEWQSADSACCCCCCCCCCDS341RTKG30J09JE098H0G898GHE9WDGSP7VTSCA97SD5ASAYFC89AY8A9CA9S8AFT9',
    },
    form: {
      name: '',
      mmAddress: 'Address',
    },
    validation: {
      form: {
        name: {
          value: true,
          validators: [required],
        },
        mmAddress: {
          value: true,
          validators: [required],
        },
      },
    },
  }),

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
      console.log('Validation passed!')

      let response = await this.createNetwork({
        sshKey: 'ASFJQ21DK012KD012KD012KD01',
        networkName: '4+2.com',
      })

      setTimeout(() => {
        this.data = response
        this.isLoaded = true
      }, 2000)

      // this.isDisabled = true
      // try {
      //   await this.connectMetamask()
      //   const accountId = await this.getAddress()
      //   const token = await this.create-net-formWithMetamask(accountId)
      //   await this.setEncodedToken({ token })
      //   // await this.$router.push(vueRoutes.logs)
      // } catch (e) {
      //   console.error('Some error occured:', e)
      // }
      // this.isDisabled = false
    },

    copyToClipboard(ref) {
      this.$refs[ref].select()
      document.execCommand('copy')
    },
  },
}
</script>

<style lang="scss">
.create-net-form {
  &__wrp,
  &__loader-wrp,
  &__data-wrp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.2rem;
    width: 42.5rem;
    padding: 3.5rem;
    background: #fff;
  }

  &__loader-wrp {
    width: 42rem;
    height: 30rem;
    padding: 0;
  }

  &__textarea {
    resize: none;
    padding-right: 3rem;
  }

  &__textarea.form-control {
    min-height: 15rem;
    max-height: 15rem;
  }

  &__textarea-btn.btn-outline-dark,
  &__textarea.form-control {
    &:focus,
    &:active {
      border: none;
      box-shadow: none;
      outline: none;
    }
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
