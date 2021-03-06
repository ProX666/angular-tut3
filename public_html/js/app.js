var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('home', {
        url: '/home',
        templateUrl: 'views/partial-home.html'
    })

            // nested list with custom controller
            .state('home.list', {
        url: '/list',
        templateUrl: 'views/partial-home-list.html',
        controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
        }
    })

            // nested list with just some random string data
            .state('home.paragraph', {
        url: '/paragraph',
        template: 'I could sure use a drink right now.'
    })


            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('about', {
        views: {
            // the main template will be placed here (relatively named)
            '': {templateUrl: 'views/partial-about.html'},
            // the child views will be defined here (absolutely named)
            'columnOne@about': {
                template: 'Look I am a column!'
            },
            // for column two, we'll define a separate controller
            'columnTwo@about': {
                templateUrl: 'views/table-data.html',
                controller: 'scotchController'
            }
        }
    });
});

routerApp.controller('scotchController', function($scope) {

    $scope.message = 'test';

    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];

});

routerApp.controller('SumCtrl', ['$scope', function($scope) {

        $scope.someData = {
            sum: 13
        };

        $scope.increment = function(value) {
            $scope.someData.sum += parseInt(value);
        };
    }]);

// directive for element "my-widget"
routerApp.directive('myWidget', [function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: "<div class='widget panel panel-primary'>" +
                    "<div class='content panel-body' ng-transclude></div>" +
                    "</div>",
            link: function(scope, element, attrs) {
                element.prepend("<div class='title panel-heading'>" + attrs.title + "</div>");
            }
        };
    }]);
