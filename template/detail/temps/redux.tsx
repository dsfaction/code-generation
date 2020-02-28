import { combineReducers } from "redux-immutable";

import { ModelProxyReducer, OperationReducer } from "../../../reducers";
import { settings as updatefileRed } from "../updatefile";
import { reducerKey } from "./constant";

export const detailDataReducer = new ModelProxyReducer();
export const chargeListReducer = new ModelProxyReducer();
export const operationDataReducer = new ModelProxyReducer();
export const operationRed = new OperationReducer(); // 列表操作reducer


export const settings = {
    reducer: combineReducers({
        baseDetail: detailDataReducer.reducer,
        chargeList: chargeListReducer.reducer,
        operationListData: operationDataReducer.reducer,
        operationData: operationRed.reducer,
        [updatefileRed.reducerKey]: updatefileRed.reducer
    }),
    actions: [
        detailDataReducer.actions.execute,
        chargeListReducer.actions.execute,
        operationDataReducer.actions.execute,
        operationRed.actions.setOperationInfo,
        ...updatefileRed.actions
    ],
    reducerKey,
    sagas: [
        detailDataReducer.saga.bind(detailDataReducer),
        chargeListReducer.saga.bind(chargeListReducer),
        operationDataReducer.saga.bind(operationDataReducer),
        ...updatefileRed.sagas
    ]
};