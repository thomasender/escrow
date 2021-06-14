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

const buyerLoaded = state => get(state, 'escrow.buyer', false)
export const buyerLoadedSelector = createSelector(buyerLoaded, bl => bl)

const buyer = state => get(state, 'escrow.buyer')
export const buyerSelector = createSelector(buyer, b => b)

const sellerLoaded = state => get(state, 'escrow.seller', false)
export const sellerLoadedSelector = createSelector(sellerLoaded, sl => sl)

const seller = state => get(state, 'escrow.seller')
export const sellerSelector = createSelector(seller, s => s)

const priceLoaded = state => get(state, 'escrow.price', false)
export const priceLoadedSelector = createSelector(priceLoaded, pl => pl)

const price = state => get(state, 'escrow.price')
export const priceSelector = createSelector(price, p => p)

const currentStateLoaded = state => get(state, 'escrow.currentState', false)
export const currentStateLoadedSelector = createSelector(currentStateLoaded, csl => csl)

const currentState = state => get(state, 'escrow.currentState')
export const currentStateSelector = createSelector(currentState, cs => cs)

const isBuyerInLoaded = state => get(state, 'escrow.isBuyerIn', false)
export const isBuyerInLoadedSelector = createSelector(isBuyerInLoaded, ibil => ibil)

const isBuyerIn = state => get(state, 'escrow.isBuyerIn')
export const isBuyerInSelector = createSelector(isBuyerIn, ibi => ibi)

const isSellerInLoaded = state => get(state, 'escrow.isSellerIn', false)
export const isSellerInLoadedSelector = createSelector(isSellerInLoaded, isil => isil)

const isSellerIn = state => get(state, 'escrow.isSellerIn')
export const isSellerInSelector = createSelector(isSellerIn, isi => isi)

const buyerInitialized = state => get(state, 'escrow.buyerInitialized', false)
export const buyerInitializedSelector = createSelector(buyerInitialized, bi => bi)

const buyerDidPay = state => get(state, 'escrow.buyerDidPay', false)
export const buyerDidPaySelector = createSelector(buyerDidPay, bdp => bdp)