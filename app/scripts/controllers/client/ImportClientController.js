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

			scope.formData = {};

			scope.apiEndPoint = $rootScope.hostUrl + API_VERSION
					+ '/clients/import/';
			scope.tenantIdentifier = '?tenantIdentifier='
					+ $rootScope.tenantIdentifier;

			scope.getClientTemplate = function() {

				$docURL = scope.apiEndPoint + scope.clientType.index
						+ scope.tenantIdentifier;
				window.open($docURL, '_blank');
			};

			scope.onFileSelect = function($files) {
				scope.fileToUpload = $files[0];
			};

			scope.importClients = function() {

				this.formData.clientType = scope.clientType.index;

				$upload.upload({
					url : $rootScope.hostUrl + API_VERSION + '/clients/import',
					data : scope.formData,
					file : scope.fileToUpload
				}).then(function(data) {
					// to fix IE not refreshing the model
					if (!scope.$$phase) {
						scope.$apply();
					}
					location.path('/viewclient/');
				});
			};
        }
    });
    mifosX.ng.application.controller('ImportClientController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', '$upload', '$rootScope', mifosX.controllers.ImportClientController]).run(function ($log) {
        $log.info("ImportClientController initialized");
    });
}(mifosX.controllers || {}));
