import * as fb from 'firebase'

class Order {
    constructor(name, phone, adId, done = false, id = null){
        this.name = name
        this.phone = phone
        this.adId = adId
        this.done = done
        this.id = id
    }
}

export default{
    state:{
        orders:[]
    },
    mutations:{
       loadOrders (state, payload){
        state.orders = payload
       }
    },
    actions:{
       async createOrder({commit}, {name, phone, adId, ownerId}){
            const order = new Order(name, phone, adId)
            commit('clearError')

            try {
                await fb.database().ref(`/users/${ownerId}/orders/`).push(order)
            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        },
        async fetchOrders({commit, getters}){
            commit('setLoading', true)
            commit('clearError')

            const resultOrders = []

            try {
                const fbVal = await fb.database().ref(`/users/${getters.user.id}/orders`).once('value')
                const oredrs = fbVal.val()

                Object.keys(oredrs).forEach(key => {
                    const order = oredrs[key]
                    resultOrders.push(new Order(order.name, order.phone, order.adId, order.done, key))
                  })
                  commit ('loadOrders', resultOrders)

                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
            }
        },
        async markOrderDone({commit}, payload){
            commit('clearError')
            try {
                // eslint-disable-next-line no-undef
                await fb.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({done:true})

            } catch (error) {
                commit('setError', error.message)
                throw error
            }
        }
    },
    getters:{
        orders(state, getters){
            return getters.undoneOrders.concat(getters.doneOrders)
        },
        doneOrders(state){
            return state.orders.filter(o => o.done)
        },
        undoneOrders(state){
            return state.orders.filter(o => !o.done)
        }
    }
}
