(function (module) {
    mifosX.services = _.extend(module, {
        FileUploadService: function ($http) {
        	this.uploadFileToUrl = function(file, uploadUrl){
                var fd = new FormData();
                fd.append('file', file);
                
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined, //let browser to set header multipart/form-data
                    	'Access-Control-Allow-Origin' : '*',
                    	'Access-Control-Allow-Methods' : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']}
                })
                .success(function(data, status, headers, config){
                })
                .error(function(data, status, headers, config){
                });
            };
        }
    });
    mifosX.ng.services.service('FileUploadService', ['$http', mifosX.services.FileUploadService]).run(function ($log) {
        $log.info("FileUploadService initialized");
    });
}(mifosX.services || {}));
