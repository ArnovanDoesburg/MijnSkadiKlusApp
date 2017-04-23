angular.module('starter.database', [])

  .service('DatabaseService', function () {

    var users = [
      {
        id: 1,
        username: "David",
        password: "123",
        role: "admin",
        saldo: 0.00,
        kluspunten: 0,
        points: 20,
        isLoggedIn: false
      },
      {
        id: 2,
        username: "Arno",
        password: "123",
        role: "user",
        saldo: 0.00,
        kluspunten: 1,
        points: 10,
        isLoggedIn: false
      },
      {
        id: 3,
        username: "Henk",
        password: "123",
        role: "user",
        saldo: 10.00,
        kluspunten: 0,
        points: 12,
        isLoggedIn: false
      },
      {
        id: 4,
        username: "Claire",
        password: "123",
        role: "user",
        saldo: 0.00,
        kluspunten: 1,
        points: 8,
        isLoggedIn: false
      },
      {
        id: 5,
        username: "Frans",
        password: "123",
        role: "user",
        saldo: 5.00,
        kluspunten: 1,
        points: 28,
        isLoggedIn: false
      }
    ];

    var tasks = [
      {
        id: 1,
        userid: 1,
        date: "22/04/2017",
        title: "Afwasdienst",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
        "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
        "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        reward: 10
      },
      {
        id: 2,
        userid: 0,
        date: "27/04/2017",
        title: "Inleiding nieuwe leden",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
        "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
        "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        reward: 20
      },
      {
        id: 3,
        userid: 0,
        date: "30/04/2017",
        title: "Onderhoud schuur",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
        "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
        "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        reward: 10
      },
      {
        id: 4,
        userid: 0,
        date: "04/05/2017",
        title: "Bardienst",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
        "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
        "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        reward: 10
      },
      {
        id: 5,
        userid: 0,
        date: "05/05/2017",
        title: "Schoonmaakdienst",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
        "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
        "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        reward: 20
      },
      {
        id: 6,
        userid: 0,
        date: "07/05/2017",
        title: "Keukendienst",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
        "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
        "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        reward: 15
      }
    ];

    return {
      getUser: function (id) {
        return users.find(function (user) {
          return user.id === id;
        });
      },
      getTask: function (id) {
        return tasks.find(function (task) {
          return task.id == id;
        });
      },
      getUsers: function () {
        return users;
      },
      addUser: function (user) {
        users.push(user);
      },
      getTasks: function () {
        var alltasks = [];
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].userid === 0) {
            alltasks.push(tasks[i]);
          }
        }
        return alltasks
      },
      getUserTasks: function (userid) {
        var usertasks = [];
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].userid === userid) {
            usertasks.push(tasks[i]);
          }
        }
        console.log(usertasks);
        return usertasks;
      },
      setUserId: function (taskid, userid) {
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].id === taskid) {
            tasks[i].userid = userid;
          }
        }
      },
      rewardUser: function (task, user) {
        for (var i = 0; i < users.length; i++) {
          if (users[i].id === user.id) {
            users[i].points += task.reward;
          }
        }
      },
      deleteUser: function(user) {
        users.splice(users.indexOf(user), 1);
      },
      addTask: function (task) {
        tasks.push(task);
      },
      getNewUserId: function () {
        return users[users.length - 1];
      },
      getLastTaskId: function () {
        return tasks[tasks.length - 1];
      },
      toggleLogged: function (id) {
        for (var i = 0; i < users.length; i++) {
          if (users[i].id === id) {
            users[i].isLoggedIn = !users[i].isLoggedIn
          }
        }
      },
      getActiveUser: function () {
        return users.find(function (user) {
          return user.isLoggedIn === true;
        })
      }

    }
  });

