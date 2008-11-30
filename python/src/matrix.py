# By Isaac Ezer i_ezer@yahoo.com
#!/usr/local/bin/python
# This program calculates the inverse of a square matrix, 
# real valued matrix, or returns None if the matrix
# is not invertible.  Note that the returned matrix
# will actually be an augmented matrix with the identity
# on the left.
#
# There are 2 ways to run this program.
#
# 1. From the command line using the following format
# 
# In general, the 1st argument is the dimension of the matrix
# and the following arguments are each row of the matrix, with
# elements separated by comments.
#
# python matrix.py n A11,A12,A13,...,A1N A21,A22,...,A2N ,..., AN1,AN2,...,ANN
#
# example: 3 dimensional matrix
#
# python matrix.py 3 1.0,2.0,3.0 3.2,8.1,7.3 1.2,1.3,1.4
#
# 2. From an HTML Form where the dimension is in a text field called DIMENSION
#    and the matrix appears in a text area called MATRIX 
#    with each row on its own line
#    and each matrix element separated by a SPACE (not a comma)
#

import sys, cgi

# These functions define the 3 elementary row operations 
# on matrices.  They used 0 based indices


# Swap rows.  Takes a Matrix m and returns a new matrix
# with the rows at indices a and b swapped

def swap_rows (matrix, a, b):
  temp = matrix [a]
  matrix [a] = matrix[b]
  matrix [b] = temp
  return matrix


# Multiple row by constant.  Takes a Matrix m and returns
# a new matrix with the Row at index row multiplied by constant k

def times_constant (matrix, row, k):
  for i in range (0, len (matrix [row])):
    matrix [row][i] = k * matrix[row][i]
  return matrix


# Add non-zero multiple of one row to another.
# Takes a Matrix matrix and returns a new matrix with
# k times the row at index rowA added to the row at index
# row

def add_multiple (matrix, rowA, rowB, k):
  for i in range (0, len (matrix [rowB])):
    matrix [rowB][i] = matrix [rowB][i] + k * matrix [rowA][i]
  return matrix


# Takes 2 matrices of dimension n*n and returns an n*2n matrix
# where the 1st n columns are matrixA and then last n columns
# are matrix B.  called an augmented matrix.

def augment (matrixA, matrixB):
  dimension = len(matrixA)
  matrix = matrixA
  for i in range (0, dimension):
    matrix[i] = matrixA[i] + matrixB[i]
  return matrix


# Returns the indentity matrix of dimension n

def identity (dimension):
  m = []
  for i in range (0, dimension):
    r = [0] * i + [1] + [0] * (dimension - i - 1)
    m = m + [r]

  return m


# Returns the inverse of matrix m, or None if the matrix is
# non-invertible

def inverse (m):
  dimension = len (m)
  matrix = augment (m, identity (dimension))
  
  for i in range (0, dimension):

    #make sure there is a non zero element at i,i
    if matrix [i][i] == 0:
      j = i
      while j < dimension and matrix[j][i] == 0:
        j = j + 1
      if j == dimension:
        return None
      else:
        matrix = swap_rows (matrix, i, j)
     
    # get a 1 in i,i position
    matrix = times_constant (matrix, i, (1 / matrix[i][i]))

    # get 0s in all other elements above and below the 1
    for j in range (0, dimension):
      if i != j:
        matrix = add_multiple (matrix, i, j, - matrix[j][i])
   
  return matrix	


# This method takes a string separator and a string
# line in the form "RsRsRs...sR"
# where the Rs are arbitrary floating point numbers and
# s is the separato string which separates the numbers.

def parse_matrix_row (line, separator):
  num_list = str.split (line, separator)
  matrix_row =[0]* len(num_list)

  for i in range (0, len(num_list)):
    matrix_row [i] = float (num_list [i])
  
  return matrix_row


# Main function.  Handles running of this program from command line.
if __name__ == "__main__":

  dimension = int (sys.argv[1])

  matrix = [[0] * dimension] * dimension

  for i in range (0, dimension):
    matrix [i] = parse_matrix_row ( sys.argv [2+i], "," )

  print "Here is the original matrix\n"
  print matrix
  print
  print "Here is the inverse (on the right side of the augmented matrix."
  print inverse (matrix)


# function to run as a CGI script

else:

  print "Content-type: text/html\n\n"
  
  form = cgi.FieldStorage()
  
  dimension = int (form['DIMENSION'])
  matrix_string = form['MATRIX']
  matrix_string_rows = str.split (matrix_string, "\n")

  matrix = [[0] * dimension] * dimension

  for i in range (0, dimension):
    matrix [i] = parse_matrix_row ( matrix_string_rows[i], " " )

  print "Here is the original matrix\n"
  print matrix
  print
  print "Here is the inverse (on the right side of the augmented matrix."
  print inverse (matrix)
