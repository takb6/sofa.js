(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "xys00b", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauXys00b(tests[i][0], tests[i][1]);
				assert.close(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (x)');
				assert.close(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (y)');
				assert.close(res[2], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (s)');

			}
		});
	});

})(xys00b_results);
