'use strict';

angular.module('movimentos', [
  'ui.router',
  'ngAnimate',
])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('movimento', {
        url:'/movimento',
        templateUrl: '/scripts/angular/movimentos/movimentos.tmpl.html',
        controller: 'movimentosCtrl',
        controllerAs: 'movimentos-controller'
      })
    });