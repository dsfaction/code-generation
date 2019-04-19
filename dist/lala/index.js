/**
 * Created by /Users/qinwen on time
 */

import tem from './lala.html';
import lalaCtrl from './lala';
import './lala.less'


export default angular.module('lala', [])
    .component('lala', {
        lalalate: tem,
        controller: lalaCtrl,
        controllerAs: 'ctrl'
    })
    .name;