import React, { PureComponent } from "react";

import { IProps } from "./constant";
import DetailInfo from "./info";

export default class Component extends PureComponent<IProps, any>{
    public render() {
        return (
            <div className="21313"></div>
            <DetailInfo paramsId={this.props.match.params.id} />
        );
    }
}
