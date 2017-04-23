angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, $state, DatabaseService, $ionicPopup) {

    $scope.showResetTask = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Melding',
        template: 'Deze klus is teruggezet op de lijst!'
      });
    };

    $scope.showTaskDetails = function (task) {
      var alertPopup = $ionicPopup.alert({
        title: 'Details',
        template: task.description
      });
    };

    $scope.user = DatabaseService.getActiveUser();
    if (!$scope.user) {
      $state.go("login");
    }

    $scope.resetTask = function (task) {
      task.userid = 0;
      $scope.user.kluspunten += 1;
      $scope.user.points -= task.reward;
      $state.go("tab.tasks");
      $scope.showResetTask();
    };

    $scope.tasks = DatabaseService.getUserTasks($scope.user.id);
    console.log($scope.user.id);

    $scope.logOut = function () {
      DatabaseService.toggleLogged($scope.user.id);
      $state.go("login");
    };
  })

  .controller('TasksCtrl', function ($scope, Chats, DatabaseService) {

    $scope.tasks = DatabaseService.getTasks();

  })

  .controller('TaskDetailCtrl', function ($scope, $stateParams, DatabaseService, $state, $ionicPopup) {
    $scope.task = DatabaseService.getTask($stateParams.taskId);
    $scope.user = DatabaseService.getActiveUser();

    $scope.showConfirm = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Hoera!',
        template: 'Deze taak is nu toegevoegd aan jouw taken op de pagina "mijn account".'
      });
    };

    $scope.showKluspuntError = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Oeps!',
        template: 'Je hebt geen kluspunten meer over!'
      });
    };

    $scope.assignTask = function () {
      if ($scope.user.kluspunten === 0) {
        $scope.showKluspuntError();
      } else {
        DatabaseService.setUserId($scope.task.id, $scope.user.id);
        DatabaseService.rewardUser($scope.task, $scope.user);
        $scope.user.kluspunten -= 1;
        $scope.showConfirm();
        $state.go("tab.tasks");
      }
    }

  })

  .controller('ScoreboardCtrl', function ($scope, DatabaseService) {
    $scope.users = DatabaseService.getUsers();
  })

  .controller('AdminCtrl', function ($scope, DatabaseService, $ionicPopup) {

    $scope.currentTab = "users";
    $scope.goToTab = function(stringTab) {
      $scope.currentTab = stringTab;
    };

    $scope.showWarning = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Oeps!',
        template: 'Het is verplicht om alle velden in te voeren.'
      });
    };

    $scope.showUserCreated = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Hoera!',
        template: 'De nieuwe gebruiker is toegevoegd.'
      });
    };

    $scope.showTaskCreated = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Hoera!',
        template: 'De nieuwe taak is toegevoegd.'
      });
    };

    $scope.showUserDeleteSelf = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Oeps!',
        template: 'Je kunt jezelf niet verwijderen!'
      });
    };

    $scope.resetMoney = function (user) {
      user.saldo = 0;
    };

    $scope.newUser = {
      id: DatabaseService.getNewUserId().id + 1,
      username: null,
      password: null,
      role: "user",
      saldo: 0,
      kluspunten: 1,
      points: 0,
      isLoggedIn: false
    };

    $scope.CreateUser = function () {
      console.log($scope.newUser);
      if ($scope.newUser.username === null || $scope.newUser.password === null) {
        $scope.showWarning();
      } else {
        $scope.showUserCreated();
        DatabaseService.addUser(angular.copy($scope.newUser));
        $scope.newUser.id = DatabaseService.getNewUserId().id + 1;
        $scope.newUser.username = null;
        $scope.newUser.password = null;
      }
    };

    $scope.newTask = {
      id: DatabaseService.getLastTaskId().id + 1,
      userid: 0,
      date: null,
      title: null,
      description: null,
      reward: null
    };

    $scope.CreateTask = function () {
      console.log($scope.newTask);
      DatabaseService.addTask(angular.copy($scope.newTask));
      $scope.newTask.id = DatabaseService.getLastTaskId().id + 1;
      $scope.newTask.title = null;
      $scope.newTask.date = null;
      $scope.newTask.description = null;
      $scope.newTask.reward = null;
      $scope.showTaskCreated();
    };

    $scope.users = DatabaseService.getUsers();

    $scope.showConfirm = function(user) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Gebruiker verwijderen',
        template: 'Weet je zeker dat je deze gebruiker wilt verwijderen?',
        cancelText: "Nee",
        okText: "Ja"
      });
      confirmPopup.then(function(res) {
        if(res) {
          if (DatabaseService.getActiveUser().id !== user.id) {
            DatabaseService.deleteUser(user);
          } else {
            $scope.showUserDeleteSelf();
          }
        }
      });
    };

  })

  .controller('TabsCtrl', function ($scope, DatabaseService) {

  })

  .controller('LoginCtrl', function ($scope, $state, DatabaseService, $rootScope, $ionicPopup) {

    $scope.data = {};

    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Oeps!',
        template: 'Verkeerde gebruikersnaam of wachtwoord.'
      });
    };

    $scope.login = function () {
      var users = DatabaseService.getUsers();
      var activeUser = users.find(function (user) {
        return user.password === $scope.data.password && user.username === $scope.data.username;
      });
      if (activeUser) {

        if (activeUser.role === "admin") {
          $rootScope.isAdmin = true;
        } else {
          $rootScope.isAdmin = false;
        }
        DatabaseService.toggleLogged(activeUser.id);
        $state.go("tab.dash");
      } else {
        $scope.showAlert();
      }
    }
  });
