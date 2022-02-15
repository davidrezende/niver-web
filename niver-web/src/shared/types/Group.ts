import Member from "./Member";

export default interface IGroupData {
  idGroup?: any | null,
  name?: string,
  members?: Member[],
  owner?: Member
}