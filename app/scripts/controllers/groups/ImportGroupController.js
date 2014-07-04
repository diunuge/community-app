(function (module) {
    mifosX.controllers = _.extend(module, {
        ImportGroupController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, $upload, $rootScope) {
						
            scope.formDataGet = {};
            scope.formDataPost = {};
            
            scope.getGroupTemplate = function () {
            	
            	resourceFactory.groupImportResource.getTemplate(this.formDataGet, function (data) {
            		//
                });
            };
            
            scope.onFileSelect = function ($files) {
                scope.fileToUpload = $files[0];
            };
            
            scope.importGroups = function () {
            	
            	$upload.upload({
                    url: $rootScope.hostUrl + API_VERSION + '/groups/import',
                    data: scope.formDataPost,
                    file: scope.fileToUpload
                }).then(function (data) {
                        // to fix IE not refreshing the model
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                        location.path('/viewgroup/');
                    });
            };
        }
    });
    mifosX.ng.application.controller('ImportGroupController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', '$upload', '$rootScope', mifosX.controllers.ImportGroupController]).run(function ($log) {
        $log.info("ImportGroupController initialized");
    });
}(mifosX.controllers || {}));
