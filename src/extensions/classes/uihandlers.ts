export class UIHandlers {
  static eventHandler(func: Function, ...values: any[]) {
    return () => {
      return func(...values);
    };
  }

  static fieldElementEventHandler(func: Function, ...values: any[]) {
    return (event: Event) => {
      return func(
        (
          event.currentTarget as
            | HTMLTextAreaElement
            | HTMLInputElement
            | HTMLSelectElement
        ).value,
        ...values
      );
    };
  }
}
