import { MemberApi, GroupApi } from "../providers"
import IGroupData from "../shared/types/Group"
import IRequestSaveGroup from "../shared/types/RequestSaveGroup"

const getGroupsByPerson = (personId: number) => MemberApi.get('/searchGroup/person/' + personId)
const deleteGroupByGroupId = (groupId: number) => GroupApi.delete('/' + groupId )
const editGroup = (group: IGroupData) => GroupApi.put('/', group)
const removeMemberFromGroupId = (personId: number, groupId: number) => MemberApi.delete('/deletePerson/'+ personId + '/group/' + groupId)
const createGroup = (newGroup: IRequestSaveGroup) => GroupApi.post('/', newGroup)

export const GroupService = {
  getGroupsByPerson,
  deleteGroupByGroupId,
  removeMemberFromGroupId,
  createGroup,
  editGroup
}