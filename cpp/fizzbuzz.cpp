#include <iostream>
#include <set>
#include <string>
#include <map>
#include <stdlib.h>

using namespace std;

void fizzBuzz(int c) {
	for (int i = 1; i < c; ++i)
  {
      if      (i % 3 == 0 && i % 5 == 0) cout << "FizzBuzz";
      else if (i % 3 == 0)               cout << "Fizz";
      else if (i % 5 == 0)               cout << "Buzz";
      else                               cout << i;
      cout << endl;
  }
}

void fizzBuzzWithMap(map<int, string> fbMap, int c) {
	for (int i = 1; i < c; ++i)
  {
		bool found = false;
		for (map<int, string>::const_iterator it = fbMap.begin(); it != fbMap.end(); ++it) {
			if (i % it->first == 0) {
				cout << it->second;
				found = true;
			}
		}
		if (!found)	{
			cout << i;
		}
		cout << endl;
	}
}

int main ( int argc, char *argv[] )
{
	int peak = atoi(argv[1]);
	
	fizzBuzz(peak);
	cout << endl;
	
	set<string> mySet;
	mySet.insert ("Isaac");
	mySet.insert ("Ezer");
	
	for ( set<string>::const_iterator it = mySet.begin(); it != mySet.end(); it++) {
		cout << *it << endl;
	}
	
	map<int, string> fbMap;
	fbMap[3] = "Fizz";
	fbMap[5] = "Buzz";
	
	cin >> peak;
	fizzBuzzWithMap(fbMap, peak);
	
	return 0;
}

//g++ -Wall fizzbuzz.cpp -o fizzbuzz