(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "atciq", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauAtciq(tests[i][0], tests[i][1], tests[i][2], tests[i][3], tests[i][4], tests[i][5], tests[i][6]);
				assert.close(res[0], tests[i][7], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) +', '+ JSON.stringify(tests[i][6]) + ' (ri)');
				assert.close(res[1], tests[i][8], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) +', '+ JSON.stringify(tests[i][4]) +', '+ JSON.stringify(tests[i][5]) +', '+ JSON.stringify(tests[i][6]) + ' (di)');

			}
		});
	});

})(atciq_results);
