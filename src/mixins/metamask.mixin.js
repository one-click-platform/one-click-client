import Web3 from 'web3'

export default {
  data: () => ({
    isMetamaskProcessing: false,
    isMetamaskConnected: false,
    isMetamaskEnabled: false,
  }),

  async created() {
    await this.enableMetamask()
  },

  methods: {
    async connectMetamask() {
      await this.enableMetamask()
      if (this.isMetamaskConnected || !this.isMetamaskEnabled) return

      const { ethereum } = window
      const opts = {
        method: 'eth_requestAccounts',
      }

      this.isMetamaskProcessing = true
      await ethereum.request(opts)

      this.isMetamaskProcessing = false
    },

    async enableMetamask() {
      const { ethereum } = window

      window.web3 = new Web3(ethereum)
      this.isMetamaskEnabled = true

      ethereum.on('accountsChanged', async () => {
        await this.checkIfMetamaskIsConnected()
      })

      await this.checkIfMetamaskIsConnected()
    },

    async checkIfMetamaskIsConnected() {
      if (!window.ethereum) return
      this.isMetamaskConnected = Boolean(await this.getAccount())
    },

    async getAccount() {
      if (!this.isMetamaskEnabled) return

      const accounts = await window.web3.eth.getAccounts()

      if (!accounts.length) this.isMetamaskConnected = false

      return accounts[0]
    },

    async getSignedMessage(dataToSing) {
      const { web3 } = window
      const account = await this.getAccount()
      const signedMessage = await web3.eth.personal.sign(dataToSing, account)
      return signedMessage
    },
  },
}
