import angular from 'angular';

angular
  .module('AddressBookContacts')
  .factory('ContactItems', /* ngInject */ ($window) => {
    const ls = $window.localStorage;

    return {
      get,
      getAll,
      save,
      remove,
      model
    };

    function get(id) {
      return JSON.parse(ls.getItem(id));
    }

    function getAll() {
      return Object
        .keys(ls)
        .map((_id) => {
          const {firstName, lastName, email, country} = JSON.parse(ls[_id]);
          return {
            _id,
            firstName,
            lastName,
            email,
            country
          }
        });
    }

    function save(model, id) {
      if (!id) {
        const {firstName, lastName, email, country} = model;
        id = btoa(`${firstName} ${lastName} ${email} ${country}`);
      }
      ls.setItem(id, JSON.stringify(model));
    }

    function remove(id) {
      ls.removeItem(id);
    }

    function model() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        country: ''
      }
    }
  });