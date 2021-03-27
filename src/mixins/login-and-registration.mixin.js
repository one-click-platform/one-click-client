import MetamaskMixin from '@/vue/mixins/metamask.mixin'

import { ErrorHandler } from '@/js/helpers/error-handler'
import { vueRoutes } from '@/vue-router/routes'
import { api } from '@/api'
import { errors } from '@/js/errors'
import { mapActions } from 'vuex'
import { vuexTypes } from '@/vuex'

export default {
  mixins: [MetamaskMixin],
  methods: {
    ...mapActions({
      setEncodedToken: vuexTypes.SET_ENCODED_TOKEN,
    }),

    async getAddress () {
      let accountId
      try {
        accountId = await this.getAccount()

        const endpoint = `/addresses/${accountId}`

        await api.get(endpoint)

        return accountId
      } catch (error) {
        switch (error.constructor) {
          case errors.NotFoundError:
            const { data: token } =
              await this.registrationWithMetamask(accountId)

            await this.setEncodedToken({ token })
            await this.logInAccount({ token })
            await this.$router.push(vueRoutes.logs)

            break
          default:
            ErrorHandler.process(error)
        }
      }
    },

    async logInWithMetamask (accountId) {
      const signedMessage = await this.getMetemaskMessage(accountId)
      const query = JSON.stringify({
        data: {
          type: 'login_request',
          attributes: {
            auth_pair: {
              address: accountId,
              signed_message: signedMessage,
            },
          },
        },
      })

      const { data } = await api.post('/login', query)
      return data
    },

    async registrationWithMetamask (accountId) {
      try {
        const signedMessage = await this.getMetemaskMessage(accountId)
        const query = JSON.stringify({
          data: {
            type: 'register',
            attributes: {
              auth_pair: {
                address: accountId,
                signed_message: signedMessage,
              },
            },
          },
        })

        const data = await api.post('/register', query)
        return data
      } catch (e) {
        ErrorHandler.process(e)
      }
    },

    async getMetemaskMessage (accountId) {
      const { message } = await this.getAuthNonceMessage(accountId)
      const signedMessage =
        await this.getSignedMessage(message)
      return signedMessage
    },

    async getAuthNonceMessage (account) {
      const query = JSON.stringify({
        data: {
          type: 'auth_nonce_request',
          attributes: {
            address: account,
          },
        },
      })
      const { data } = await api.post('/nonce', query)
      return data
    },
  },
}
