import { InviteApi } from "../providers"

const getInfoFromInvite = (hashInvite: string) => InviteApi.post('/' + hashInvite)

export const InviteService = {
  getInfoFromInvite,
}