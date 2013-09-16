l = [[1,2,3],[4,5,6],[7,8,9]]

r = []

puts r

l.map { |i| i.map { |j| r << j } }

puts r
