
import React from "react";
import { RouteComponentProps } from "react-router";

import { ToolTipsComponent } from "src/components/tooltip";
import { reducerKeys as parentReducerkey } from "../constant";

interface IMatch {
    id: string;
}

export interface IProps extends RouteComponentProps<IMatch>, IInfoProps {

}

export interface IInfoProps {
    paramsId: any;
    operation?: any;// 操作
    setOperationInfo?: (data: any) => void; // 弹窗

    fetchDetail?: () => void; // 基本信息
    baseDetail?: any;

    fetchOperationList?: () => void;// 操作记录
    operationListData?: any;

    fetchChargeList?: (params?: any) => void; // 关联充值单
    tchargeList?: any;
}

export const reducerKey = "contractDetail";
export const reducerKeys = [...parentReducerkey, reducerKey];

// 接口配置
export const proxySettings = {
    contractDetail: {
        ns: "contract",
        key: "contractDetail"
    },
    contractOperationList: {
        ns: "contract",
        key: "contractOperationList"
    },
    chargeList: {
        ns: "contract",
        key: "contractChargeList",
        auth: "/api/contract/charge/list"
    },
    contractDownload: {
        ns: "contract",
        key: "contractDownload"
    },
    contractDownloadBatch: {
        ns: "contract",
        key: "contractDownloadBatch"
    }
};

export const initParams = {
    pageSize: 5,
    pageNum: 1
};

// 客户方联系人，联系方式
const contactLavels = (contactList: any[] | null | undefined) => {
    const list: any[] = [];

    if (!contactList) {
        return list;
    }

    contactList.map((item, index) => {
        list.push({
            title: `合作方指定联系人${index + 1}`,
            render: () => `${item.contactName}（${item.contactPhone}）`
        });
    });

    return list;
};

const templateFlag = {
    1: "模版文件",
    2: "非模板合同"
};
// 基本信息label
export const baseLabels = (data: any) => [
    {
        title: "业务线", dataIndex: "businessTypeStr"
    }, {
        title: "合同文件", dataIndex: "templateFlag",
        render: (text: number, record: any) => templateFlag[text]
    }, {
        title: "合同名称", dataIndex: "contractNameValue"
    }, {
        title: "合同类型", dataIndex: "contractTypeLabel"
    }, {
        title: "合作方公司名称", dataIndex: "customerName"
    },
    ...contactLavels(data ? data.custContacts : [])
    , {
        title: "我方签约主体", dataIndex: "serviceProviderName"
    },
    {
        title: "我方签约人", dataIndex: "weSigner"
    }, {
        title: "合同金额", dataIndex: "amount"
    }, {
        title: "开始日期", dataIndex: "startDate"
    }, {
        title: "结束日期", dataIndex: "endDate"
    }, {
        title: "签约日期", dataIndex: "signTime"
    }, {
        title: "合同编号", dataIndex: "contractCodeLabel"
    }, {
        title: "签约产品", dataIndex: "signProducts",
        render: (text: string, record: any) => {
            const productArr: string[] = [];

            if (record.signProducts && record.signProducts.length > 0) {
                record.signProducts.map((item: any) => {
                    productArr.push(item.label);
                });
                return productArr.join(",");
            } else {
                return "-";
            }
        }
    }, {
        title: "备注", dataIndex: "remark"
    }
];

const initFileFlagList: any = {
    1: "合作方已盖章",
    2: "我司先盖章"
};

// 附件信息
export const annexLabels: any[] = [{
    title: "初始附件提供", dataIndex: "initFileFlag",
    render: (text: any, record: any) => initFileFlagList[text],
}, {
    title: "预计附件提供时间", dataIndex: "expectAddFileTime",
    isShow: ({ initFileFlag }: any) => (
        initFileFlag === 2
    )
}];

// 附加信息
export const additionalLabels: any[] = [{
    title: "跟进人", dataIndex: "followerStr",
    isShow: ({ businessType }: any) => (
        businessType === 5 || businessType === 6
    )
}, {
    title: "招商跟进人", dataIndex: "recruitStr",
    isShow: ({ businessType }: any = {}) => (
        businessType === 1 || businessType === 2 || businessType === 3
    )
}, {
    title: "运营跟进人", dataIndex: "leaderStr",
    isShow: ({ businessType }: any) => (
        businessType === 1 || businessType === 2 || businessType === 3
    )
}, {
    title: "代理商类型", dataIndex: "agentTypeStr",
    isShow: ({ businessType }: any) => (
        businessType === 2 || businessType === 3
    )
}, {
    title: "代理商等级", dataIndex: "grade",
    isShow: ({ businessType }: any) => (
        businessType === 1 || businessType === 2 || businessType === 3
    )
}];

// 关联充值单label
export const chargeColumns: any[] = [{
    title: "充值单编号", dataIndex: "chargeCode"
}, {
    title: "客户名称", dataIndex: "customerName",
    render: (text: string, record: any) => {
        return <ToolTipsComponent title={text} maxlength={18} />;
    }
}, {
    title: "本次充值金额(返点前)", dataIndex: "advertisingAmount"
}, {
    title: "服务费", dataIndex: "serviceAmount"
}, {
    title: "返点类型", dataIndex: "offerTypeStr"
}, {
    title: "本次充值金额", dataIndex: "amount"
}, {
    title: "资金池扣减金额", dataIndex: "fundAmount",
    render: (text: string, record: any) => {
        return record.advertisingAmount + record.serviceAmount;
    }
}, {
    title: "充值类型", dataIndex: "chargeTypeStr"
}, {
    title: "创建时间", dataIndex: "createTime"
}, {
    title: "创建人", dataIndex: "createByStr"
}, {
    title: "充值单状态", dataIndex: "chargeStatusStr"
}];

export const chargeLabels: any[] = [{
    title: "合计结算金额", dataIndex: "amountTotal",
}, {
    title: "首次充值时间", dataIndex: "chargeTime"
}];

export const getAnchorData: any = (props: IInfoProps) => [{
    href: "baseInfo",
    title: "基本信息"
}, {
    href: "annex",
    title: "合同信息"
}, {
    href: "additional",
    title: "附加信息"
}, {
    href: "charge",
    title: "充值记录"
}, {
    href: "operationRecord",
    title: "操作记录"
}];

