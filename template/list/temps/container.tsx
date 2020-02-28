import Immutable from "immutable";
import { connect } from "react-redux";
import { compose, lifecycle, withHandlers } from "recompose";
import { Dispatch } from "redux";

import { getTableHoc } from "../../../common/hoc";
import { initParams, IProps, proxySettings, reducerKeys } from "./constant";
import { chargeListReducer, detailDataReducer, operationDataReducer, operationRed } from "./redux";

const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        baseDetail: state.getIn([...reducerKeys, "baseDetail"]),
        chargeList: state.getIn([...reducerKeys, "chargeList"]),
        operationListData: state.getIn([...reducerKeys, "operationListData"])
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IProps) => {
    return {
        ...operationRed.actions
    };
};

export const hoc = compose<IProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        fetchDetail: (props: IProps) => {
            return async () => {
                const params = { contractCode: props.paramsId };
                await detailDataReducer.actions.execute({ params }, proxySettings.contractDetail);
            };
        },
        fetchOperationList: (props: IProps) => {
            return async () => {
                const params = { contractCode: props.paramsId };
                await operationDataReducer.actions.execute({ params }, proxySettings.contractOperationList);
            };
        },
        fetchChargeList: (props: IProps) => {
            return async (options: any = {}) => {
                const params = {
                    ...initParams,
                    contractCode: props.paramsId,
                    ...options
                };
                await chargeListReducer.actions.execute({ params }, proxySettings.chargeList);
            };
        }
    }),
    lifecycle<IProps, any>({
        componentDidMount() {
            if (this.props.fetchDetail) {
                this.props.fetchDetail();
            }

            if (this.props.fetchChargeList) {
                this.props.fetchChargeList();
            }

            if (this.props.fetchOperationList) {
                this.props.fetchOperationList();
            }
        }
    }),
    getTableHoc("chargeList")
);