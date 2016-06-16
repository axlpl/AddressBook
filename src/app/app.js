import angular from 'angular';
import 'angular-ui-router';
import './common/entry.js';
import './contacts/entry.js';

angular
  .module('AddressBook', [
    'ui.router',
    'AddressBookCommon',
    'AddressBookContacts'
  ])
  .run(/* @ngInject */ (Messages, $rootScope) => {
    Messages.init();
    $rootScope.$on('$stateChangeSuccess', () => {
      Messages.clear();
    });
  });