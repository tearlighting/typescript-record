const describation = "descriptor";

const descriptor = (des: string) => {
  return Reflect.metadata(describation, des);
};
//**实例对象 */
const print = (obj: Object) => {
  const proto = Reflect.getPrototypeOf(obj);
  // console.log(proto!.constructor);

  let name = proto!.constructor.name;
  if (Reflect.hasMetadata(describation, proto!.constructor)) {
    // console.log(Reflect.getMetadata(describation,proto!));
    name = Reflect.getMetadata(describation, proto!.constructor);
  }
  const props = Object.keys(obj).map((key) => {
    const res = {
      value: obj[key],
      key,
      desc: undefined,
    };
    if (Reflect.hasMetadata(describation, proto!, key)) {
      res.desc = Reflect.getMetadata(describation, proto!, key);
    } else if (Reflect.hasMetadata(describation, proto!.constructor, key)) {
      res.desc = Reflect.getMetadata(describation, proto!.constructor, key);
    }
    return res;
  });
  console.log(name, props);
};

export { descriptor, print as printObj };
