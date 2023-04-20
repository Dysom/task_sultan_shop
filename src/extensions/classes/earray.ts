export class EArray {
  static insertUnique<T>(arr: T[], value: T): boolean {
    if (!arr.includes(value)) {
      arr.push(value);

      return true;
    }

    return false;
  }

  static deleteUnique<T>(arr: T[], value: T): boolean {
    const index = arr.findIndex((item) => item === value);

    if (index >= 0) {
      arr.splice(index, 1);

      return true;
    }

    return false;
  }
}
