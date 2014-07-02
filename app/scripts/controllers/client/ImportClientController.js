(function (module) {
    mifosX.controllers = _.extend(module, {
        ImportClientController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, $upload, $rootScope, FileUploadService) {
			
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
            
            scope.onFileSelect = function ($files) {
                scope.fileToUpload = $files[0];
            };
            
            scope.importClients = function () {
            	
            	this.formDataPost.clientType = scope.clientType.index;
            	
            	$upload.upload({
                    url: $rootScope.hostUrl + API_VERSION + '/clients/import',
                    data: scope.formDataPost,
                    file: scope.fileToUpload
                }).then(function (data) {
                        // to fix IE not refreshing the model
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                        location.path('/viewclient/');
                    });
            };
        }
    });
    mifosX.ng.application.controller('ImportClientController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', '$upload', '$rootScope', 'FileUploadService', mifosX.controllers.ImportClientController]).run(function ($log) {
        $log.info("ImportClientController initialized");
    });
}(mifosX.controllers || {}));
