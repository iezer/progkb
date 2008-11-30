list1 = ["One", "Two", "Three"]
list2 = ["Five", "Six"]

print list1

#Append item
list1.append("Four")
print list1

#Insert item at index
list1.insert(2, "Two 1/2")
print list1

#Extend with list
list1.extend(list2)
print list1

#Pop  item by index
print list1.pop(2)
print list1

#Remove item
list1.remove("Five")
list1.remove("Six")
print list1

#Operators
list1 += list2
print list1

