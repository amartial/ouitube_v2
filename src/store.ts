import { combineReducers, legacy_createStore as createStore } from "redux";
import { storageReduders } from "./redux/reducers/storageReduders";
import { devToolsEnhancer } from "redux-devtools-extension";

const rootReducers = combineReducers({
    storage: storageReduders
})

const store = createStore(
    rootReducers,
    devToolsEnhancer({}) as any
    )

export default store