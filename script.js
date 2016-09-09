angular.module("app", [])
    .controller("ctrl", function ($scope) {
        var convertFn = function (input, baseDe, basePara) {
            var base10 = parseInt(input, baseDe);
            return base10.toString(basePara);
        }

		$scope.calcular = function (valor, baseDe) {
            if (baseDe !== 2) {
                $scope.txtBase2 = convertFn(valor, baseDe, 2);
            }
            if (baseDe !== 8) {
                $scope.txtBase8 = convertFn(valor, baseDe, 8);
            }
            if (baseDe !== 10) {
                $scope.txtBase10 = convertFn(valor, baseDe, 10);
            }
            if (baseDe !== 16) {
                $scope.txtBase16 = convertFn(valor, baseDe, 16);
            }
        }
    });