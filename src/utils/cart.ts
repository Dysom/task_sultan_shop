// import { store } from "../store";
// import { getObjectCopy } from ".";

const CART_STORAGE_NAME = "cart_state";

export const saveCartToLocalStorage = (cartState: any) => {
  try {
    const cartStringState = JSON.stringify(cartState);
    localStorage.setItem(CART_STORAGE_NAME, cartStringState);
  } catch (error) {
    console.log(error);
  }
};

export const loadCartFromLocalStorage = (): any => {
  try {
    const cartStringState = localStorage.getItem(CART_STORAGE_NAME);

    if (cartStringState === null) {
      throw new Error("state is null");
    }

    return JSON.parse(cartStringState);
  } catch (err) {
    return [];
  }
};

// export const saveChangesCartToLocalStorage = () =>
//   saveCartToLocalStorage(store.getState().cart.items);
