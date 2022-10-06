const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const logger = reduxLogger.createLogger();

// notes
// actionType -> name of the action, action -> object with type property , ActionCreatror -> function

// actionType
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOKED = "CAKE_RESTOKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOKED = "ICECREAM_RESTOKED";

// actionCreator
function orderCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOKED,
    payload: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOKED,
    payload: qty,
  };
}
// (prevState, action) => newState
const cakeInitialState = {
  numOfCakes: 10,
};

const icecreamInitialState = {
  numOfIcecreams: 20,
};

const cakeReducer = (state = cakeInitialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };

    case CAKE_RESTOKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };

    default:
      return state;
  }
};

const icecreamReducer = (state = icecreamInitialState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - action.payload,
      };

    case ICECREAM_RESTOKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
      };

    // ኬክ ሲገዙ አንድ iceream መጨመር. ይህ ሃሳብ `extra reducers` ይባላል
    case CAKE_ORDERED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams--,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

// redux store -> just one single store for the entire application
const store = createStore(rootReducer, applyMiddleware(logger));

const unsubscribe = store.subscribe(() => {});

const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(3);

unsubscribe();
