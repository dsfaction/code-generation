/**
 * Created by /Users/qinwen on time
 */
import url from '../../config/system.js';

class lalaCtrl {
    constructor(http) {
        [this.http, this.name] = [http, 'lala'];
    }
}
lalaCtrl.$inject = ['http'];
export default lalaCtrl