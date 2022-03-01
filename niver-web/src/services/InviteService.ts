import { InviteApi } from "../providers"
import IRequestCreateInviteData from "../shared/types/RequestCreateInvite"

const getInfoFromInvite = (hashInvite: string) => InviteApi.get('/' + hashInvite)
const generateOrRecreateInvite = (requestInvite: IRequestCreateInviteData) => InviteApi.post('/', requestInvite)
const getInviteExistsFromGroup = (groupId: number, ownerId: number) => InviteApi.get('/' + groupId + '/' + ownerId)

export const InviteService = {
  getInfoFromInvite,
  getInviteExistsFromGroup,
  generateOrRecreateInvite
}