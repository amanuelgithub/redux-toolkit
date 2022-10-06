const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numOfIcecream: 20,
};

// redux-toolkit በውስጥ ታዋቂነት የactionType ሲሰራ የname እና የreducers የፈንክሺን ስሞችሂን ያቀናጃልች
const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIcecream--;
    },
    restoked: (state, action) => {
      state.numOfIcecream += action.payload;
    },
  },

  // ኬክ ሲገዙ አንድ iceream መጨመር. ይህ ሃሳብ `extra reducers` ይባላል
  extraReducers: (builder) => {
    builder.addCase(cakeActions.ordered, (state) => {
      state.numOfIcecream--;
    });
  },
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
