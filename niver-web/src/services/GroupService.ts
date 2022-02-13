import { MemberApi, GroupApi } from "../providers"
import IRequestSaveGroup from "../shared/types/RequestSaveGroup"

const getGroupsByPerson = () => MemberApi.get('/searchGroup/person/12')
const deleteGroupByGroupId = (groupId: number) => GroupApi.delete('/' + groupId )
const removeMemberFromGroupId = (peronId: number, groupId: number) => MemberApi.delete('/deletePerson/'+ peronId + '/group/' + groupId)
const createGroup = (newGroup: IRequestSaveGroup) => GroupApi.post('group/api', newGroup)

export const GroupService = {
  getGroupsByPerson,
  deleteGroupByGroupId,
  removeMemberFromGroupId,
  createGroup
}