import { get } from 'lodash'
import { createSelector } from 'reselect'

//web3 selector
const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, w => w)

//account selector
const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

//escrow selector
const escrowLoaded = state => get(state, 'escrow.loaded', false)
export const escrowLoadedSelector = createSelector(escrowLoaded, el => el)

const escrow = state => get(state, 'escrow.contract')
export const escrowSelector = createSelector(escrow, e => e)