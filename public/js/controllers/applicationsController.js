angular.module('pawnGuild')
	.factory('Applications', ['$http', function($http){
	   var object = {
	      getApplications : function(){
	         return $http.get('/applications');
	      },
	      saveApplication : function(app) {
	         return $http.post('/applications', app);
	      },
	      deleteApplication : function(app) {
	         return $http.delete('/applications/' + app._id);
	      }
	   }
	   return object;}])
	.factory('Comments', ['$http', function($http){
	   var object = {
	         getComments : function(appId){
	            return $http.get();
	         },
	         saveComment : function(comment) {
	            return $http.post('/applications/' + comment.application._id + '/comments', comment);
	         },
	         deleteComment : function(comment) {
	            return $http.delete('/applications/' + comment.application + '/comments/' + comment._id);
	         }
	      }
	      return object;}])
	.controller('applyController', ['$scope', 'Applications', function($scope, Applications){
	   $scope.save = function(){
	      if(!$scope.application) return;
	      Applications.saveApplication($scope.application)
	         .success(function(){
	            $scope.application.title = '';
	            $scope.application.text = '';
	            $scope.feedback = 'Application created. Thank you.';
	         }).error(function(status){
	            console.log(data, status);
	         });
	   }}])
	.controller("applicationsController", ['$scope', 'Applications', 'Comments', function($scope, Applications, Comments) {
	   var getApps = function() {
	      Applications.getApplications()
	         .success(function(data){
	            $scope.applications = data;
	         }).error(function(data, status){
	            console.log(data, status);
	            $scope.applications = [];
	         });
	      }
	   getApps();

	   $scope.deleteApplication = function(index) {
	      Applications.deleteApplication($scope.applications[index])
	         .success(function() {
	            $scope.applications.splice(index, 1);
	         }).error(function(data, status){
	            console.log(data, status);
	         });
	   };

	   $scope.addComment = function(index) {
	      var comment = {
	         body: $scope.applications[index].newComment,
	         author: "placeholder_user",
	         application: $scope.applications[index]._id
	      }
	      Comments.saveComment(comment)
	         .success(function(){
	            getApps();
	            $scope.applications[index].newComment = '';
	            comment = null;
	         });
	   };

	   $scope.deleteComment = function(comment, index) {
	      var app = $scope.applications[index];
	      Comments.deleteComment(comment)
	         .success(function() {
	            commentIndex = app.comments.indexOf(comment);
	            $scope.applications[index].comments.splice(commentIndex, 1);
	         }).error(function(data, status){
	            console.log(data, status);
	         });
	   }}])