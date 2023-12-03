import { atom, selector } from "recoil";

export const userState = atom({
  key: "userState",
  default: 0,
});

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => get(userState),
  set: ({ set }, value) => {
    set(userState, value);
  },
});

export const infoPageState = atom({
  key: "infoPageState",
  default: 1,
});

export const infoPageSelector = selector({
  key: "infoPageSelector",
  get: ({ get }) => get(infoPageState),
  set: ({ set, get }) => {
    const current = get(infoPageState);
    if (current < 3) {
      set(infoPageState, current + 1);
    } else {
      set(infoPageState, 1);
    }
  },
});

export const paymentStepperToggleState = atom({
  key: "paymentStepperToggleState",
  default: false,
});

export const paymentStepperToggleSelector = selector({
  key: "paymentStepperToggleSelector",
  get: ({ get }) => get(paymentStepperToggleState),
  set: ({ set, get }) => {
    const current = get(paymentStepperToggleState);
    set(paymentStepperToggleState, !current);
  },
});

export const paintingsListState = atom({
  key: "paintingsListState",
  default: [],
});
// Paintings List - dealt with by useTracker @App level
export const paintingsListSelector = selector({
  key: "paintingsListSelector",
  get: ({ get }) => get(paintingsListState),
  set: ({ set }, newValue) => set(paintingsListState, newValue),
});
// current paintng atom - between 0 and paintingList.length()
export const currentPaintingNumberState = atom({
  key: "currentPaintingNumberState",
  default: 0,
});

export const headerScrollSelector = selector({
  key: "headerScrollSelector",
  get: ({ get }) => {
    const current = get(currentPaintingNumberState);
    const paintings = get(paintingsListState);
    const end = paintings.length - 1 == current ? true : false;

    return {current, end};
  }

});

// Get current painting name, or iterate through paintings
export const infoSelector = selector({
  key: "infoSelector",
  get: ({ get }) => {
    //
    const current = get(currentPaintingNumberState);
    const paintings = get(paintingsListState);

    const currentName = paintings[current].name;
    const currentDuration = paintings[current].duration;
    const currentRun = paintings[current].current_run;
    const currentPriceInt = paintings[current].priceAsInt;
    const currentDescription = paintings[current].description;
    const currentSold = paintings[current].current_sold;
    const nextSold = paintings[current].current_sold + 1;
    const currentMaxSold = paintings[current].maximum_sold;

    return {
      currentName,
      currentDuration,
      currentRun,
      currentPriceInt,
      currentDescription,
      currentSold,
      nextSold,
      currentMaxSold,
    };
  },
  set: ({ set, get }, direction) => {
    const current = get(currentPaintingNumberState);
    const available = get(paintingsListState);
    console.log(available.length);

    if (current < available.length - 1 && direction === "right") {
      set(currentPaintingNumberState, current + 1);
    }
    if (current > 0 && direction === "left") {
      set(currentPaintingNumberState, current - 1);
    }
  },
});

export const stepperSelector = selector({
  key: "stepperSelector",
  get: ({ get }) => {
    //
    const current = get(currentPaintingNumberState);
    const paintings = get(paintingsListState);

    const currentName = paintings[current].name;
    const currentRun = paintings[current].current_run;
    const nextSold = paintings[current].current_sold + 1;
    const currentMaxSold = paintings[current].maximum_sold;

    return {
      currentName,
      currentRun,
      nextSold,
      currentMaxSold,
    };
  },
});

export const artContainerSelector = selector({
  key: "artContainerSelector",
  get: ({ get }) => {
    //
    const current = get(currentPaintingNumberState);
    const paintings = get(paintingsListState);

    const currentName = paintings[current].name;
    const currentDuration = paintings[current].duration;
    const currentRun = paintings[current].current_run;

    return {
      currentName,
      currentDuration,
      currentRun,
    };
  },
});

export const savedOrderState = atom({
  key: "savedOrderState",
  default: 1,
});

export const savedOrderSelector = selector({
  key: "savedOrderSelector",
  get: ({ get }) => get(savedOrderState),
  set: ({ set }, value) => {
    set(savedOrderState, value);
  },
});

export const headerContentSelector = selector({
  key: "headerContentSelector",
  get: ({ get }) => {
    //
    const current = get(currentPaintingNumberState);
    const paintings = get(paintingsListState);

    const currentName = paintings[current].name;

    return {
      currentName,
    };
  },
});

export const currentTransactionsAtom = atom({
  key: "currentTransactionsAtom",
  default: [],
});

export const headerLoginState = atom({
  key: "headerLoginState",
  default: false,
});

export const headerLoginSelector = selector({
  key: "headerLoginSelector",
  get: ({ get }) => get(headerLoginState),
  set: ({ set }, value) => {
    set(headerLoginState, value);
  },
});