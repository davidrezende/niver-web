import { useCallback, useState } from "react";
import { GroupService } from "../services/GroupService";
import IGroupData from "../shared/types/Group";
import IRequestSaveGroup from "../shared/types/RequestSaveGroup";

export const useGroups = () => {
  const [groups, setGroups] = useState<IGroupData[]>([]);
  const getGroupsByPerson = useCallback(async () => {
    const { status, data } = await GroupService.getGroupsByPerson(1);

    if (status != 200) throw new Error();
    setGroups(data)
  },
    []);

  const createGroup = useCallback(async (newGroup: IRequestSaveGroup) => {
    const { status } = await GroupService.createGroup(newGroup)

    if (status != 200) throw new Error();
  }, []);

  
  const removeMemberFromGroupId = useCallback(async (personId: number, groupId: number) => {
    const { status } = await GroupService.removeMemberFromGroupId(personId, groupId)

    if (status != 200) throw new Error();
  }, []);

  const deleteGroupByGroupId = useCallback(async (groupId: number) => {
    const { status } = await GroupService.deleteGroupByGroupId(groupId)

    if (status != 200) throw new Error();
  }, []);

  return {
    groups,
    getGroupsByPerson,
    createGroup,
    deleteGroupByGroupId,
    removeMemberFromGroupId
  };
};