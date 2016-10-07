angular.module("app", []).controller("ctrl", function ($scope) {
	$scope.tab = 1;
	$scope.operacao = 1;
	
	/* Exercício 1 */
	var convertFn = function (input, baseDe, basePara) {
		var base10 = parseInt(input, baseDe);
		return base10.toString(basePara);
	}

	$scope.converter = function (valor, baseDe) {
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
	
	/* Exercício 2 com cálculos manuais */
	$scope.calcular = function () {
		num1 = $scope.txtNum1;
		num2 = $scope.txtNum2;
		$scope.total = 0;

		if(!isNaN(num1) && !isNaN(num2)){
			switch($scope.operacao){
				case 1: // Soma
					$scope.total = operacaoAdicao(num1, num2);
					break;
				case 2: // Subtracao
					$scope.total = operacaoSubtracao(num1, num2);
					break;
				case 3: // Divisao
					$scope.total = operacaoDivisao(num1, num2);
					break;
				case 4: // Multiplicao
					$scope.total = operacaoMultiplicacao(num1, num2);
					break;
			}
		}
	}

	$scope.setTab = function (tabId) {
		$scope.tab = tabId;
	};

	$scope.setOperacao = function (opId) {
		$scope.operacao = opId;
		this.calcular();
	};

	$scope.tabAtiva = function (tabId) {
		return $scope.tab === tabId;
	};
});

function completaComZeros(num1, num2)
{
	while (num1.length > num2.length)
		num2 = "0" + num2;
	while (num2.length > num1.length)
		num1 = "0" + num1;
	return { num1, num2 };
}

function operacaoAdicao(num1, num2)
{
	num1 = completaComZeros(num1, num2).num1;
	num2 = completaComZeros(num1, num2).num2;
	
	var result = "";
	var next_bonus = "0";
	
	for(var i = num1.length; i > 0; i--)
	{
		var n = i - 1;
		if(next_bonus == "1")
		{
			if (num1.charAt(n) != num2.charAt(n))
			{
				result = "0" + result;
				next_bonus = "1";
			}
			else
			{
				if (num1.charAt(n) == '0')
					next_bonus = "0";
				else
					next_bonus = "1";
				result = "1" + result;
			}
		}
		else
		{
			if(num1.charAt(n) != num2.charAt(n))
			{
				result = "1" + result;
				next_bonus = "0";
			}
			else
			{
				result = "0" + result;
				if (num1.charAt(n) == '0')
					next_bonus = "0";
				else
					next_bonus = "1";
			}
		}
	}

	if (next_bonus == "1")
		result = "1" + result;
	return result;
}

function operacaoSubtracao(num1, num2)
{
	var result = "";
	num1 = completaComZeros(num1, num2).num1;
	num2 = completaComZeros(num1, num2).num2;
	
	num2 = num2.replace(/0/g, "*");
	num2 = num2.replace(/1/g, "0");
	num2 = num2.replace(/\*/g, "1");
	num2 = operacaoAdicao(num2, "1");
	result = operacaoAdicao(num1, num2);
	return result;
}

function Teste(val)
{
	if (val.length > 1)
	{
		found = false;
		for (var i = 0; i < val.length; i++)
		{
			if(!found)
			{
				if (val.charAt(i) != '0')
					found = true;
			}
			if (found)
				return val.substring(i, val.length - i);
		}
		return val;
	}
	else
		return val;
}

function operacaoMultiplicacao(num1, num2)
{
	num1 = Number(completaComZeros(num1, num2).num1).toString();
	num2 = Number(completaComZeros(num1, num2).num2).toString();
	var result = "0", i = "0";
	while(i != num2)
	{
		i = operacaoAdicao(i, "1");
		result = operacaoAdicao(result, num1);
	}
	return result;
}

function operacaoDivisao(num1, num2)
{
	num1 = Number(completaComZeros(num1, num2).num1).toString();
	num2 = Number(completaComZeros(num1, num2).num2).toString();
	var result = "0";
	while (true)
	{
		if (NrMaior(num1, "0"))
		{
			num1 = operacaoSubtracao(num1, num2);
			result = operacaoAdicao(result, "1");
		}
		else
			break;
		if (NrMaior(num2, num1))
			break;
	}
	return result;
}

function NrMaior(num1, num2)
{
	num1 = Number(completaComZeros(num1, num2).num1).toString();
	num2 = Number(completaComZeros(num1, num2).num2).toString();

	for (var i = 0; i < num1.length; i++)
	{
		if(num2.charAt(i) == '1' && num1.charAt(i) == '0')
			break;
		if (num1.charAt(i) == '1' && num2.charAt(i) == '0')
			return true;
	}
	return false;
}