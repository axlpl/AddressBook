import angular from 'angular';

angular
  .module('AddressBookContacts')
  .config(/* @ngInject */ ($stateProvider, BASE_URL) => {
    $stateProvider
      .state('main.contacts', {
        url: 'contacts',
        abstract: true
      })
      .state('main.contacts.list', {
        url: `^${BASE_URL}`,
        views: {
          'main@': {
            templateUrl: 'app/contacts/views/list.html',
            controller: 'ContactsListController as ContactsList',
            resolve: {
              contacts: /* @ngInject */ (ContactItems) => ContactItems.getAll()
            }
          }
        }
      })
      .state('main.contacts.add', {
        url: '/add',
        views: {
          'main@': {
            templateUrl: 'app/contacts/views/actions.html',
            controller: 'ContactsActionsController as ContactsActions'
          }
        },
        resolve: {
          contact: /* @ngInject */ (ContactItems) => ContactItems.model()
        }
      })
      .state('main.contacts.edit', {
        url: '/edit/:contactId',
        views: {
          'main@': {
            templateUrl: 'app/contacts/views/actions.html',
            controller: 'ContactsActionsController as ContactsActions'
          }
        },
        resolve: {
          contact: /* @ngInject */ (ContactItems, $stateParams) => ContactItems.get($stateParams.contactId)
        }
      });
  });
