(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "fk5hz", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauFk5hz(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.close(res[0], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (rh)');
				assert.close(res[1], tests[i][5], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (dh)');

			}
		});
	});

})(fk5hz_results);
