import React, { PureComponent } from "react";

import { IProps } from "./constant";
import DetailInfo from "./info";

export default class Component extends PureComponent<IProps, any>{
    public render() {
        return (
            <DetailInfo paramsId={this.props.match.params.id} className={name} />
        );
    }
}
