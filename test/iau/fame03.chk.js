(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "fame03", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauFame03(tests[i][0]);
				assert.close(res, tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' ([RV])');

			}
		});
	});

})(fame03_results);
