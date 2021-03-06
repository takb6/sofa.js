(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "nut80", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauNut80(tests[i][0], tests[i][1]);
				assert.close(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (dpsi)');
				assert.close(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (deps)');

			}
		});
	});

})(nut80_results);
