describe('Devices Route Spec', () => {
    'use strict';

    beforeEach(angular.mock.module('storefront.account'));

    let controller;

    describe('Given the controller is initialized', () => {
        const saveSpy = jasmine.createSpy();
        const removeSpy = jasmine.createSpy();
        const onStartEditSpy = jasmine.createSpy();
        const onCancelEditSpy = jasmine.createSpy();

        beforeEach(() => {
            injectDependencies(
                {
                    device: {
                        Nickname: 'test',
                        DeviceType: '16'
                    },
                    onSave: saveSpy,
                    onRemove: removeSpy,
                    onStartEdit: onStartEditSpy,
                    onCancelEdit: onCancelEditSpy
                }
            );
            controller.$onInit();
        });

        it('then edit mode should be false', () => {
            expect(controller.edit).toBe(false);
            expect(controller.remove).toBe(false);
        });

        it('then a class name should be set', () => {
            expect(controller.className).toBe('icon-android');
        });

        describe('when edit mode is started', () => {
            beforeEach(() => {
                controller.startEditMode();
            });

            it('then edit mode should be true', () => {
                expect(controller.edit).toBe(true);
                expect(controller.remove).toBe(false);
            });
        });

        describe('when edit mode is canceled', () => {
            beforeEach(() => {
                controller.device.Nickname = 'abc';
                controller.cancelEditMode();
            });

            it('then edit mode should be false', () => {
                expect(controller.edit).toBe(false);
                expect(controller.remove).toBe(false);
            });

            it('then the device nickname should be reset', () => {
                expect(controller.device.Nickname).toBe('test');
            });
        });

        describe('when removeDevice is called', () => {
            beforeEach(() => {
                controller.removeDevice();
            });

            it('then the remove binding function should be triggered', () => {
                expect(removeSpy).toHaveBeenCalled();
            });

            it('then edit mode should be false', () => {
                expect(controller.edit).toBe(false);
                expect(controller.remove).toBe(false);
            });
        });

        describe('when saveDevice is called', () => {
            beforeEach(() => {
                controller.saveDevice();
            });

            it('then the save binding function should be triggered', () => {
                expect(saveSpy).toHaveBeenCalled();
            });

            it('then edit mode should be false', () => {
                expect(controller.edit).toBe(false);
                expect(controller.remove).toBe(false);
            });
        });
    });

    function injectDependencies(bindings) {
        inject(function (_$componentController_) {
            controller = _$componentController_('sfDeviceListItem', null, bindings);
        });
    }
});
