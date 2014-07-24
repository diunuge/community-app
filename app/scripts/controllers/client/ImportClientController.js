(function (module) {
    mifosX.controllers = _.extend(module, {
        ImportClientController: function (scope, resourceFactory, location, http, dateFilter, API_VERSION, $upload, $rootScope) {
			

			scope.clientTypeOptions = [ {
				name : 'individual',
				index : 0
			}, {
				name : 'member of group',
				index : 1
			} ];

			scope.clientType = scope.clientTypeOptions[0];

			scope.formData = {};
			scope.getTemplateParameters = {};
			scope.getData = {};
			scope.response = {};

			scope.apiEndPoint = $rootScope.hostUrl + API_VERSION
					+ '/clients/import/';
			scope.tenantIdentifier = '?tenantIdentifier='
					+ $rootScope.tenantIdentifier;

			scope.getClientTemplate = function() {

				$docURL = scope.apiEndPoint + scope.clientType.index;
				//		+ scope.tenantIdentifier;
				//window.open($docURL, '_blank');
				/*scope.getTemplateParameters.clientType = scope.clientType.index;
				resourceFactory.clientImportResource.getTemplate({clientId: scope.clientType.index}, function (data) {
					scope.getData.file = data;
					var blob = new Blob([data], {type: "application/vnd.ms-excel"});
				    var objectUrl = URL.createObjectURL(blob);
				    window.open(objectUrl);
                });*/
				http({
				    url: $docURL,
				    method: "GET",
				    data: {},
				    headers:{
				       'Content-type': 'application/json'
				    },
				    responseType: 'arraybuffer'
				}).success(function (data, status, headers, config) {
				    var blob = new Blob([data], {type: "application/vnd.ms-excel"});
				    var objectUrl = URL.createObjectURL(blob);
				    
				    var fileName = "Client.xls";

				    var downloadLink = document.createElement("a");
				    downloadLink.href = objectUrl;
				    downloadLink.download = fileName;

				    document.body.appendChild(downloadLink);
				    downloadLink.click();
				    document.body.removeChild(downloadLink);
				    
				    //window.open(objectUrl, '_blank');
				}).error(function (data, status, headers, config) {
				    //upload failed
				});
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
				}).progress(function (evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
					
					//scope.getData.response = headers('Success');
					
					var blob = new Blob([data], {type: "application/vnd.ms-excel"});
				    var objectUrl = URL.createObjectURL(blob);
				    
				    //var fileName = "Results.xls";
				    
				    if(headers('Success')){
				    	var fileName = "Results.xls";
				    	scope.response = "Clients are sucessfully imported!";
				    }else{
				    	scope.response = "Client import is failed!";
				    	var fileName = "Re-Upload.xls";
				    }
				    console.log(headers());

				    var downloadLink = document.createElement("a");
				    downloadLink.href = objectUrl;
				    downloadLink.download = fileName;

				    document.body.appendChild(downloadLink);
				    downloadLink.click();
				    document.body.removeChild(downloadLink);
					
					// to fix IE not refreshing the model
					if (!scope.$$phase) {
						scope.$apply();
					}
					//location.path('/viewclient/');
				});
			};
        }
    });
    mifosX.ng.application.controller('ImportClientController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', '$upload', '$rootScope', mifosX.controllers.ImportClientController]).run(function ($log) {
        $log.info("ImportClientController initialized");
    });
}(mifosX.controllers || {}));
