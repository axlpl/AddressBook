'use strict';
import angular from 'angular';
import countries from 'json!../../../../node_modules/country-list/data.json';

angular
  .module('AddressBookContacts')
  .controller('ContactsActionsController',
    /* @ngInject */ function (ContactItems, Messages, $state, $stateParams, contact, FormValidation) {
      this.model = contact;
      this.isSaving = false;
      this.countries = countries;
      this.params = $stateParams;
      this.hasError = FormValidation.hasError;
      this.hasClickedOnSubmit = false;
      
      this.save = save.bind(this);
      this.remove = remove.bind(this);
      
      function save(valid) {
        this.hasClickedOnSubmit = true;
        if (valid) {
          this.isSaving = true;
          ContactItems.save(this.model, this.params.contactId);
          afterActions((this.params.contactId) ? 'updated' : 'added');
        }
      }
      
      function remove() {
        if (this.params.contactId) {
          ContactItems.remove(this.params.contactId);
          afterActions('removed');
        }
      }
      
      function afterActions(msg) {
        Messages.add(`Contact was ${msg} successfully!`);
        $state.go('main.contacts.list');
      }
    });