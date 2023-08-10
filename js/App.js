var app = angular.module("myModule",["ngRoute"]);
app.config(['$routeProvider',function($routeProvider) 
{
    $routeProvider
    .when('/form', 
    {
        templateUrl: 'html/form.html'
    })
    .when('/display', 
    {
      templateUrl: 'html/display.html',
      controller: 'DisplayController'
    })
    .otherwise({ redirectTo: '/' });
}])

app.controller('FormController', function($scope, $location, DataService) 
{
    $scope.formEntries = []; 
    $scope.submitForm = function() 
    {
      $scope.employee = 
      {
        name: $scope.name,
        email: $scope.email
      };
      $scope.formEntries.push($scope.employee);
      DataService.saveEmployeeData($scope.formEntries);
      $location.path('/display');
    };
})

app.controller('DisplayController', function($scope, DataService) 
{
    $scope.formEntries = DataService.getData();
    $scope.deleteRow = function (employee) 
    {
      console.log(employee);
      let index = $scope.formEntries.indexOf(employee);
      $scope.formEntries.splice(index, 1);
   };
   $scope.orderByMe = function(x) {
    $scope.myOrderBy = x;
  }
});


app.service('DataService', function() 
{
    var data = [];

    this.saveEmployeeData = function(formData) 
    {
        data.push(formData);
        console.log(formData)
    };

    this.getData = function() 
    {
        return data;
    };
});

// .controller('FormController', ['$scope', '$location', function($scope, $location)
// {
//   $scope.formEntries = []; 
  
//   $scope.submitForm = function () 
//   {
//     $scope.user = 
//   {
//       name: $scope.name,
//       email: $scope.email
//   };
//   $scope.formEntries.push($scope.user);
//   console.log($scope.formEntries)
//   $location.path('/display');
//   };
// }])


// .controller('DisplayController', ['$scope', function($scope) {
//   // Access the formEntries data from the FormController
//   $scope.formEntries = $scope.$parent.formEntries;
// }]);
// let store = JSON.stringify($scope.formEntries);
// localStorage.setItem('storedData', store);

