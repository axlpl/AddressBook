import angular from 'angular';

angular
  .module('AddressBookContacts')
  .controller('ContactsListController', /* @ngInject */ function (contacts) {
    this.contacts = contacts;
  });