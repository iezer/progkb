document.writeln("hello");

function f() {
	var a = 6;
	document.writeln("in fn");
}

f();
//document.writeln(a); // var a is private so this fails, if we remove var it'll work

outer: for (var i = 0; i < 10; i++) {
	inner: for (var j = 0; j < 10; j++) {
		document.write(i + j);
		if (i == 2 && j == 2)
			break outer;
	}
	document.writeln();
}

document.writeln(i);