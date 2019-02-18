#include <iostream>

using namespace std;

class KnightsTour {
  static int* possiblePaths(int val, int size) {
    int baseX = val / size;
    int baseY = val % size;
    int x[] = { -2 -2, -1, -1, 1, 1, 2, 2 };
    int y[] = { -1, 1, -2, 2, -2, 2, -1, 1 };
    int* results = new int[size];
    for (int i = 0; i < size; i ++) {
      results[i] = -1;
      int xVal = x[i] + baseX;
      int yVal = y[i] + baseY;
      if (xVal >= 0 && xVal < size && yVal >= 0 && yVal < size) {
        results[i] = xVal * size + yVal;
      }
    }
    return results;
  }

  static int* knightsTour(int* path, int* visited, int size, int current) {
    if (current >= size * size) {
      return path;
    }

    int last = path[current - 1];

    // cout << "knights tour " << current << ", " << last << endl;

    int* paths = possiblePaths(last, size);
    for (int i = 0; i < size; i++) {
      int next = paths[i];
      if (next == -1 || visited[next]) {
        continue;
      }

      path[current] = next;
      visited[next] = true;
      if (knightsTour(path, visited, size, current + 1) != NULL) {
        return path;
      }
      path[current] = -1;
      visited[next] = false;
    }
    delete[] paths;
    return NULL;
  }

public:
  static int* knightsTour(int size = 8) {
    int* path = new int[size * size];
    int* visited = new int[size * size];
    for (int i = 0; i < size * size; i++) {
      path[i] = -1;
      visited[i] = false;
    }
    path[0] = 0;
    visited[0] = true;
    int* result = knightsTour(path, visited, size, 1);

    if (result == NULL) {
      cout << "no path found" << endl;
    }

    for (int i = 0; i < 8 * 8; i++) {
      cout << result[i] << ", ";
    }
    cout << endl;

    delete[] visited;

    return result;
  }
};
