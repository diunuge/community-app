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
            
            /*scope.serializeData = function ( data ) {
            	 
                // If this is not an object, defer to native stringification.
                if ( ! angular.isObject( data ) ) {

                    return( ( data == null ) ? "" : data.toString() );

                }

                var buffer = [];

                // Serialize each key in the object.
                for ( var name in data ) {

                    if ( ! data.hasOwnProperty( name ) ) {

                        continue;

                    }

                    var value = data[ name ];

                    buffer.push(
                        encodeURIComponent( name ) +
                        "=" +
                        encodeURIComponent( ( value == null ) ? "" : value )
                    );

                }

                // Serialize the buffer and clean it up for transportation.
                var source = buffer
                    .join( "&" )
                    .replace( /%20/g, "+" )
                ;

                return( source );

            };*/
            
            scope.onFileSelect = function ($files) {
                scope.fileToUpload = $files[0];
            };
            
            scope.importClients = function () {

            	/*this.formDataPost.clientType = scope.clientType.index;
            	var clientType = scope.clientType.index;
            	//var file = scope.excelFile;
                //console.log('file is ' + JSON.stringify(file));
                //var uploadUrl = "http://localhost:8080/mifosng-provider/api/v1/clients/import/0";
                //FileUploadService.uploadFileToUrl(file, uploadUrl);
                
                
            	//this.formDataPost.excelFile = scope.excelFile;
            	//this.formDataPost.form = new FormData();
            	//this.formDataPost.form.append('file', scope.excelFile);
            	
            	//resourceFactory.clientImportResource.importClients(this.formDataPost, function (data) {
            		//location.path('/viewclient/' + 0);
                //});
                var fd = new FormData();
                fd.append('file', scope.excelFile);
                this.formDataPost.fd = fd;
                //http.defaults.useXDomain = true;
                resourceFactory.clientImportResource.importClients( fd, function (data) {
                    
                });*/
            	
            	this.formDataPost.clientType = scope.clientType.index;
            	
            	$upload.upload({
                    url: $rootScope.hostUrl + API_VERSION + '/clients/import',
                    data: scope.formDataPost,
                    file: scope.fileToUpload
                }).then(function (data) {
                        // to fix IE not refreshing the model
                        //if (!scope.$$phase) {
                        //    scope.$apply();
                        //}
                        //location.path('/viewclient/' + scope.clientId);
                    });
            };
        }
    });
    mifosX.ng.application.controller('ImportClientController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', '$upload', '$rootScope', 'FileUploadService', mifosX.controllers.ImportClientController]).run(function ($log) {
        $log.info("ImportClientController initialized");
    });
}(mifosX.controllers || {}));
