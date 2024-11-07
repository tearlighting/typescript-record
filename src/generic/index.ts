type forEachCallback<K, V> = (
  value: V,
  key: K,
  dictionary: Dictionary<K, V>,
) => void;
class Dictionary<K, V> {
  private keys: K[] = [];
  private values: V[] = [];

  set(key: K, value: V) {
    const index = this.keys.indexOf(key);
    if (index < 0) {
      this.keys.push(key);
      this.values.push(value);
    } else {
      this.values[index] = value;
    }
  }
  forEach(callback: forEachCallback<K, V>) {
    this.keys.forEach((key, i) => {
      const value = this.values[i];
      callback(value, key, this);
    });
  }
  has(key: K) {
    return this.keys.includes(key);
  }
  delete(key: K) {
    try {
      // throw new Error("1")
      const index = this.keys.indexOf(key);
      if (index >= 0) {
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
      }
      return true;
    } catch (err) {
      return false;
    }
  }
  clear() {
    this.keys = [];
    this.values = [];
  }
  get(key: K) {
    const index = this.keys.indexOf(key);
    if (index < 0) return;
    return this.values[index];
  }
  get size() {
    return this.keys.length;
  }
  static instance<K, V>() {
    return new Dictionary<K, V>();
  }
}

const dic = Dictionary.instance<string, Object>();
dic.set("1", {});
dic.set("2", {});

dic.forEach(function (v, k) {
  //@ts-ignore
  console.log(v, k);
});
