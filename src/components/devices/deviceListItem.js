const angular = require('angular');
require('./devices.less');

module.exports = {
    template: require('./deviceListItem.html'),
    bindings: {
        device: '<',
        disabled: '<',
        onRemove: '&',
        onSave: '&',
        onStartEdit: '&',
        onCancelEdit: '&'
    },
    controller: deviceListItemController
};

/*@ngInject*/
function deviceListItemController($timeout) {
    let originalDeviceName;

    const controller = this;

    controller.$onInit = function () {
        Object.assign(controller, {
            removeDevice,
            saveDevice,
            startEditMode,
            cancelEditMode
        });
        controller.edit = false;
        controller.remove = false;

        originalDeviceName = controller.device.Nickname;
        controller.className = 'icon-' + deviceClassNames[controller.device.DeviceType];
    };

    function removeDevice() {
        controller.onRemove({device: controller.device});
        controller.edit = false;
        controller.remove = false;
    }

    function saveDevice() {
        controller.device.Nickname = controller.device.Nickname.trim();
        if (controller.device.Nickname) {
            controller.onSave({device: controller.device});
            controller.edit = false;
            controller.remove = false;
        }
    }

    function startEditMode() {
        controller.onStartEdit({id: controller.device.Id});
        controller.remove = false;
        controller.edit = true;
        $timeout(() => {
            angular.element('#device-nickname-' + controller.device.Id).focus();
        });
    }

    function cancelEditMode() {
        controller.onCancelEdit();
        controller.remove = false;
        controller.edit = false;
        controller.device.Nickname = originalDeviceName;
    }
}

const deviceClassNames = {
    10009: 'android',
    10038: 'android',
    10039: 'android',
    16: 'android',
    17: 'android',
    10021: 'apple',
    12: 'apple',
    24: 'apple',
    11: 'apple',
    25: 'apple',
    10: 'apple',
    26: 'apple',
    23: 'apple',
    27: 'apple',
    10035: 'apple',
    10023: 'apple',
    10044: 'blackberry',
    10024: 'blackberry',
    10010: 'chrome',
    18: 'flash',
    8: 'flash',
    19: 'flash',
    7: 'flash',
    9: 'flash',
    14: 'flash',
    10022: 'flash',
    15: 'console',
    40: 'android',
    33: 'humax',
    38: 'humax',
    30: 'lg',
    37: 'lg',
    3: 'linux',
    2: 'apple',
    10018: 'mobile',
    41: 'nvidia',
    10026: 'palm',
    10014: 'personal',
    20050: 'android',
    13: 'roku',
    10025: 'roku',
    31: 'samsung',
    10028: 'samsung',
    36: 'samsung',
    42: 'sharp',
    20: 'silverlight',
    21: 'silverlight',
    6: 'silverlight',
    35: 'sony',
    39: 'sony',
    34: 'technistat',
    5: 'unix',
    1: 'unknown',
    28: 'windows',
    29: 'windows',
    4: 'windows',
    10027: 'windows',
    22: 'xbox',
    32: 'xbox'
};
