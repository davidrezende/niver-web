import { MemberApi, GroupApi } from "../providers"
import IGroupData from "../shared/types/Group"
import IRequestSaveGroup from "../shared/types/RequestSaveGroup"

const getGroupsByPerson = () => MemberApi.get('/searchGroup/person/12')
const deleteGroupByGroupId = (groupId: number) => GroupApi.delete('/' + groupId )
const editGroup = (group: IGroupData) => GroupApi.put('/', group)
const removeMemberFromGroupId = (peronId: number, groupId: number) => MemberApi.delete('/deletePerson/'+ peronId + '/group/' + groupId)
const createGroup = (newGroup: IRequestSaveGroup) => GroupApi.post('/', newGroup)

export const GroupService = {
  getGroupsByPerson,
  deleteGroupByGroupId,
  removeMemberFromGroupId,
  createGroup,
  editGroup
}