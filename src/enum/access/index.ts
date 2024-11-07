// 位枚举
enum Permission {
  Read = 1, //0001
  Write = 2, //0010
  Create = 4, //0100
  Delete = 8, //1000
}

const access: Permission = Permission.Create | Permission.Read;
/**
 * 位运算
 * | 或运算  一真为真
 * & 且运算  全真为真
 * ^异或     相反为真
 */

function hasPermission<T extends number>(target: T, per: T) {
  return (target & per) === per;
}

hasPermission(access, Permission.Create);

function addPermission<T extends number>(target: T, newAccess: T) {
  return target | newAccess;
}

function deletePermission<T extends number>(target: T, deleteItem: T) {
  return target ^ deleteItem;
}
