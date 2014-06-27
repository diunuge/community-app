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
            	
            	var file = scope.excelFile;
                //console.log('file is ' + JSON.stringify(file));
                var uploadUrl = "http://localhost:8080/mifosng-provider/api/v1/clients/import/0";
                FileUploadService.uploadFileToUrl(file, uploadUrl);
                
                
            	//this.formDataPost.excelFile = scope.excelFile;
            	//this.formDataPost.form = new FormData();
            	//this.formDataPost.form.append('file', scope.excelFile);
            	
            	//resourceFactory.clientImportResource.importClients(this.formDataPost, function (data) {
            		//location.path('/viewclient/' + 0);
                //});
                //var fd = new FormData();
                //fd.append('file', scope.excelFile);
                //this.formDataPost.fd = fd;
                //http.defaults.useXDomain = true;
                //resourceFactory.clientImportResource.importClients(this.formDataPost, function (data) {
                    
                //});
            };
        }
    });
    mifosX.ng.application.controller('ImportClientController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', '$upload', '$rootScope', 'FileUploadService', mifosX.controllers.ImportClientController]).run(function ($log) {
        $log.info("ImportClientController initialized");
    });
}(mifosX.controllers || {}));
