def augment (matrixA, matrixB):
  dimension = len(matrixA)
  matrix = [[0] * (dimension * 2)] * dimension
  for i in range (0, dimension):
    for j in range (0, dimension):
      matrix [i][j] = matrixA[i][j]
      matrix [i][dimension + j] = matrixB[i][j]
  return matrix