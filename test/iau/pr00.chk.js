(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "pr00", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauPr00(tests[i][0], tests[i][1]);
				assert.close(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dpsipr)');
				assert.close(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (depspr)');

			}
		});
	});

})(pr00_results);
