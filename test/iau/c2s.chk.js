(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "c2s", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauC2s(tests[i][0]);
				assert.close(res[0], tests[i][1], 1e-8, JSON.stringify(tests[i][0]) + ' (theta)');
				assert.close(res[1], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) + ' (phi)');

			}
		});
	});

})(c2s_results);
