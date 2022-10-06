const configureStore = require("@reduxjs/toolkit").configureStore;
const cakeReducer = require("../features/cake/cakeSlice");
const reduxLogger = require("redux-logger");
const icecreamReducer = require("../features/icecream/icecreamSlice");
const userReducer = require("../features/user/userSlice");

const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    // cake: cakeReducer,
    // icecream: icecreamReducer,
    user: userReducer,
  },
  // `getDefaultMiddleware` የሚለው ፈንክሽን አብሮ የሚመጣ ነው
  //   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
