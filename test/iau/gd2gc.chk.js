(function (tests) {

	QUnit.module( "IAU", function ()
	{
		QUnit.test( "gd2gc", function( assert )
		{
			for (var i = 0; i < tests.length; i += 1)
			{
				var res = iauGd2gc(tests[i][0], tests[i][1], tests[i][2], tests[i][3]);
				assert.close(res[0], tests[i][4], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' ([RV])');
				assert.V3(res[1], tests[i][5], 1e-8, JSON.stringify(tests[i][0]) +', '+ JSON.stringify(tests[i][1]) +', '+ JSON.stringify(tests[i][2]) +', '+ JSON.stringify(tests[i][3]) + ' (xyz )');

			}
		});
	});

})(gd2gc_results);
