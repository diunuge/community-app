(function (module) {
    mifosX.controllers = _.extend(module, {
        ImportClientController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, $upload, $rootScope) {
			
        	scope.clientTypeOptions = [ {
				name : 'individual',
				index : 0
			}, {
				name : 'corporate',
				index : 1
			} ];
        	
			scope.clientType = scope.clientTypeOptions[0];
			scope.excelFile = {};
			
            scope.formDataGet = {};
            scope.formDataPost = {};

            scope.setChoice = function () {
                if (this.formData.active) {
                    scope.choice = 1;
                }
                else if (!this.formData.active) {
                    scope.choice = 0;
                }
            };
            
            scope.getClientTemplate = function () {

            	this.formDataGet.clientType = scope.clientType.index;
            	//this.formData.Date = 234;
            	//this.formData.StringT = "asdaf";
            	
            	resourceFactory.clientImportResource.getTemplate(this.formDataGet, function (data) {
            		//location.path('/viewclient/' + 0);
                });
                /*resourceFactory.clientImportResource.getTemplate(this.formData, function (data) {
                    
                });*/
            };
            
            scope.importClients = function () {

            	this.formDataPost.clientType = scope.clientType.index;
            	this.formDataPost.excelFile = scope.excelFile;
            	
            	resourceFactory.clientImportResource.importClients(this.formDataPost, function (data) {
            		//location.path('/viewclient/' + 0);
                });
                /*resourceFactory.clientImportResource.getTemplate(this.formData, function (data) {
                    
                });*/
            };
        }
    });
    mifosX.ng.application.controller('ImportClientController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', '$upload', '$rootScope', mifosX.controllers.ImportClientController]).run(function ($log) {
        $log.info("ImportClientController initialized");
    });
}(mifosX.controllers || {}));
