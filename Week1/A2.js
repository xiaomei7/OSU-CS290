// Your code here.

function deepEqual(x, y) {
	var nx = 0, ny = 0;

	if (typeof x == "object" && typeof y == "object" && x != null && y != null) {

    	for ( var i in x ) {
			nx += 1;
		}

		for ( var i in y ) {

			ny += 1;

			if (!deepEqual(x[i], y[i])) {
				return false;
			} 
		}

		return nx == ny;

	} else {
		return x === y;
	}

}

var obj = {here: {is: "an"}, object: 2};

console.log(deepEqual(obj, obj));
// → true

console.log(deepEqual(obj, {here: 1, object: 2}));
// → false

console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
