(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "a2tf", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauA2tf(tests[i][0], tests[i][1]);
				assert.equal(res[0], tests[i][2], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (sign)');
				assert.DMSF(res[1], tests[i][3], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) + ' (ihmsf)');

			}
		});
	});

})(a2tf_results);
