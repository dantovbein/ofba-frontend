'use strict';

angular
	.module('app')
	.controller('IntegrantesFiltersCtrl',['$scope','$state','IntegrantesService',function($scope,$state,IntegrantesService){
		$scope.postIntegrante = function(integrante) {
			if(integrante.nombres == undefined) {
				$scope.errorText = "El campo de nombre es obligatorio";
				return false;
			} else if (integrante.apellidos == undefined) {
				$scope.errorText = "El campo de apellido es obligatorio";
				return false;
			} else if (integrante.idTipoIntegrante == undefined) {
				$scope.errorText = "El campo de integrante es obligatorio";
				return false;
			} else if (integrante.idTipoIntegrante != 2 && integrante.idTipoIntegrante != 9 && integrante.idInstrumento == undefined) {
				$scope.errorText = "El campo de instrumento es obligatorio";
				return false;
			} else if (integrante.idTipoIntegrante == 2 &&  integrante.idTipoDirector == "") {
				$scope.errorText = "Se debe seleccionar el tipo de director";
				return false; 
			} else if (integrante.idNacionalidad == undefined) {
				$scope.errorText = "El campo de nacionalidad es obligatorio";
				return false;
			} else {
				
				$scope.errorText = "";
				integrante.nombres = integrante.nombres;
				integrante.apellidos = integrante.apellidos;
				integrante.idInstrumento = integrante.idInstrumento || "";
				integrante.idTipoIntegrante = integrante.idTipoIntegrante || "";
				integrante.idTipoDirector = integrante.idTipoDirector || "";
				integrante.idNacionalidad = integrante.idNacionalidad;
				integrante.strNacionalidad = (integrante.idNacionalidad != "") ? $scope.getStrNacionalidad(integrante.idNacionalidad) : "";
				
				if(integrante.id == undefined) {
					IntegrantesService.postIntegrante(integrante).then(function(response) {
						if(response.status==200) {
							if(typeof(response.data[0])=='boolean') {
								if(response.data[0]==false){
									alert("Error: "+response.data[1]);
									return false;
								}
							}
							if(typeof(response.data[0])=='string') {
								alert("Se agregó correctamente");
								$scope.cleanFields();
								$scope.reloadIntegrantes();
							}						
						}
					});
				} else {
					IntegrantesService.editIntegrante(integrante).then(function(response) {
						if(response.status==200) {
							if(typeof(response.data[0])=='boolean') {
								if(response.data[0]==false){
									alert("Error: "+response.data[1]);
									return false;
								}
							}
							if(typeof(response.data[0])=='string') {
								alert("Se editó correctamente");
								$scope.cleanFields();
								$scope.reloadIntegrantes();
							}						
						}
					});
				}

			}			
		}

		
	}]);