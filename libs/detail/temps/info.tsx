import { Table } from "antd";
import React, { PureComponent } from "react";

import { Tools } from "src/common/utils";
import Auth from "src/components/auth";
import WMButton from "../../../components/button";
import Card from "../../../components/card";
import RecordComponent from "../../../components/cardrecord";
import InfoComponent from "../../../components/info";
import { Component as Updatefile } from "../updatefile";
import { additionalLabels, annexLabels, baseLabels, chargeColumns, chargeLabels, getAnchorData, IInfoProps, reducerKeys } from "./constant";
import { proxySettings } from "./constant";
import { hoc } from "./container";

const anneTitleStyle = {
    marginLeft: 14,
    fontWeight: "normal",
    fontSize: 14,
    letterSpacing: 0
} as any;

@(hoc as any)
export default class DetailInfo extends PureComponent<IInfoProps, any> {
    public render() {
        const { baseDetail, tchargeList, operation, operationListData, fetchChargeList, fetchDetail } = this.props;
        const tbaseDetail = baseDetail ? baseDetail.toJS() : {};
        const tncheOperateDetail = operationListData ? operationListData.toJS() : {};

        let operationEle = operation;

        if (operation && (typeof operation === "function")) {
            operationEle = operation(tbaseDetail.data, this.props);
        }


        return (
            <Card anchorData={getAnchorData(this.props)} anchorHash={`/contract/detail/${this.props.paramsId}`}>
                <Card.Item title="基本信息" anchorId="baseInfo" isLoading={tbaseDetail.loading}>
                    <InfoComponent columns={baseLabels(tbaseDetail.data)} data={tbaseDetail.data} />
                </Card.Item>
                <Card.Item
                    anchorId="annex"
                    isLoading={tbaseDetail.loading}
                    title={this.getAnneTitle()} >
                    <InfoComponent columns={annexLabels} data={tbaseDetail.data} />
                    <InfoComponent columsNum={1} columns={[{
                        title: "双方盖章合同",
                        render: (text: any, record: any) => (
                            <Auth wmauth="/api/contract/download" >
                                {this.annerItem(record.fileNames)}
                            </Auth>
                        )
                    }]} data={tbaseDetail.data} />
                </Card.Item>
                <Card.Item title="附加信息" anchorId="additional" isLoading={tbaseDetail.loading}>
                    <InfoComponent columns={additionalLabels} data={tbaseDetail.data} />
                </Card.Item>
                <Card.Item title="充值记录" anchorId="charge" isLoading={tbaseDetail.loading}>
                    <InfoComponent columns={chargeLabels} data={tbaseDetail.data} />
                    <Table
                        bordered={true}
                        size="small"
                        columns={chargeColumns}
                        onChange={(pagination: any) => fetchChargeList && fetchChargeList({
                            pageNum: pagination.current,
                            pageSize: pagination.pageSize
                        })}
                        {...tchargeList}
                    />
                </Card.Item>
                <Card.Item title="操作记录" anchorId="operationRecord" >
                    <RecordComponent data={tncheOperateDetail.data} />
                </Card.Item>
                <Card.Footer>
                    {operationEle}
                    <WMButton href="/#/contract">返回</WMButton>
                </Card.Footer>
                <Updatefile setOperationInfo={this.props.setOperationInfo} parentReducerKeys={reducerKeys} refresh={fetchDetail} />
            </Card>
        );
    }

    private getAnneTitle() {
        const { setOperationInfo, baseDetail } = this.props;
        const tbaseDetail = baseDetail ? baseDetail.toJS() : {};

        const href = Tools.getExportUrl(proxySettings.contractDownloadBatch, {
            contractCode: tbaseDetail.data ? tbaseDetail.data.contractCode : null
        });
        return (
            <>
                合同信息
                 <Auth wmauth="/api/contract/downloadBatch" >
                    <a style={anneTitleStyle} href={href} target="_blank">合同打包下载</a>
                </Auth>
                <Auth wmauth="/api/contract/submitContractFile" >
                    <a style={anneTitleStyle}
                        onClick={(data: any) => setOperationInfo && setOperationInfo({
                            operationType: "updateFile",
                            data: {
                                ...tbaseDetail.data,
                                contractNameStr: tbaseDetail.data.contractNameValue
                            }
                        })}>
                        更新附件
                    </a>
                </Auth>
            </>
        );
    }

    private annerItem(data: any) {
        if (!data || data.length === 0) {
            return "-";
        }

        return data.map((item: any, index: any) => {
            const href = Tools.getExportUrl(proxySettings.contractDownload, {
                fileSaveName: item.fileSaveName
            });
            const hrefPreview = Tools.getExportUrl(proxySettings.contractDownload, {
                fileSaveName: item.fileSaveName,
                preview: "yes"
            });

            return (
                <div key={index}>
                    {item.fileName}
                    <a style={anneTitleStyle} href={hrefPreview} target="_blank">预览</a>
                    <a style={anneTitleStyle} href={href} target="_blank">下载</a>
                </div>);
        });
    }
}      